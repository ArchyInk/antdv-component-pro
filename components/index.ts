/*
 * @author: Archy
 * @Date: 2021-12-24 14:38:18
 * @LastEditors: Archy
 * @LastEditTime: 2021-12-24 14:41:20
 * @FilePath: \sgd-pro-components\components\index.ts
 * @description: 
 */
import type { App } from 'vue'
import * as Components from './components'
export * from './components'

export const install = function (app: App) {
  Object.keys(Components).forEach((key) => {
    const component = (Components as Record<string, any>)[key]
    if (component.install) {
      app.use(component)
    }
  })
  return app
}

export default {
  install,
}
