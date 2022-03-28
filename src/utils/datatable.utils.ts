import { Meta, QueryPayload } from '@/types/datatable.types';

export const generateMeta = (params?: any): Meta => {
  const meta: Meta = {
    page: 1,
    pageSize: 10,
    sortBy: 'email',
    sortOrder: 'ascend',
  };
  if (params && params.sortOrder) {
    meta.sortOrder = params.sortOrder;
  }
  return meta;
};

export const parseQueryPayload = (payload: Meta): QueryPayload => {
  const qp: QueryPayload = {
    ...payload,
    page: payload.page,
    pageSize: payload.pageSize,
    sortBy: payload.sortBy,
    sortOrder: payload.sortOrder,
  };
  return qp;
};
