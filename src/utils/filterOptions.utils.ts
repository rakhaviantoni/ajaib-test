import { FilterResults } from '@/types/filterOptions.types';

export const retrieveIdsAsString = (items: FilterResults): string => {
  if (items && Object.keys(items).length > 0) {
    const result: Array<number | string> = [];
    Object.keys(items).forEach((k: any) => {
      result.push((items[k] as any).id);
    });
    return result.join(',');
  }
  return '';
};
