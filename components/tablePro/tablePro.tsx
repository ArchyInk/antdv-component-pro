/*
 * @author: Archy
 * @Date: 2021-12-22 11:40:53
 * @LastEditors: Archy
 * @LastEditTime: 2021-12-28 13:49:52
 * @FilePath: \sgd-pro-components\components\tablePro\tablePro.tsx
 * @description: 
 */
import { Dropdown, Menu, MenuItem, Checkbox } from 'ant-design-vue'
import Table, { tableProps, TablePaginationConfig } from 'ant-design-vue/es/table/Table'
import { ColumnType } from 'ant-design-vue/es/table/interface'
import { PanelRender, DefaultRecordType } from 'ant-design-vue/es/vc-table/interface';
import { PaginationProps } from 'ant-design-vue/es/pagination/Pagination'
import { defineComponent, reactive, toRefs, ref, computed, getCurrentInstance } from 'vue';
import getCls from '../shared/util/getCls'
import zhCN from 'ant-design-vue/es/locale/zh_CN'
import './style/index.less'
import { ReloadOutlined, ColumnHeightOutlined, SettingOutlined, FullscreenOutlined } from '@ant-design/icons-vue'
import dragable from "vuedraggable";
const Dragable = dragable as any
import { cloneDeep } from 'lodash'

const tableProProps = Object.assign({}, tableProps(), {
  pageNum: { type: Number, validator: (value: number) => value > 0, default: 1 },
  pageSize: { type: Number, validator: (value: number) => [10, 20, 50, 100].includes(value), default: 10 },
  showSizeChanger: { type: Boolean, default: true },
  showQuickJumper: { type: Boolean, default: true },
  showTotal: { type: Boolean, default: true },
  showPagination: { type: [Boolean, String], default: true },
  totalFooter: { type: [Object, Boolean], default: false },
  dataField: { type: String, default: 'data' },
  pageSizeOptions: { type: Array, default: ['10', '20', '50', '100'] },
  data: { type: [Array, Function], default: () => [] },
  sortFieldArr: { type: Array, default: () => ['asc', 'desc'] },
  orderField: { type: String, default: 'order' },
  sortField: { type: String, default: 'sort' },
  clearBtnStyle: { type: Object },
  titleStyle: { type: Object }
})


export type TableProProps = typeof tableProProps


interface TableProResult {
  currentPage: number,
  pageSize: number,
  totalPage: number,
  totalCount: number,
  [key: string]: object[] | number
}

interface ColumnProProps extends ColumnType {
  needTotal?: boolean,
  show?: boolean,
}

