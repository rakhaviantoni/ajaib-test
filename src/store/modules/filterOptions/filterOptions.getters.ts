export default {
  getFilterItemsCount(state: any) {
    return (name: string) => {
      const items: any = state.filterResults[name];
      if (items) {
        return Object.keys(items).length;
      }
      return 0;
    };
  },
  getSelectedFilterItemsCount(state: any) {
    return (name: string) => {
      const items: any = state.selectedFilterResults[name];
      if (items) {
        return Object.keys(items).length;
      }
      return 0;
    };
  },
  getInsertedMultipleInputsCount(state: any) {
    return (name: string) => {
      const items: any = state.insertedMultipleInputs[name];
      if (items) {
        return Object.keys(items).length;
      }
      return 0;
    };
  },
};
