/*
 * @author: Archy
 * @Date: 2021-12-22 15:36:03
 * @LastEditors: Archy
 * @LastEditTime: 2021-12-22 15:36:03
 * @FilePath: \sgd-pro-components\components\shared\util\getCls.ts
 * @description: 
 */
import { COMPONENT_PREFIX } from "../constant/prefix";
export default (function (cls) {
  return COMPONENT_PREFIX + '-' + cls;
});