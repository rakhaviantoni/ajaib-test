import {
  FilterResultItem,
  SelectedFilterResults,
  InsertedMultipleInputs,
} from '@/types/filterOptions.types';

export default {
  SET_FILTER_FETCHING_STATE(state: any, value: any) {
    state.filterFetchingState = value;
  },
  SET_FILTER_INPUTS_BY_NAME(
    state: any,
    {
      name,
      value,
    }: {
      name: string;
      value: any;
    },
  ) {
    state.filterInputs = {
      ...state.filterInputs,
      [name]: value,
    };
  },
  SET_FILTER_FETCHING_STATE_BY_NAME(
    state: any,
    {
      name,
      value,
    }: {
      name: string;
      value: boolean;
    },
  ) {
    state.filterFetchingState = {
      ...state.filterFetchingState,
      [name]: value,
    };
  },
  SET_FILTER_RESULT_BY_NAME(
    state: any,
    {
      name,
      items,
    }: {
      name: string;
      items: Array<FilterResultItem>;
    },
  ) {
    state.filterResults = {
      ...state.filterResults,
      [name]: items,
    };
  },

  SET_ACTIVE_FILTER_NAME(state: any, value: any) {
    state.activeFilterName = value;
  },
  SET_SELECTED_FILTER_RESULTS(state: any, value: any) {
    state.selectedFilterResults = value;
  },
  ADD_SELECTED_FILTER_ITEM(
    state: any,
    {
      name,
      item,
    }: {
      name: string;
      item: FilterResultItem;
    },
  ) {
    const selectedFilterResults: SelectedFilterResults = { ...state.selectedFilterResults };
    if (!selectedFilterResults[name]) {
      selectedFilterResults[name] = {};
    }
    selectedFilterResults[name][String(item.id || item._id)] = item;
    state.selectedFilterResults = selectedFilterResults;
  },
  REMOVE_SELECTED_FILTER_ITEM(
    state: any,
    {
      name,
      itemId,
    }: {
      name: string;
      itemId: string;
    },
  ) {
    if (state.selectedFilterResults[name]) {
      const selectedFilterResults: SelectedFilterResults = { ...state.selectedFilterResults };
      delete selectedFilterResults[name][String(itemId)];
      state.selectedFilterResults = selectedFilterResults;
    }
  },
  CLEAR_SELECTED_FILTER_ITEMS(state: any) {
    state.filterInputs = {};
    state.selectedFilterResults = {};
  },
  CLEAR_SELECTED_FILTER_ITEMS_BY_NAME(state: any, name: string) {
    const filter: any = { ...state.selectedFilterResults };
    delete filter[name];
    state.selectedFilterResults = filter;
  },
  ADD_TO_INSERTED_MULTIPLE_INPUTS(
    state: any,
    {
      name,
      itemId,
      value,
    }: {
      name: string;
      itemId: string;
      value: any;
    },
  ) {
    const insertedMultipleInputs: InsertedMultipleInputs = { ...state.insertedMultipleInputs };
    if (!insertedMultipleInputs[name]) {
      insertedMultipleInputs[name] = {};
    }
    insertedMultipleInputs[name][String(itemId)] = value;
    state.insertedMultipleInputs = insertedMultipleInputs;
  },
  REMOVE_INSERTED_MULTIPLE_INPUT(
    state: any,
    {
      name,
      itemId,
    }: {
      name: string;
      itemId: string;
    },
  ) {
    if (state.insertedMultipleInputs[name]) {
      const insertedMultipleInputs: InsertedMultipleInputs = { ...state.insertedMultipleInputs };
      delete insertedMultipleInputs[name][String(itemId)];
      state.insertedMultipleInputs = insertedMultipleInputs;
    }
  },
  CLEAR_INSERTED_MULTIPLE_INPUTS(state: any) {
    state.insertedMultipleInputs = {};
  },
  CLEAR_INSERTED_MULTIPLE_INPUTS_BY_NAME(state: any, name: string) {
    const inputs: any = { ...state.insertedMultipleInputs };
    delete inputs[name];
    state.insertedMultipleInputs = inputs;
  },
  RESET_FILTER_STATES(state: any) {
    state.activeFilterName = '';
    state.filterInputs = {};
    state.filterFetchingState = {};
    state.filterResults = {};
    state.insertedMultipleInputs = {};
    state.selectedFilterResults = {};
  },
};
