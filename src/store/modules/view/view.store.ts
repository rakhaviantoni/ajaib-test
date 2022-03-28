import getters from '@/store/modules/view/view.getters';
import mutations from '@/store/modules/view/view.mutations';
import actions from '@/store/modules/view/view.actions';

const SIDEBAR_WIDTHS = {
  expanded: '15rem',
  shrinked: '3rem',
};

export default {
  namespaced: true,
  state: {
    appTitle: 'Ajaib Test',
    isLoading: false,
    menuList: [
      {
        label: 'Random User',
        path: 'randomUser',
        name: 'Random User',
        icon: 'people',
      },
    ],
    isSidebarExpanded: true,
    sidebarWidth: SIDEBAR_WIDTHS.expanded,
    sidebarWidths: {
      expanded: SIDEBAR_WIDTHS.expanded,
      shrinked: SIDEBAR_WIDTHS.shrinked,
    },
  },
  getters,
  mutations,
  actions,
};
