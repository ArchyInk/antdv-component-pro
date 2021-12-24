/*
 * @author: Archy
 * @Date: 2021-12-22 11:20:38
 * @LastEditors: Archy
 * @LastEditTime: 2021-12-22 11:54:29
 * @FilePath: \sgd-pro-components\src\main.ts
 * @description: 
 */
import { createApp } from 'vue'
import App from './App.vue'

import Table from '../components/tablePro/index'

const app = createApp(App)
app.use(Table)
  .mount('#app')
