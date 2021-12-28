/*
 * @author: Archy
 * @Date: 2021-12-22 11:20:38
 * @LastEditors: Archy
 * @LastEditTime: 2021-12-28 10:03:01
 * @FilePath: \sgd-pro-components\src\main.ts
 * @description: 
 */
import { createApp } from 'vue'
import App from './App.vue'

import ProComponents from '../components'

const app = createApp(App)
app.use(ProComponents)
  .mount('#app')
