<!--
 * @author: Archy
 * @Date: 2021-12-22 11:20:38
 * @LastEditors: Archy
 * @LastEditTime: 2021-12-28 13:27:03
 * @FilePath: \sgd-pro-components\src\App.vue
 * @description: 
-->
<template>
  <!-- <sgd-table-pro :columns="columns" ref="table" :data="getData">
    <template #title>
      <button @click="refresh">刷新</button>
    </template>
  </sgd-table-pro>-->
  <div :style="{ width: '1200px' }">
    <sgd-upload-table
      :uploadedList="uploadedList"
      action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
    ></sgd-upload-table>
  </div>
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
const uploadedList = [
  { fileName: '文件1', fileSize: '100', mid: 1 },
  { fileName: '文件2', fileSize: '200', mid: 2 }
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
