import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class EditMode {
  readonly isEditMode = signal(false);

  enter() {
    this.isEditMode.set(true);
  }

  exit() {
    this.isEditMode.set(false);
  }
}
