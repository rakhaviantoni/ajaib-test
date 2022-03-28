import { Meta } from '@/types/datatable.types';

export default {
  SET_IS_FETCHING_LIST(state: any, value: string) {
    state.isFetchingList = value;
  },
  SET_LIST(state: any, value: Array<any>) {
    state.list = value;
  },
  SET_LIST_TOTAL_COUNT(state: any, value: number) {
    state.listTotalCount = value;
  },
  SET_DATATABLE_META(state: any, value: Meta) {
    state.datatableMeta = value;
  },
};
