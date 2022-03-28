import getters from '@/store/modules/randomUser/randomUser.getters';
import mutations from '@/store/modules/randomUser/randomUser.mutations';
import actions from '@/store/modules/randomUser/randomUser.actions';
import { generateMeta } from '@/utils/datatable.utils';

export default {
  namespaced: true,
  state(): {
    list: Array<any>;
    listTotalCount: number;
    isFetchingList: boolean;
    datatableMeta: any;
  } {
    return {
      list: [],
      listTotalCount: 0,
      isFetchingList: false,
      datatableMeta: generateMeta(),
    };
  },
  getters,
  mutations,
  actions,
};
