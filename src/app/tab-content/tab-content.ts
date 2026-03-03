import { Component, computed, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { toSignal } from '@angular/core/rxjs-interop';
import { CardList } from '../card-list/card-list';
import { Store } from '@ngrx/store';
import { selectTabs } from '../state/selectors/dashboard.selectors';
import { MatButtonModule } from '@angular/material/button';
import { EditMode } from '../services/edit-mode-service';
import { AddCardDialog } from '../add-card-dialog/add-card-dialog';
import { MatDialog } from '@angular/material/dialog';
import { DashboardActions } from '../state/actions/dashboard.actions';

@Component({
  selector: 'app-tab-content',
  imports: [CardList, MatButtonModule],
  templateUrl: './tab-content.html',
  styleUrl: './tab-content.scss',
})
export class TabContent {
  private readonly store = inject(Store);
  private readonly route = inject(ActivatedRoute);
  private readonly dialog = inject(MatDialog);
  readonly editModeService = inject(EditMode);

  private readonly tabs = toSignal(this.store.select(selectTabs));
  private readonly params = toSignal(this.route.params);

  readonly cards = computed(() => {
    const tabId = this.params()?.['tabId'];
    return this.tabs()?.find((tab) => tab.id === tabId)?.cards;
  });

  addCard() {
    const dialogRef = this.dialog.open(AddCardDialog, {
      maxWidth: 'fit-content',
      height: '100%',
      maxHeight: '70vh',
    });
    dialogRef.afterClosed().subscribe((result) => {
      const tabId = this.params()?.['tabId'];
      if (result) {
        this.store.dispatch(DashboardActions.addCard({ tabId, layout: result }));
      }
    });
  }
}
