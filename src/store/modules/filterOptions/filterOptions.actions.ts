export default {
  fetchFilterOptionsByName(
    { commit }: any,
    {
      name,
      fetcher,
      params,
    }: {
      name: string;
      fetcher: (payload: any) => any;
      params: any;
    },
  ) {
    return new Promise((resolve, reject) => {
      commit('SET_FILTER_FETCHING_STATE_BY_NAME', {
        name,
        value: true,
      });
      fetcher({
        params,
      })
        .then((response: any) => {
          if (response.status === 200 && response.data.data !== null) {
            commit('SET_FILTER_RESULT_BY_NAME', {
              name,
              items: response.data.data,
            });
          } else {
            commit('SET_FILTER_RESULT_BY_NAME', {
              name,
              items: [],
            });
          }
          return resolve(response);
        })
        .catch((error: any) => {
          if (error.response) {
            return resolve(error.response);
          }
          return reject(error);
        })
        .finally(() => {
          commit('SET_FILTER_FETCHING_STATE_BY_NAME', {
            name,
            value: false,
          });
        });
    });
  },
};
