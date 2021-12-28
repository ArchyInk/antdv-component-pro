/*
 * @author: Archy
 * @Date: 2021-12-28 10:01:12
 * @LastEditors: Archy
 * @LastEditTime: 2021-12-28 14:21:23
 * @FilePath: \sgd-pro-components\components\uploadTable\uploadTable.tsx
 * @description: 
 */
import { defineComponent, PropType, reactive, watch } from 'vue';
import Table from 'ant-design-vue/es/table/Table'
import { ColumnType, ColumnGroupType } from 'ant-design-vue/es/table/interface'
import { Divider, Upload, Button, Progress } from 'ant-design-vue'
import './style/index.less'
import getCls from '../shared/util/getCls';
import getFileSize from '../shared/util/getFileSize'
export type UploadTableProps = {
}

const uploadTableProps = {
  uploadedList: { type: Array, default: () => [] },
  columns: {
    type: Array as PropType<Array<ColumnGroupType<any> | ColumnType<any>>>, default: () => [
      {
        title: '文件名',
        dataIndex: 'fileName',
      }, {
        title: '文件大小',
        dataIndex: 'fileSize',
        customRender: ({ text }: Record<string, any>) => {
          return getFileSize(text * 1)
        }
      }, {
        title: '上传结果',
        key: 'progress'
      }, {
        title: '操作',
        key: 'actions',
      }
    ]
  },
  action: { type: String, required: true },
  beforeUpload: { type: Function as (...args: any[]) => any }
}

export default defineComponent({
  name: 'UploadTable',
  props: uploadTableProps,
  setup(props, { slots, emit }) {
    const download = () => {
      emit('download')
    }

    const del = () => {
      emit('del')
    }

    const funs = {
      download,
      del
    }

    const fileChange = ({ file, fileList, event }: Record<string, any>) => {
      fileList.find((item: any) => {
        return item.uid === file.uid
      }).event = event
      local.fileList = fileList
    }

    const local = reactive({
      uploadedList: props.uploadedList,
      fileList: []
    })

    watch(() => local.fileList, (n: any[]) => {
      let success = true
      const _n: unknown[] = n.map(item => {
        if (item.status === 'uploading') {
          success = false
        }
        return {
          fileName: item.name,
          fileSize: item.size,
          percent: Number(item.percent.toFixed(0)),
          status: item.status === 'uploading' ? 'normal' : item.status === 'success' ? 'success' : "exception"
        }
      })
      if (success) {
        emit('uploadResult', n.filter(item => {
          return item.event && item.event.response.success
        }))
      }
      local.uploadedList = _n.concat(props.uploadedList)
    }, { deep: true })

    const renderTable = () => {
      return <Table class={getCls('upload-table')} size="small" columns={props.columns}
        dataSource={local.uploadedList} v-slots={{
          bodyCell: (scope: any) => {
            scope.funs = funs
            if (scope.column.key === 'actions') {
              if (slots.actions) {
                return <>{slots.actions?.(scope)}</>
              } else {
                return (
                  <>
                    <a style={{ color: '#1890ff' }} onClick={funs.download}>下载</a>
                    <Divider type="vertical" />
                    <a style={{ color: '#f5222d' }} onClick={funs.del}>删除</a>
                  </>
                )
              }
            }
            if (scope.column.key === 'progress') {
              if (props.uploadedList.find((item: any) => item.mid === scope.record.mid)) {
                return <div>已上传</div>
              } else {
                return (
                  <Progress status={scope.record.status} percent={scope.record.percent}></Progress>
                )
              }
            }
          },
          footer: () => {
            return (
              <Upload
                v-model:file-list={local.fileList}
                beforeUpload={props.beforeUpload}
                showUploadList={false}
                name="file"
                action={props.action}
                onChange={fileChange}
              >
                <Button style={{ width: '100%' }} type="dashed">添加</Button>
              </Upload >
            )
          }
        }
        } >

      </Table >
    }
    return () => {
      return (
        <>
          {renderTable()}
        </>
      )
    }
  }
})