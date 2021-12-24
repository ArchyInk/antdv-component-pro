/*
 * @author: Archy
 * @Date: 2021-12-24 14:38:18
 * @LastEditors: Archy
 * @LastEditTime: 2021-12-24 14:41:20
 * @FilePath: \sgd-pro-components\components\index.ts
 * @description: 
 */
import * as Components from './components';
export * from './components';
export var install = function install(app) {
  Object.keys(Components).forEach(function (key) {
    var component = Components[key];

    if (component.install) {
      app.use(component);
    }
  });
  return app;
};
export default {
  install: install
};