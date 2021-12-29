"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _vue = require("vue");

var _Table = _interopRequireDefault(require("ant-design-vue/es/table/Table"));

var _antDesignVue = require("ant-design-vue");

require("./style/index.css");

var _getCls = _interopRequireDefault(require("../shared/util/getCls"));

var _getFileSize = _interopRequireDefault(require("../shared/util/getFileSize"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

/*
 * @author: Archy
 * @Date: 2021-12-28 10:01:12
 * @LastEditors: Archy
 * @LastEditTime: 2021-12-28 15:08:45
 * @FilePath: \sgd-pro-components\components\uploadTable\uploadTable.tsx
 * @description: 
 */
var uploadTableProps = {
  uploadedList: {
    type: Array,
    "default": function _default() {
      return [];
    }
  },
  columns: {
    type: Array,
    "default": function _default() {
      return [{
        title: '文件名',
        dataIndex: 'fileName'
      }, {
        title: '文件大小',
        dataIndex: 'fileSize',
        customRender: function customRender(_ref) {
          var text = _ref.text;
          return (0, _getFileSize["default"])(text * 1);
        }
      }, {
        title: '上传结果',
        key: 'progress'
      }, {
        title: '操作',
        key: 'actions'
      }];
    }
  },
  action: {
    type: String,
    required: true
  },
  beforeUpload: {
    type: Function
  },
  customRow: {
    type: Function
  }
};

var _default2 = (0, _vue.defineComponent)({
  name: 'UploadTable',
  props: uploadTableProps,
  emits: ['download', 'del', 'uploadResult'],
  setup: function setup(props, _ref2) {
    var slots = _ref2.slots,
        emit = _ref2.emit;

    var download = function download() {
      emit('download');
    };

    var del = function del() {
      emit('del');
    };

    var funs = {
      download: download,
      del: del
    };

    var fileChange = function fileChange(_ref3) {
      var file = _ref3.file,
          fileList = _ref3.fileList,
          event = _ref3.event;
      fileList.find(function (item) {
        return item.uid === file.uid;
      }).event = event;
      local.fileList = fileList;
    };

    var local = (0, _vue.reactive)({
      uploadedList: props.uploadedList,
      fileList: []
    });
    (0, _vue.watch)(function () {
      return local.fileList;
    }, function (n) {
      var success = true;

      var _n = n.map(function (item) {
        if (item.status === 'uploading') {
          success = false;
        }

        return {
          fileName: item.name,
          fileSize: item.size,
          percent: Number(item.percent.toFixed(0)),
          status: item.status === 'uploading' ? 'normal' : item.status === 'done' ? 'success' : "exception"
        };
      });

      if (success) {
        emit('uploadResult', n);
      }

      local.uploadedList = _n.concat(props.uploadedList);
    }, {
      deep: true
    });

    var renderTable = function renderTable() {
      return (0, _vue.createVNode)(_Table["default"], {
        "class": (0, _getCls["default"])('upload-table'),
        "size": "small",
        "columns": props.columns,
        "customRow": props.customRow,
        "dataSource": local.uploadedList
      }, {
        title: function title(scope) {
          var _slots$title;

          return (0, _vue.createVNode)(_vue.Fragment, null, [(_slots$title = slots.title) === null || _slots$title === void 0 ? void 0 : _slots$title.call(slots, scope)]);
        },
        bodyCell: function bodyCell(scope) {
          scope.funs = funs;

          if (scope.column.key === 'actions') {
            if (slots.actions) {
              var _slots$actions;

              return (0, _vue.createVNode)(_vue.Fragment, null, [(_slots$actions = slots.actions) === null || _slots$actions === void 0 ? void 0 : _slots$actions.call(slots, scope)]);
            } else {
              return (0, _vue.createVNode)(_vue.Fragment, null, [(0, _vue.createVNode)("a", {
                "style": {
                  color: '#1890ff'
                },
                "onClick": funs.download
              }, [(0, _vue.createTextVNode)("\u4E0B\u8F7D")]), (0, _vue.createVNode)(_antDesignVue.Divider, {
                "type": "vertical"
              }, null), (0, _vue.createVNode)("a", {
                "style": {
                  color: '#f5222d'
                },
                "onClick": funs.del
              }, [(0, _vue.createTextVNode)("\u5220\u9664")])]);
            }
          }

          if (scope.column.key === 'progress') {
            if (props.uploadedList.find(function (item) {
              return item.mid === scope.record.mid;
            })) {
              return (0, _vue.createVNode)("div", null, [(0, _vue.createTextVNode)("\u5DF2\u4E0A\u4F20")]);
            } else {
              return (0, _vue.createVNode)(_antDesignVue.Progress, {
                "status": scope.record.status,
                "percent": scope.record.percent
              }, null);
            }
          }
        },
        footer: function footer() {
          return (0, _vue.createVNode)(_antDesignVue.Upload, {
            "file-list": local.fileList,
            "onUpdate:file-list": function onUpdateFileList($event) {
              return local.fileList = $event;
            },
            "beforeUpload": props.beforeUpload,
            "showUploadList": false,
            "name": "file",
            "action": props.action,
            "onChange": fileChange
          }, {
            "default": function _default() {
              return [(0, _vue.createVNode)(_antDesignVue.Button, {
                "style": {
                  width: '100%'
                },
                "type": "dashed"
              }, {
                "default": function _default() {
                  return [(0, _vue.createTextVNode)("\u6DFB\u52A0")];
                }
              })];
            }
          });
        }
      });
    };

    return function () {
      return (0, _vue.createVNode)(_vue.Fragment, null, [renderTable()]);
    };
  }
});

exports["default"] = _default2;