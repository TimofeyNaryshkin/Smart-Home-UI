import { Component, signal } from '@angular/core';
import { MatSidenavModule } from '@angular/material/sidenav';
import { RouterOutlet } from '@angular/router';
import { Sidebar } from './sidebar/sidebar';
import { TabSwitcher } from "./tab-switcher/tab-switcher";

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, MatSidenavModule, Sidebar, TabSwitcher],
  templateUrl: './app.html',
  styleUrl: './app.scss',
})
export class App {}
