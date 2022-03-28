export default {
  SET_APP_TITLE(state: any, value: string) {
    state.appTitle = value;
  },
  SET_IS_LOADING(state: any, value: boolean) {
    state.isLoading = value;
  },
  SET_SIDEBAR_WIDTH(state: any, value: string) {
    state.sidebarWidth = value;
  },
  TOGGLE_SIDEBAR_EXPAND(state: any) {
    state.isSidebarExpanded = !state.isSidebarExpanded;
    if (state.isSidebarExpanded) {
      state.sidebarWidth = state.sidebarWidths.expanded;
    } else {
      state.sidebarWidth = state.sidebarWidths.shrinked;
    }
  },
};
