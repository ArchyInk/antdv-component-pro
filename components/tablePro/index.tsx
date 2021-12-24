/*
 * @Author: Sgdchy
 * @Date: 2021-08-06 18:20:26
 * @LastEditors: Archy
 * @LastEditTime: 2021-12-24 14:37:16
 * @FilePath: \sgd-pro-components\components\tablePro\index.tsx
 * @description: 
 */
import type { App, Plugin } from 'vue';
import { COMPONENT_PREFIX } from '../shared/constant/prefix';
import VueFullscreen from 'vue-fullscreen'
import Table from './table-pro';

export type { TableProProps } from './table-pro';

Table.install = function (app: App) {
  app.use(VueFullscreen)
  app.component(COMPONENT_PREFIX + Table.name, Table);
  return app;
};

export default Table as typeof Table & Plugin
