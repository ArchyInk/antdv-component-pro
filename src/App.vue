<!--
 * @author: Archy
 * @Date: 2021-12-22 11:20:38
 * @LastEditors: Archy
 * @LastEditTime: 2021-12-24 16:07:01
 * @FilePath: \sgd-pro-components\src\App.vue
 * @description: 
-->
<template>
  <sgd-table-pro :columns="columns" ref="table" :data="getData">
    <template #title>
      <button @click="refresh">刷新</button>
    </template>
  </sgd-table-pro>
</template>

<script setup lang="ts">
import { ref } from 'vue'
const columns = [
  { title: 'mid', dataIndex: 'mid', width: 200 },
  { title: '名称', dataIndex: 'title', width: 200 },
  { title: 'key', dataIndex: 'key', width: 200, show: false },
  { title: '图标', dataIndex: 'icon', width: 200 },
  { title: '状态', dataIndex: 'state', width: 200 },
  { title: '种类', dataIndex: 'type', width: 200 },
]

const table = ref(null)

// const getData = () => fetch('http://rap2api.taobao.org/app/mock/293243/getResources').then(async res => {
//   const json = await res.json()
//   return json
// })

const getData = ref([])

fetch('http://rap2api.taobao.org/app/mock/293243/getResources').then(async res => {
  const json = await res.json()
  getData.value = json.data
  // return json
})


const refresh = () => {
  table.value.refresh()
}

</script>

<style>
#app {
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 60px;
}
</style>
