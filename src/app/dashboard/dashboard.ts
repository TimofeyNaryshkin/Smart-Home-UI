import { Component, computed, inject, linkedSignal, signal } from '@angular/core';
import { MatSidenavModule } from '@angular/material/sidenav';
import { RouterOutlet } from '@angular/router';
import { BreakpointObserver, Breakpoints, LayoutModule } from '@angular/cdk/layout';
import { map } from 'rxjs';
import { MatIcon } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { Sidebar } from '../sidebar/sidebar';

@Component({
  selector: 'app-dashboard',
  imports: [MatSidenavModule, RouterOutlet, Sidebar, LayoutModule, MatIcon, MatButtonModule],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.scss',
})
export class Dashboard {
  breakpointObserver = inject(BreakpointObserver);
  isLargeScreen = signal(this.breakpointObserver.isMatched(Breakpoints.Large));
  mode = computed(() => (this.isLargeScreen() ? 'side' : 'over'));
  isOpenned = linkedSignal(() => this.isLargeScreen());

  toggleIsOpened() {
    this.isOpenned.set(!this.isOpenned());
  }

  layoutChanges = this.breakpointObserver
    .observe(Breakpoints.Large)
    .pipe(map((r) => r.matches))
    .subscribe((result) => {
      this.isOpenned.set(result);
      this.isLargeScreen.set(result);
    });
}
