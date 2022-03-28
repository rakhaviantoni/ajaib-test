import Vue from 'vue';
import * as endpoints from './randomUser.endpoints';

export default {
  searchUser({ commit }: any, { params }: any) {
    return new Promise((resolve, reject) => {
      commit('SET_IS_FETCHING_LIST', true);
      Vue.prototype
        .$http(
          endpoints.SEARCH_USER({
            ...params,
          }),
        )
        .then((response: any) => {
          if (response.status === 200) {
            commit('SET_LIST', response.data.results);
            commit('SET_LIST_TOTAL_COUNT', response.data.info.results);
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
          commit('SET_IS_FETCHING_LIST', false);
        });
    });
  },
};
