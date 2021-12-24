/*
 * @author: Archy
 * @Date: 2021-12-22 11:20:38
 * @LastEditors: Archy
 * @LastEditTime: 2021-12-22 11:23:29
 * @FilePath: \sgd-pro-components\vite.config.ts
 * @description: 
 */
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueJsx from "@vitejs/plugin-vue-jsx";

export default defineConfig({
  plugins: [vue(), vueJsx()]
})
