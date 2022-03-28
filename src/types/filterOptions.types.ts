export type FilterTypes =
  | 'CHECKBOX'
  | 'DYNAMIC_OPTIONS'
  | 'DYNAMIC_INPUT'
  | 'DYNAMIC_MULTIPLE_INPUT'
  | 'STATIC_OPTIONS'
  | 'SINGLE_OPTION'
  | 'DATE'
  | 'DATE_RANGE';

export type FilterInputs = {
  [name: string]: string;
};

export type FilterFetchingStates = {
  [name: string]: boolean;
};

export type FilterResultItem = {
  id: number;
  _id: string;
  name: string;
  status: string;
};

export type FilterResults = {
  [name: string]: Array<FilterResultItem>;
};

export type SelectedFilterResultItem = {
  [id: string]: FilterResultItem;
};

export type SelectedFilterResults = {
  [name: string]: {
    [id: string]: FilterResultItem;
  };
};

export type InsertedMultipleInputs = {
  [name: string]: {
    [id: string]: any;
  };
};
