/*
* @author: Archy
* @Date: 2021-12-23 13:46:38
 * @LastEditors: Archy
 * @LastEditTime: 2021-12-24 14:16:53
 * @FilePath: \sgd-pro-components\components\shared\util\insertRefInstance.ts
* @description: 
*/

import { getCurrentInstance } from "vue"
export default (name: string, attr: any) => {
  console.log(getCurrentInstance());
  const ctx = (getCurrentInstance() as any).ctx
  ctx[name] = attr
}