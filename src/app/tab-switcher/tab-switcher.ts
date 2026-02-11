import { Component, signal } from '@angular/core';
import { MatTabsModule } from '@angular/material/tabs';
import mockData from '../mocks/data.mock.json';
import { CardList } from '../card-list/card-list';
import { Tab } from '../models/tab.model';

@Component({
  selector: 'app-tab-switcher',
  imports: [MatTabsModule, CardList],
  templateUrl: './tab-switcher.html',
  styleUrl: './tab-switcher.scss',
})
export class TabSwitcher {
  protected readonly tabs = signal(mockData.tabs as Tab[]);
  protected selectedTabIndex = signal(0);
}
