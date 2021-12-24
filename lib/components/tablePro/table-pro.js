"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _vue = require("vue");

var _antDesignVue = require("ant-design-vue");

var _Table = _interopRequireWildcard(require("ant-design-vue/es/table/Table"));

var _getCls = _interopRequireDefault(require("../shared/util/getCls"));

var _zh_CN = _interopRequireDefault(require("ant-design-vue/es/locale/zh_CN"));

require("./style/index.css");

var _iconsVue = require("@ant-design/icons-vue");

var _vuedraggable = _interopRequireDefault(require("vuedraggable"));

var _lodash = require("lodash");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var Dragable = _vuedraggable["default"];
var tableProProps = Object.assign({}, (0, _Table.tableProps)(), {
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
  }
});

var _default2 = (0, _vue.defineComponent)({
  name: 'TablePro',
  props: tableProProps,
  setup: function setup(props, _ref) {
    var slots = _ref.slots;

    var _toRefs = (0, _vue.toRefs)(props),
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
        titleStyle = _toRefs.titleStyle;

    var fullscreenState = (0, _vue.ref)(false);
    var syncMode = (0, _vue.computed)(function () {
      return Array.isArray(data.value);
    });

    var _columns = (0, _vue.ref)((0, _lodash.cloneDeep)(columns.value));

    var local = (0, _vue.reactive)({
      dataSource: [],
      loading: false,
      pagination: Object.assign({}, pagination),
      size: 'default',
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
        return (0, _vue.createVNode)(_antDesignVue.Menu, null, {
          "default": function _default() {
            return [(0, _vue.createVNode)(_antDesignVue.MenuItem, {
              "onClick": function onClick() {
                return local.size = 'default';
              }
            }, {
              "default": function _default() {
                return [(0, _vue.createTextVNode)("\u9ED8\u8BA4")];
              }
            }), (0, _vue.createVNode)(_antDesignVue.MenuItem, {
              "onClick": function onClick() {
                return local.size = 'middle';
              }
            }, {
              "default": function _default() {
                return [(0, _vue.createTextVNode)("\u4E2D\u7B49")];
              }
            }), (0, _vue.createVNode)(_antDesignVue.MenuItem, {
              "onClick": function onClick() {
                return local.size = 'small';
              }
            }, {
              "default": function _default() {
                return [(0, _vue.createTextVNode)("\u7D27\u51D1")];
              }
            })];
          }
        });
      };

      var renderTableSettingOverLay = function renderTableSettingOverLay() {
        var resetColumns = function resetColumns() {
          _columns.value = (0, _lodash.cloneDeep)(columns.value);
          local.columns = _columns.value.filter(function (item) {
            return item.show !== false;
          });
        };

        var dragEnd = function dragEnd() {
          local.columns = _columns.value.filter(function (item) {
            return item.show !== false;
          });
        };

        var indeterminate = (0, _vue.computed)(function () {
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

        return (0, _vue.createVNode)(Dragable, {
          "onEnd": dragEnd,
          "modelValue": _columns.value,
          "onUpdate:modelValue": function onUpdateModelValue($event) {
            return _columns.value = $event;
          },
          "class": "columnDrag",
          "itemKey": 'dataIndex'
        }, {
          header: function header() {
            return (0, _vue.createVNode)("div", {
              "class": "columnDrag__header",
              "onClick": function onClick(e) {
                return e.stopPropagation();
              }
            }, [(0, _vue.createVNode)(_antDesignVue.Checkbox, {
              "defaultChecked": true,
              "indeterminate": indeterminate.value,
              "onChange": checkAll
            }, {
              "default": function _default() {
                return [(0, _vue.createTextVNode)("\u5217\u7B5B\u9009/\u6392\u5E8F")];
              }
            }), (0, _vue.createVNode)("a", {
              "href": "javascript:void(0)",
              "onClick": resetColumns
            }, [(0, _vue.createTextVNode)("\u91CD\u7F6E")])]);
          },
          item: function item(_ref2) {
            var element = _ref2.element;
            var checked = (0, _vue.ref)(element.show !== false);

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

            return (0, _vue.createVNode)("div", {
              "class": "columnDrag__item",
              "onClick": function onClick(e) {
                return e.stopPropagation();
              }
            }, [(0, _vue.createTextVNode)("::\xA0"), (0, _vue.createVNode)(_antDesignVue.Checkbox, {
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

      return fullscreenState.value ? null : (0, _vue.createVNode)("div", {
        "class": "sgd-table-title",
        "style": titleStyle.value
      }, [(0, _vue.createVNode)("div", null, [(_slots$title = slots.title) === null || _slots$title === void 0 ? void 0 : _slots$title.call(slots, currentPageData)]), (0, _vue.createVNode)("div", {
        "class": "sgd-table-title-btns"
      }, [(0, _vue.createVNode)("div", null, [(0, _vue.createVNode)(_iconsVue.ReloadOutlined, {
        "onClick": onClick
      }, null)]), (0, _vue.createVNode)("div", null, [(0, _vue.createVNode)(_antDesignVue.Dropdown, {
        "placement": "bottomCenter",
        "trigger": ['click']
      }, {
        "default": function _default() {
          return [(0, _vue.createVNode)(_iconsVue.ColumnHeightOutlined, null, null)];
        },
        overlay: function overlay() {
          return renderTableSizeOverLay();
        }
      })]), (0, _vue.createVNode)("div", null, [(0, _vue.createVNode)(_antDesignVue.Dropdown, {
        "placement": "bottomCenter",
        "trigger": ['click']
      }, {
        "default": function _default() {
          return [(0, _vue.createVNode)(_iconsVue.SettingOutlined, null, null)];
        },
        overlay: function overlay() {
          return renderTableSettingOverLay();
        }
      })]), (0, _vue.createVNode)("div", null, [(0, _vue.createVNode)(_iconsVue.FullscreenOutlined, {
        "onClick": function onClick() {
          return fullscreenState.value = !fullscreenState.value;
        }
      }, null)])])]);
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
        console.error(err);
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
      syncMode.value ? loadSyncData() : loadAsyncData();
    };

    var ctx = (0, _vue.getCurrentInstance)()['ctx'];
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
      locale: _zh_CN["default"].Pagination
    }) || false;
    syncMode.value ? loadSyncData() : loadAsyncData();
    return function () {
      var _props = Object.assign({}, props, local);

      var renderTable = (0, _vue.createVNode)(_Table["default"], (0, _vue.mergeProps)(_props, {
        "locale": _zh_CN["default"].Table,
        "onChange": syncMode.value ? loadSyncData : loadAsyncData
      }), _objectSpread(_objectSpread({}, slots), {}, {
        title: function title(currentPageData) {
          return renderTitle(currentPageData);
        }
      }));
      return (0, _vue.createVNode)((0, _vue.resolveComponent)("fullscreen"), {
        "ref": "fullscreenEle",
        "modelValue": fullscreenState.value,
        "onUpdate:modelValue": function onUpdateModelValue($event) {
          return fullscreenState.value = $event;
        },
        "fullscreenClass": "fullscreenClass"
      }, {
        "default": function _default() {
          return [(0, _vue.createVNode)("div", {
            "class": (0, _getCls["default"])('table')
          }, [renderTable])];
        }
      });
    };
  }
});

exports["default"] = _default2;