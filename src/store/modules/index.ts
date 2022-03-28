/**
 * Automatically imports all the modules and exports as a single module object
 */
const requireModule = require.context('.', true, /\.store\.ts$/);

interface Modules {
  [key: string]: any;
}
const modules: Modules = [];

requireModule.keys().forEach((filename) => {
  const moduleName: string = filename.replace(/\.\/(\w+)\/\w+\.store\.ts/g, (m, p1) => p1);

  modules[moduleName] = requireModule(filename).default || requireModule(filename);
});

export default modules;