export default defineComponent({
  name: 'TablePro',
  props: tableProProps,
  setup(props, { slots }) {
    const {
      pageNum,
      pageSize,
      showSizeChanger,
      pagination,
      showQuickJumper,
      showTotal,
      pageSizeOptions,
      showPagination,
      dataField,
      columns,
      sortField,
      sortFieldArr,
      data,
      titleStyle
    } = toRefs(props)

    const fullscreenState = ref(false)
    const syncMode = computed(() => Array.isArray(data.value))
    let _columns = ref(cloneDeep(columns.value) as ColumnProProps[])

    const local = reactive({
      dataSource: [] as object[],
      loading: false as boolean,
      pagination: Object.assign({}, pagination),
      size: 'default',
      columns: (columns.value as ColumnProProps[]).filter((item: ColumnProProps) => item.show !== false),
    })

    const renderTitle = (currentPageData: PanelRender<DefaultRecordType>) => {
      // 刷新表格按钮
      const onClick = () => {
        refresh()
      }
      // 改变表格size
      const renderTableSizeOverLay = () => (
        <Menu>
          <MenuItem onClick={() => local.size = 'default'}>默认</MenuItem>
          <MenuItem onClick={() => local.size = 'middle'}>中等</MenuItem>
          <MenuItem onClick={() => local.size = 'small'}>紧凑</MenuItem>
        </Menu>
      )
      const renderTableSettingOverLay = () => {
        const resetColumns = () => {
          _columns.value = cloneDeep(columns.value) as ColumnProProps[]
          local.columns = _columns.value.filter((item: ColumnProProps) => item.show !== false)
        }
        const dragEnd = () => {
          local.columns = _columns.value.filter((item: ColumnProProps) => item.show !== false)
        }
        const indeterminate = computed(() => _columns.value.some((item) => item.show === false))
        const checkAll = (e: any) => {
          if (e.target.checked) {
            _columns.value.map((item) => {
              item.show = true
            })
            local.columns = _columns.value.filter((item: ColumnProProps) => item.show !== false)
          } else {
            _columns.value.map((item, index) => {
              index === 0 ? item.show = true : item.show = false
            })
            local.columns = _columns.value.filter((item: ColumnProProps) => item.show !== false)
          }
        }

        return (
          <Dragable onEnd={dragEnd} v-model={_columns.value} class="columnDrag" itemKey='dataIndex' v-slots={{
            header: () => (<div class="columnDrag__header" onClick={(e) => e.stopPropagation()}>
              <Checkbox defaultChecked={true} indeterminate={indeterminate.value} onChange={checkAll} >列筛选/排序</Checkbox>
              <a href="javascript:void(0)" onClick={resetColumns} >重置</a>
            </div >),
            item: ({ element }: any) => {
              const checked = ref(element.show !== false)
              const onChange = (e: any) => {
                if (!e.target.checked && _columns.value.filter((item) => item.show !== false).length === 1) {
                  return;
                }
                element.show = e.target.checked
                local.columns = _columns.value.filter((item: ColumnProProps) => item.show !== false)
              }
              return (<div class="columnDrag__item" onClick={(e) => e.stopPropagation()}>
                ::&nbsp;
                <Checkbox v-model:checked={checked.value} onChange={onChange}>{element.title}</Checkbox>
              </div >)
            },
          }
          } ></Dragable>
        )
      }

      return (
        fullscreenState.value ? null :
          (<div class="sgd-table-title" style={titleStyle.value}>
            <div>{slots.title?.(currentPageData)}</div>
            <div class="sgd-table-title-btns">
              <div>
                <ReloadOutlined onClick={onClick} />
              </div>
              <div>
                <Dropdown placement="bottomCenter" trigger={['click']} v-slots={{ overlay: () => renderTableSizeOverLay() }}>
                  <ColumnHeightOutlined />
                </Dropdown>
              </div>
              <div>
                <Dropdown placement="bottomCenter" trigger={['click']} v-slots={{ overlay: () => renderTableSettingOverLay() }}>
                  <SettingOutlined />
                </Dropdown>
              </div>
              <div>
                <FullscreenOutlined onClick={() => fullscreenState.value = !fullscreenState.value} />
              </div>
            </div>
          </div>)
      )
    }


    const loadSyncData = () => {
      local.loading = true
      setTimeout(() => {
        local.loading = false
        local.dataSource = data.value as object[]
      }, 500)
    }



    const loadAsyncData = (pagination?: PaginationProps, filters?: any, sorter?: any) => {
      if (sorter?.order == 'ascend') {
        sorter.order = sortFieldArr.value[0]
      } else if (sorter?.order == 'descend') {
        sorter.order = sortFieldArr.value[1]
      }
      local.loading = true
      const parameter = Object.assign(
        {
          currentPage:
            (pagination?.current) ||
            (showPagination.value && (local.pagination as TablePaginationConfig).current) ||
            pageNum.value,
          pageSize:
            (pagination?.pageSize) ||
            (showPagination.value && (local.pagination as TablePaginationConfig).pageSize) ||
            pageSize.value
        },
        (sorter?.field && { [sortField.value]: sorter.field, }) || {},
        (sorter?.order && { [sortField.value]: sorter.order, }) || {},
        {
          ...filters
        }
      )
      const result = (data.value as Function)(parameter)
      result.then((res: TableProResult) => {
        if (!res[dataField.value]) {
          console.warn(`[sgd-pro-components]${dataField.value} is undefined in response`);
          local.dataSource = []
          local.loading = false
          return
        }

        local.pagination = Object.assign(
          {},
          local.pagination,
          {
            current: res.currentPage,
            total: res.totalCount,
            showTotal: showTotal.value ? (total: number) => `总共 ${total} 项` : undefined,
            showSizeChanger: showSizeChanger.value,
            showQuickJumper: showQuickJumper.value,
            pageSizeOptions: pageSizeOptions.value,
            pageSize:
              pagination?.pageSize ||
              (local.pagination as TablePaginationConfig).pageSize,
          }
        )

        if ((res[dataField.value] as object[]).length === 0 && (local.pagination as TablePaginationConfig).current as number > 1) {
          ((local.pagination as TablePaginationConfig).current as number)--
          loadAsyncData(pagination)
          return
        }

        (!showPagination.value ||
          (!res.totalCount && showPagination.value === 'auto')) &&
          (local.pagination = false)

        local.dataSource = res[dataField.value] as object[]
        local.loading = false
      }).catch((err: Error) => {
        local.dataSource = []
        local.loading = false
      })
    }



    const refresh = (bool = false) => {
      bool &&
        (local.pagination = Object.assign(
          {},
          {
            current: 1,
            pageSize: pageSize.value,
          }
        ))
      syncMode.value ? loadSyncData() : loadAsyncData()
    }

    const ctx = (getCurrentInstance() as any)['ctx']
    ctx['refresh'] = refresh

    local.pagination = (['auto', true].includes(showSizeChanger.value) &&
      Object.assign({}, local.pagination, {
        currentPage: pageNum.value,
        pageSize: pageSize.value,
        showTotal: showTotal.value
          ? (total: number) => `总共 ${total} 项`
          : undefined,
        showSizeChanger: showSizeChanger.value,
        showQuickJumper: showQuickJumper.value,
        pageSizeOptions: pageSizeOptions.value,
        locale: zhCN.Pagination
      })) || false

    syncMode.value ? loadSyncData() : loadAsyncData()

    return () => {
      const _props = Object.assign({}, props, local)
      const renderTable = (
        <Table {..._props} locale={zhCN.Table} onChange={syncMode.value ? loadSyncData : loadAsyncData} v-slots={{
          ...slots,
          title: (currentPageData: PanelRender<DefaultRecordType>) => renderTitle(currentPageData),
        }}>
        </Table>
      )

      return (
        <fullscreen ref="fullscreenEle" v-model={fullscreenState.value} fullscreenClass="fullscreenClass">
          <div class={getCls('table')}>
            {renderTable}
          </div>
        </fullscreen>
      )
    }
  }
})