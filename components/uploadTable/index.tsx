/*
 * @author: Archy
 * @Date: 2021-12-28 10:01:04
 * @LastEditors: Archy
 * @LastEditTime: 2021-12-28 10:04:35
 * @FilePath: \sgd-pro-components\components\uploadTable\index.tsx
 * @description: 
 */
import type { App, Plugin } from 'vue';
import { COMPONENT_PREFIX } from '../shared/constant/prefix';
import Table from './uploadTable'

export type { UploadTableProps } from './uploadTable'

Table.install = function (app: App) {
  app.component(COMPONENT_PREFIX + Table.name, Table);
  return app;
};

export default Table as typeof Table & Plugin
