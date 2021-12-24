/*
 * @author: Archy
 * @Date: 2021-12-22 11:20:38
 * @LastEditors: Archy
 * @LastEditTime: 2021-12-22 11:25:26
 * @FilePath: \sgd-pro-components\src\env.d.ts
 * @description: 
 */
/// <reference types="vite/client" />

declare module '*.vue' {
  import { DefineComponent } from 'vue'
  // eslint-disable-next-line @typescript-eslint/no-explicit-any, @typescript-eslint/ban-types
  const component: DefineComponent<{}, {}, any>
  export default component
}

