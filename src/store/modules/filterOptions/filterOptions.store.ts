import getters from '@/store/modules/filterOptions/filterOptions.getters';
import mutations from '@/store/modules/filterOptions/filterOptions.mutations';
import actions from '@/store/modules/filterOptions/filterOptions.actions';
import {
  FilterInputs,
  FilterFetchingStates,
  FilterResults,
  SelectedFilterResults,
  InsertedMultipleInputs,
} from '@/types/filterOptions.types';

export default {
  namespaced: true,
  state(): {
    activeFilterName: string;
    filterInputs: FilterInputs;
    filterFetchingState: FilterFetchingStates;
    filterResults: FilterResults;
    selectedFilterResults: SelectedFilterResults;
    insertedMultipleInputs: InsertedMultipleInputs;
  } {
    return {
      activeFilterName: '',
      filterInputs: {},
      filterFetchingState: {},
      filterResults: {},
      selectedFilterResults: {},
      insertedMultipleInputs: {},
    };
  },
  getters,
  mutations,
  actions,
};
