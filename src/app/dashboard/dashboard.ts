import { Component, computed, inject, linkedSignal, signal } from '@angular/core';
import { MatSidenavModule } from '@angular/material/sidenav';
import { BreakpointObserver, Breakpoints, LayoutModule } from '@angular/cdk/layout';
import { map } from 'rxjs';
import { MatIcon } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { Sidebar } from '../sidebar/sidebar';
import { TabSwitcher } from "../tab-switcher/tab-switcher";

@Component({
  selector: 'app-dashboard',
  imports: [MatSidenavModule, Sidebar, LayoutModule, MatIcon, MatButtonModule, TabSwitcher],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.scss',
})
export class Dashboard {
  breakpointObserver = inject(BreakpointObserver);
  isLargeScreen = signal(this.breakpointObserver.isMatched(Breakpoints.Large));
  mode = computed(() => (this.isLargeScreen() ? 'side' : 'over'));
  isOpenned = linkedSignal(() => this.isLargeScreen());

  toggleIsOpened() {
    if (this.isOpenned()) {
      this.isOpenned.set(false);
    } else {
      this.isOpenned.set(true);
    }
  }

  layoutChanges = this.breakpointObserver
    .observe(Breakpoints.Large)
    .pipe(map((r) => r.matches))
    .subscribe((result) => {
      if (result) {
        this.isOpenned.set(true);
        this.isLargeScreen.set(true);
      } else {
        this.isOpenned.set(false);
        this.isLargeScreen.set(false);
      }
    });
}
