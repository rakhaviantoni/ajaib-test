export type Meta = {
  page: number;
  pageSize: number;
  sortOrder: string;
  sortBy: string;
  [key: string]: any;
};

export type QueryPayload = {
  page: number;
  pageSize: number;
  sortOrder: string;
  sortBy: string;
  [key: string]: any;
};

export type Columns = {
  label: string;
  name?: string;
  sortOrderable?: boolean;
  slot?: any;
  [key: string]: any;
}[];

export type SearchBarField = {
  label: string;
  name: string;
  type?: string;
  options?: Option[];
  value: any;
  initialValue: any;
};

interface Option {
  label: string;
  value: any;
}
