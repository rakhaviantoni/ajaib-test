import Vue from 'vue';
import Vuex from 'vuex';
import createLogger from 'vuex/dist/logger';
import modules from './modules';

Vue.use(Vuex);

const logger = createLogger({
  collapsed: true, // auto-expand logged mutations
  filter(mutation) {
    // returns `true` if a mutation should be logged
    // `mutation` is a `{ type, payload }`
    return mutation.type !== 'aBlacklistedMutation';
  },
  actionFilter(action, state) {
    // same as `filter` but for actions
    // `action` is a `{ type, payload }`
    return action.type !== 'aBlacklistedAction';
  },
  transformer(state) {
    // transform the state before logging it.
    // for example return only a specific sub-tree
    return state;
  },
  mutationTransformer(mutation) {
    // mutations are logged in the format of `{ type, payload }`
    // we can format it any way we want.
    return mutation;
  },
  actionTransformer(action) {
    // Same as mutationTransformer but for actions
    return action;
  },
  logActions: true, // Log Actions
  logMutations: true, // Log mutations
  // logger: console, // implementation of the `console` API, default `console`
});

const config: {
  plugins: Array<any>;
  modules: any;
} = {
  plugins: [],
  modules,
};

if (process.env.NODE_ENV !== 'production') {
  config.plugins.push(logger);
}

export default new Vuex.Store(config);
