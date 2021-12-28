/*
 * @Author: Sgdchy
 * @Date: 2021-08-06 18:20:26
 * @LastEditors: Archy
 * @LastEditTime: 2021-12-28 10:02:09
 * @FilePath: \sgd-pro-components\components\tablePro\index.tsx
 * @description: 
 */
import { COMPONENT_PREFIX } from '../shared/constant/prefix';
import VueFullscreen from 'vue-fullscreen';
import Table from './tablePro';

Table.install = function (app) {
  app.use(VueFullscreen);
  app.component(COMPONENT_PREFIX + Table.name, Table);
  return app;
};

export default Table;