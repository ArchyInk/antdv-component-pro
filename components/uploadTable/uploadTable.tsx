/*
 * @author: Archy
 * @Date: 2021-12-28 10:01:12
 * @LastEditors: Archy
 * @LastEditTime: 2022-01-12 13:19:36
 * @FilePath: \sgd-pro-components\components\uploadTable\uploadTable.tsx
 * @description: 
 */
import { defineComponent, PropType, reactive, watch, ref } from 'vue';
import Table from 'ant-design-vue/es/table/Table'
import { ColumnType, ColumnGroupType } from 'ant-design-vue/es/table/interface'
import { GetComponentProps } from 'ant-design-vue/es/vc-table/interface'
import { Divider, Upload, Button, Progress, Modal, ConfigProvider, Descriptions, DescriptionsItem } from 'ant-design-vue'
import zhCN from 'ant-design-vue/es/locale/zh_CN'

import './style/index.less'
import getCls from '../shared/util/getCls';
import formatFileSize from '../shared/util/formatFileSize'

export type UploadTableProps = typeof uploadTableProps

const uploadTableProps = {
  uploadedList: { type: Array, default: () => [] },
  columns: {
    type: Array as PropType<Array<ColumnGroupType<any> | ColumnType<any>>>, default: () => [
      {
        title: '文件名',
        customRender: ({ record }: Record<string, any>) => {
          return record.fileOldName ? record.fileOldName : record.fileName
        }
      }, {
        title: '文件大小',
        dataIndex: 'fileSize',
        customRender: ({ text }: Record<string, any>) => {
          return formatFileSize(text * 1)
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
  data: { type: Object },
  showAdd: { type: Boolean, default: true },
  customRow: { type: Function }
}

export default defineComponent({
  name: 'UploadTable',
  props: uploadTableProps,
  emits: ['download', 'del', 'uploadResult', 'cancel', 'submit'],
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

    const local = reactive<{ uploadedList: unknown[], fileList: Array<File>, file: File | undefined }>({
      uploadedList: props.uploadedList,
      fileList: [],
      file: undefined
    })

    watch(() => props.uploadedList, (n: any[]) => {
      local.uploadedList = n
    })

    watch(() => local.fileList, (n: any[]) => {
      let success = true
      let fileRes = null
      const _n: unknown[] = n.map(item => {
        if (item.status === 'uploading') {
          success = false
        }
        if ((local.file as any).uid = item.uid) {
          fileRes = item
        }
        return {
          fileName: item.name,
          fileSize: item.size,
          percent: Number(item.percent.toFixed(0)),
          status: item.status === 'uploading' ? 'normal' : item.status === 'done' ? 'success' : "exception"
        }
      })
      if (success) {
        emit('uploadResult', { fileList: n, file: fileRes })
      }
      local.uploadedList = _n.concat(props.uploadedList)
    }, { deep: true })

    const modalVisible = ref(false)
    let beforeUploadResolve: ((value: void | PromiseLike<void>) => void) | null = null
    let beforeUploadReject: ((reason?: any) => void) | null = null


    const renderModal = () => {
      const handleCancel = () => {
        modalVisible.value = false
        emit('cancel')
        beforeUploadReject?.()
      }
      const handleSubmit = () => {
        modalVisible.value = false
        emit('submit')
        beforeUploadResolve?.()
      }
      return (
        <ConfigProvider locale={zhCN}>
          <Modal v-model:visible={modalVisible.value} width={400} title="文件信息" v-slots={{
            footer: () => (<>
              <Button key="cancel" onClick={handleCancel}>返回</Button>
              <Button key="submit" type="primary" onClick={handleSubmit}>上传</Button>
            </>
            )
          }}>
            {
              slots.modal ?
                slots.modal() :
                <>
                  <Descriptions column={1}>
                    <DescriptionsItem label="文件名称">{(local.file as File).name}</DescriptionsItem>
                    <DescriptionsItem label="文件大小">{formatFileSize((local.file as File).size)}</DescriptionsItem>
                    <DescriptionsItem label="文件类型">{(local.file as File).type}</DescriptionsItem>
                  </Descriptions>
                  {slots.extendsModal?.()}
                </>
            }
          </Modal >
        </ConfigProvider >
      )
    }

    const beforeUpload = async (file: any) => {
      local.file = file
      modalVisible.value = true
      const p = await new Promise<void>((resolve, reject) => {
        beforeUploadResolve = resolve
        beforeUploadReject = reject
      })
      return p
    }

    const renderTable = () => {
      return <Table class={getCls('upload-table')} size="small" columns={props.columns}
        customRow={props.customRow as GetComponentProps<any>}
        dataSource={local.uploadedList} v-slots={{
          title: slots.title ? (scope: any) => <>{slots.title?.(scope)}</> : undefined,
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
              <>
                {
                  props.showAdd ? <Upload
                    v-model:file-list={local.fileList}
                    data={props.data}
                    beforeUpload={beforeUpload}
                    showUploadList={false}
                    name="file"
                    action={props.action}
                    onChange={fileChange}
                  >
                    <Button style={{ width: '100%' }} type="dashed" >添加</Button>
                  </Upload > : null
                }
              </>
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
          {renderModal()}
        </>
      )
    }
  }
})