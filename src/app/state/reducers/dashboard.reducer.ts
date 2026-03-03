import { createReducer, on } from '@ngrx/store';
import { DashboardActions, DashboardApiActions } from '../actions/dashboard.actions';
import { Tab } from '../../models/tab.model';

export interface DashboardState {
  tabs: Tab[];
  loading: boolean;
  error: Error | null;
}

const initialState: DashboardState = {
  tabs: [],
  loading: false,
  error: null,
};

export const dashboardReducer = createReducer(
  initialState,
  on(DashboardActions.loadDashboard, (state) => ({
    ...state,
    tabs: [],
    loading: true,
    error: null,
  })),
  on(DashboardApiActions.dashboardLoadedSuccess, (state, { tabs }) => ({
    ...state,
    tabs,
    loading: false,
  })),
  on(DashboardApiActions.dashboardLoadedError, (state, { error }) => ({
    ...state,
    error,
    loading: false,
  })),
  on(DashboardApiActions.dashboardSavedSuccess, (state, { tabs }) => ({
    ...state,
    tabs,
  })),
  on(DashboardActions.restoreTabs, (state, { tabs }) => ({
    ...state,
    tabs,
  })),
  on(DashboardActions.reorderTab, (state, { tabId, direction }) => {
    const index = state.tabs.findIndex((tab) => tab.id === tabId);
    if (index === -1) return state;
    const newTabs = [...state.tabs];

    if (direction === 'left') {
      [newTabs[index - 1], newTabs[index]] = [newTabs[index], newTabs[index - 1]];
    }

    if (direction === 'right') {
      [newTabs[index], newTabs[index + 1]] = [newTabs[index + 1], newTabs[index]];
    }
    return {
      ...state,
      tabs: newTabs,
    };
  }),
  on(DashboardActions.addTab, (state, { title }) => ({
    ...state,
    tabs: [...state.tabs, { title, id: title.replaceAll(' ', '-').toLowerCase(), cards: [] }],
  })),
  on(DashboardActions.editTab, (state, { originalTitle, newTitle }) => {
    if (newTitle === originalTitle) return state;
    const tab = state.tabs.find((tab) => tab.title === originalTitle);
    if (!tab) return state;
    const index = state.tabs.indexOf(tab);
    const newTabs = [...state.tabs];
    newTabs[index] = {
      title: newTitle,
      id: newTitle.replaceAll(' ', '-').toLowerCase(),
      cards: tab.cards,
    };
    return {
      ...state,
      tabs: newTabs,
    };
  }),
  on(DashboardActions.removeTab, (state, { tabId }) => {
    const index = state.tabs.findIndex((tab) => tab.id === tabId);
    if (index === -1) return state;
    const newTabs = [...state.tabs];
    newTabs.splice(index, 1);
    return {
      ...state,
      tabs: newTabs,
    };
  }),
  on(DashboardActions.addCard, (state, { tabId, layout }) => {
    const index = state.tabs.findIndex((tab) => tab.id === tabId);
    if (index === -1) return state;
    const newTabs = [...state.tabs];
    newTabs[index] = {
      ...newTabs[index],
      cards: [
        ...newTabs[index].cards,
        { layout, id: newTabs[index].cards.length.toString(), title: 'Empty', items: [] },
      ],
    };
    return {
      ...state,
      tabs: newTabs,
    };
  }),
  on(DashboardActions.reorderCard, (state, { tabId, cardId, newIndex }) => {
    const tabIndex = state.tabs.findIndex((tab) => tab.id === tabId);
    const cardIndex = state.tabs[tabIndex].cards.findIndex((card) => card.id === cardId);
    if (tabIndex === -1 || cardIndex == -1) return state;
    const newTabs = [...state.tabs];
    const newCards = [...state.tabs[tabIndex].cards];
    [newCards[cardIndex], newCards[newIndex]] = [newCards[newIndex], newCards[cardIndex]];

    newTabs[tabIndex] = {
      ...newTabs[tabIndex],
      cards: newCards,
    };

    return {
      ...state,
      tabs: newTabs,
    };
  }),
  on(DashboardActions.removeCard, (state, { tabId, cardId }) => {
    const tabIndex = state.tabs.findIndex((tab) => tab.id === tabId);
    const cardIndex = state.tabs[tabIndex].cards.findIndex((card) => card.id === cardId);
    if (tabIndex === -1 || cardIndex == -1) return state;
    const newTabs = [...state.tabs];
    const newCards = [...state.tabs[tabIndex].cards];

    newCards.splice(cardIndex, 1);
    newTabs[tabIndex] = {
      ...newTabs[tabIndex],
      cards: newCards,
    };

    return {
      ...state,
      tabs: newTabs,
    };
  }),
);
