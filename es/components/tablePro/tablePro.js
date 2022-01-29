import { resolveComponent as _resolveComponent, mergeProps as _mergeProps, resolveDirective as _resolveDirective, createVNode as _createVNode, createTextVNode as _createTextVNode } from "vue";

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

/*
 * @author: Archy
 * @Date: 2021-12-22 11:40:53
 * @LastEditors: Archy
 * @LastEditTime: 2022-01-19 17:01:03
 * @FilePath: \sgd-pro-components\components\tablePro\tablePro.tsx
 * @description: 
 */
import { Dropdown, Menu, MenuItem, Checkbox } from 'ant-design-vue';
import Table, { tableProps } from 'ant-design-vue/es/table/Table';
import { defineComponent, reactive, toRefs, ref, computed, getCurrentInstance } from 'vue';
import getCls from '../shared/util/getCls';
import zhCN from 'ant-design-vue/es/locale/zh_CN';
import './style/index.css';
import { ReloadOutlined, ColumnHeightOutlined, SettingOutlined, FullscreenOutlined } from '@ant-design/icons-vue';
import dragable from "vuedraggable";
var Dragable = dragable;
import { cloneDeep } from 'lodash';
var tableProProps = Object.assign({}, tableProps(), {
  pageNum: {
    type: Number,
    validator: function validator(value) {
      return value > 0;
    },
    "default": 1
  },
  pageSize: {
    type: Number,
    validator: function validator(value) {
      return [10, 20, 50, 100].includes(value);
    },
    "default": 10
  },
  showSizeChanger: {
    type: Boolean,
    "default": true
  },
  showQuickJumper: {
    type: Boolean,
    "default": true
  },
  showTotal: {
    type: Boolean,
    "default": true
  },
  showPagination: {
    type: [Boolean, String],
    "default": true
  },
  totalFooter: {
    type: [Object, Boolean],
    "default": false
  },
  dataField: {
    type: String,
    "default": 'data'
  },
  pageSizeOptions: {
    type: Array,
    "default": ['10', '20', '50', '100']
  },
  data: {
    type: [Array, Function],
    "default": function _default() {
      return [];
    }
  },
  sortFieldArr: {
    type: Array,
    "default": function _default() {
      return ['asc', 'desc'];
    }
  },
  orderField: {
    type: String,
    "default": 'order'
  },
  sortField: {
    type: String,
    "default": 'sort'
  },
  clearBtnStyle: {
    type: Object
  },
  titleStyle: {
    type: Object
  },
  showTools: {
    type: Boolean,
    "default": true
  }
});
export default defineComponent({
  name: 'TablePro',
  props: tableProProps,
  setup: function setup(props, _ref) {
    var slots = _ref.slots;

    var _toRefs = toRefs(props),
        pageNum = _toRefs.pageNum,
        pageSize = _toRefs.pageSize,
        showSizeChanger = _toRefs.showSizeChanger,
        pagination = _toRefs.pagination,
        showQuickJumper = _toRefs.showQuickJumper,
        showTotal = _toRefs.showTotal,
        pageSizeOptions = _toRefs.pageSizeOptions,
        showPagination = _toRefs.showPagination,
        dataField = _toRefs.dataField,
        columns = _toRefs.columns,
        sortField = _toRefs.sortField,
        sortFieldArr = _toRefs.sortFieldArr,
        data = _toRefs.data,
        titleStyle = _toRefs.titleStyle,
        showTools = _toRefs.showTools,
        size = _toRefs.size;

    var fullscreenState = ref(false);
    var syncMode = computed(function () {
      return Array.isArray(data.value);
    });

    var _columns = ref(cloneDeep(columns.value));

    var local = reactive({
      dataSource: [],
      loading: false,
      pagination: Object.assign({}, pagination),
      size: size.value ? size.value : 'default',
      columns: columns.value.filter(function (item) {
        return item.show !== false;
      })
    });

    var renderTitle = function renderTitle(currentPageData) {
      var _slots$title;

      // 刷新表格按钮
      var onClick = function onClick() {
        refresh();
      }; // 改变表格size


      var renderTableSizeOverLay = function renderTableSizeOverLay() {
        return _createVNode(Menu, null, {
          "default": function _default() {
            return [_createVNode(MenuItem, {
              "onClick": function onClick() {
                return local.size = 'default';
              }
            }, {
              "default": function _default() {
                return [_createTextVNode("\u9ED8\u8BA4")];
              }
            }), _createVNode(MenuItem, {
              "onClick": function onClick() {
                return local.size = 'middle';
              }
            }, {
              "default": function _default() {
                return [_createTextVNode("\u4E2D\u7B49")];
              }
            }), _createVNode(MenuItem, {
              "onClick": function onClick() {
                return local.size = 'small';
              }
            }, {
              "default": function _default() {
                return [_createTextVNode("\u7D27\u51D1")];
              }
            })];
          }
        });
      };

      var renderTableSettingOverLay = function renderTableSettingOverLay() {
        var resetColumns = function resetColumns() {
          _columns.value = cloneDeep(columns.value);
          local.columns = _columns.value.filter(function (item) {
            return item.show !== false;
          });
        };

        var dragEnd = function dragEnd() {
          local.columns = _columns.value.filter(function (item) {
            return item.show !== false;
          });
        };

        var indeterminate = computed(function () {
          return _columns.value.some(function (item) {
            return item.show === false;
          });
        });

        var checkAll = function checkAll(e) {
          if (e.target.checked) {
            _columns.value.map(function (item) {
              item.show = true;
            });

            local.columns = _columns.value.filter(function (item) {
              return item.show !== false;
            });
          } else {
            _columns.value.map(function (item, index) {
              index === 0 ? item.show = true : item.show = false;
            });

            local.columns = _columns.value.filter(function (item) {
              return item.show !== false;
            });
          }
        };

        return _createVNode(Dragable, {
          "onEnd": dragEnd,
          "modelValue": _columns.value,
          "onUpdate:modelValue": function onUpdateModelValue($event) {
            return _columns.value = $event;
          },
          "class": "columnDrag",
          "itemKey": 'dataIndex'
        }, {
          header: function header() {
            return _createVNode("div", {
              "class": "columnDrag__header",
              "onClick": function onClick(e) {
                return e.stopPropagation();
              }
            }, [_createVNode(Checkbox, {
              "defaultChecked": true,
              "indeterminate": indeterminate.value,
              "onChange": checkAll
            }, {
              "default": function _default() {
                return [_createTextVNode("\u5217\u7B5B\u9009/\u6392\u5E8F")];
              }
            }), _createVNode("a", {
              "href": "javascript:void(0)",
              "onClick": resetColumns
            }, [_createTextVNode("\u91CD\u7F6E")])]);
          },
          item: function item(_ref2) {
            var element = _ref2.element;
            var checked = ref(element.show !== false);

            var onChange = function onChange(e) {
              if (!e.target.checked && _columns.value.filter(function (item) {
                return item.show !== false;
              }).length === 1) {
                return;
              }

              element.show = e.target.checked;
              local.columns = _columns.value.filter(function (item) {
                return item.show !== false;
              });
            };

            return _createVNode("div", {
              "class": "columnDrag__item",
              "onClick": function onClick(e) {
                return e.stopPropagation();
              }
            }, [_createTextVNode("::\xA0"), _createVNode(Checkbox, {
              "checked": checked.value,
              "onUpdate:checked": function onUpdateChecked($event) {
                return checked.value = $event;
              },
              "onChange": onChange
            }, {
              "default": function _default() {
                return [element.title];
              }
            })]);
          }
        });
      };

      return fullscreenState.value ? null : _createVNode("div", {
        "class": "sgd-table-title",
        "style": titleStyle.value
      }, [_createVNode("div", null, [(_slots$title = slots.title) === null || _slots$title === void 0 ? void 0 : _slots$title.call(slots, currentPageData)]), showTools.value ? _createVNode("div", {
        "class": "sgd-table-title-btns"
      }, [_createVNode("div", null, [_createVNode(ReloadOutlined, {
        "onClick": onClick
      }, null)]), _createVNode("div", null, [_createVNode(Dropdown, {
        "placement": "bottomCenter",
        "trigger": ['click']
      }, {
        "default": function _default() {
          return [_createVNode(ColumnHeightOutlined, null, null)];
        },
        overlay: function overlay() {
          return renderTableSizeOverLay();
        }
      })]), _createVNode("div", null, [_createVNode(Dropdown, {
        "placement": "bottomCenter",
        "trigger": ['click']
      }, {
        "default": function _default() {
          return [_createVNode(SettingOutlined, null, null)];
        },
        overlay: function overlay() {
          return renderTableSettingOverLay();
        }
      })]), _createVNode("div", null, [_createVNode(FullscreenOutlined, {
        "onClick": function onClick() {
          return fullscreenState.value = !fullscreenState.value;
        }
      }, null)])]) : null]);
    };

    var loadSyncData = function loadSyncData() {
      local.loading = true;
      setTimeout(function () {
        local.loading = false;
        local.dataSource = data.value;
      }, 500);
    };

    var loadAsyncData = function loadAsyncData(pagination, filters, sorter) {
      if ((sorter === null || sorter === void 0 ? void 0 : sorter.order) == 'ascend') {
        sorter.order = sortFieldArr.value[0];
      } else if ((sorter === null || sorter === void 0 ? void 0 : sorter.order) == 'descend') {
        sorter.order = sortFieldArr.value[1];
      }

      local.loading = true;
      var parameter = Object.assign({
        currentPage: (pagination === null || pagination === void 0 ? void 0 : pagination.current) || showPagination.value && local.pagination.current || pageNum.value,
        pageSize: (pagination === null || pagination === void 0 ? void 0 : pagination.pageSize) || showPagination.value && local.pagination.pageSize || pageSize.value
      }, (sorter === null || sorter === void 0 ? void 0 : sorter.field) && _defineProperty({}, sortField.value, sorter.field) || {}, (sorter === null || sorter === void 0 ? void 0 : sorter.order) && _defineProperty({}, sortField.value, sorter.order) || {}, _objectSpread({}, filters));
      var result = data.value(parameter);
      result.then(function (res) {
        if (!res[dataField.value]) {
          console.warn("[sgd-pro-components]".concat(dataField.value, " is undefined in response"));
          local.dataSource = [];
          local.loading = false;
          return;
        }

        local.pagination = Object.assign({}, local.pagination, {
          current: res.currentPage,
          total: res.totalCount,
          showTotal: showTotal.value ? function (total) {
            return "\u603B\u5171 ".concat(total, " \u9879");
          } : undefined,
          showSizeChanger: showSizeChanger.value,
          showQuickJumper: showQuickJumper.value,
          pageSizeOptions: pageSizeOptions.value,
          pageSize: (pagination === null || pagination === void 0 ? void 0 : pagination.pageSize) || local.pagination.pageSize
        });

        if (res[dataField.value].length === 0 && local.pagination.current > 1) {
          local.pagination.current--;
          loadAsyncData(pagination);
          return;
        }

        (!showPagination.value || !res.totalCount && showPagination.value === 'auto') && (local.pagination = false);
        local.dataSource = res[dataField.value];
        local.loading = false;
      })["catch"](function (err) {
        local.dataSource = [];
        local.loading = false;
      });
    };

    var refresh = function refresh() {
      var bool = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;
      bool && (local.pagination = Object.assign({}, {
        current: 1,
        pageSize: pageSize.value
      }));
      local.dataSource = [];
      syncMode.value ? loadSyncData() : loadAsyncData();
    };

    var ctx = getCurrentInstance()['ctx'];
    ctx['refresh'] = refresh;
    local.pagination = ['auto', true].includes(showSizeChanger.value) && Object.assign({}, local.pagination, {
      currentPage: pageNum.value,
      pageSize: pageSize.value,
      showTotal: showTotal.value ? function (total) {
        return "\u603B\u5171 ".concat(total, " \u9879");
      } : undefined,
      showSizeChanger: showSizeChanger.value,
      showQuickJumper: showQuickJumper.value,
      pageSizeOptions: pageSizeOptions.value,
      locale: zhCN.Pagination
    }) || false;
    syncMode.value ? loadSyncData() : loadAsyncData();
    return function () {
      var _props = Object.assign({}, props, local);

      var renderTable = _createVNode(Table, _mergeProps(_props, {
        "locale": zhCN.Table,
        "onChange": syncMode.value ? loadSyncData : loadAsyncData
      }), _objectSpread(_objectSpread({}, slots), {}, {
        title: slots.title || showTools.value ? function (currentPageData) {
          return renderTitle(currentPageData);
        } : undefined
      }));

      return _createVNode(_resolveComponent("fullscreen"), {
        "ref": "fullscreenEle",
        "modelValue": fullscreenState.value,
        "onUpdate:modelValue": function onUpdateModelValue($event) {
          return fullscreenState.value = $event;
        },
        "fullscreenClass": "fullscreenClass"
      }, {
        "default": function _default() {
          return [_createVNode("div", {
            "class": getCls('table')
          }, [renderTable])];
        }
      });
    };
  }
});