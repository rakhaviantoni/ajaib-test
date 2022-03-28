export const SEARCH_USER = (queryParams: { [key: string]: string } = {}) => {
  let url = '/?results=100&';
  const keys = Object.keys(queryParams);
  keys.forEach((key, i) => {
    url += `${key}=${queryParams[key]}`;
    if (i < keys.length - 1) url += '&';
  });
  return {
    url: encodeURI(url),
    method: 'GET',
    cancelToken: 'userRequest',
  };
};
