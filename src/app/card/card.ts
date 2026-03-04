import { Component, computed, inject, input, model } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { TCard } from '../models/card.model';
import { Device } from '../device/device';
import { Sensor } from '../sensor/sensor';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { TDevice } from '../models/device.models';
import { Highlight } from '../directives/highlight';
import { EditMode } from '../services/edit-mode-service';
import { MatAnchor, MatIconButton } from '@angular/material/button';
import { MatIcon } from '@angular/material/icon';
import { Store } from '@ngrx/store';
import { DashboardActions } from '../state/actions/dashboard.actions';
import { toSignal } from '@angular/core/rxjs-interop';
import { ActivatedRoute } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { EditCardDialog } from '../edit-card-dialog/edit-card-dialog';

@Component({
  selector: 'app-card',
  imports: [
    MatCardModule,
    Device,
    Sensor,
    MatSlideToggleModule,
    Highlight,
    MatAnchor,
    MatIconButton,
    MatIcon,
  ],
  templateUrl: './card.html',
  styleUrl: './card.scss',
})
export class Card {
  readonly editModeService = inject(EditMode);
  private readonly store = inject(Store);
  private readonly route = inject(ActivatedRoute);
  private readonly dialog = inject(MatDialog);
  private readonly params = toSignal(this.route.params);

  data = model.required<TCard>();
  details = input.required<{ order: number; length: number }>();
  isExamaple = input(false);

  isDeviceGroup = computed(() => {
    const devices = this.data().items.filter((item) => item.type === 'device');
    return devices.length >= 2;
  });

  isGroupActive = computed(() => {
    if (this.isDeviceGroup()) {
      return this.hasActiveDevice();
    }
    return false;
  });

  hasActiveDevice = computed(() => {
    const devices = this.data().items.filter((item) => item.type === 'device');
    return devices.some((d) => d.state === true);
  });

  toggleIsGroupActive() {
    const newState = !this.isGroupActive();
    const updatedItems = this.data().items.map((item) => {
      return item.type === 'device' ? { ...item, state: newState } : item;
    });
    this.data.update((card) => ({ ...card, items: updatedItems }));
  }

  updateDevice(index: number, updatedDevice: TDevice) {
    const updatedItems = [...this.data().items];
    updatedItems[index] = updatedDevice;
    this.data.update((card) => ({ ...card, items: updatedItems }));
  }

  reorder(direction: 'left' | 'right') {
    const newIndex = this.details().order + (direction === 'left' ? -1 : 1) - 1;
    const tabId = this.params()?.['tabId'];
    this.store.dispatch(
      DashboardActions.reorderCard({
        tabId,
        cardId: this.data().id,
        newIndex,
      }),
    );
  }

  onOrderChange(event: Event) {
    const value = +(event.target as HTMLInputElement).value;
    if (value < 1 || value > this.details().length) return;

    const tabId = this.params()?.['tabId'];
    this.store.dispatch(
      DashboardActions.reorderCard({
        tabId,
        cardId: this.data().id,
        newIndex: value - 1,
      }),
    );
  }

  remove() {
    const tabId = this.params()?.['tabId'];
    this.store.dispatch(
      DashboardActions.removeCard({
        tabId,
        cardId: this.data().id,
      }),
    );
  }

  edit() {
    const dialogRef = this.dialog.open(EditCardDialog, {
      data: { card: this.data() },
      width: '100%',
      maxWidth: '50vw',
      height: '100%',
      maxHeight: '60vh',
    });
    dialogRef.afterClosed().subscribe((result) => {
      const tabId = this.params()?.['tabId'];
      if (result) {
        this.store.dispatch(
          DashboardActions.editCard({ tabId, cardId: this.data().id, newCard: result }),
        );
      }
    });
  }
}
