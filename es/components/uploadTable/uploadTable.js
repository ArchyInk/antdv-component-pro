import { resolveDirective as _resolveDirective, createTextVNode as _createTextVNode, createVNode as _createVNode, Fragment as _Fragment } from "vue";

/*
 * @author: Archy
 * @Date: 2021-12-28 10:01:12
 * @LastEditors: Archy
 * @LastEditTime: 2021-12-28 14:21:23
 * @FilePath: \sgd-pro-components\components\uploadTable\uploadTable.tsx
 * @description: 
 */
import { defineComponent, reactive, watch } from 'vue';
import Table from 'ant-design-vue/es/table/Table';
import { Divider, Upload, Button, Progress } from 'ant-design-vue';
import './style/index.css';
import getCls from '../shared/util/getCls';
import getFileSize from '../shared/util/getFileSize';
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
          return getFileSize(text * 1);
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
  }
};
export default defineComponent({
  name: 'UploadTable',
  props: uploadTableProps,
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

    var local = reactive({
      uploadedList: props.uploadedList,
      fileList: []
    });
    watch(function () {
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
          status: item.status === 'uploading' ? 'normal' : item.status === 'success' ? 'success' : "exception"
        };
      });

      if (success) {
        emit('uploadResult', n.filter(function (item) {
          return item.event && item.event.response.success;
        }));
      }

      local.uploadedList = _n.concat(props.uploadedList);
    }, {
      deep: true
    });

    var renderTable = function renderTable() {
      return _createVNode(Table, {
        "class": getCls('upload-table'),
        "size": "small",
        "columns": props.columns,
        "dataSource": local.uploadedList
      }, {
        bodyCell: function bodyCell(scope) {
          scope.funs = funs;

          if (scope.column.key === 'actions') {
            if (slots.actions) {
              var _slots$actions;

              return _createVNode(_Fragment, null, [(_slots$actions = slots.actions) === null || _slots$actions === void 0 ? void 0 : _slots$actions.call(slots, scope)]);
            } else {
              return _createVNode(_Fragment, null, [_createVNode("a", {
                "style": {
                  color: '#1890ff'
                },
                "onClick": funs.download
              }, [_createTextVNode("\u4E0B\u8F7D")]), _createVNode(Divider, {
                "type": "vertical"
              }, null), _createVNode("a", {
                "style": {
                  color: '#f5222d'
                },
                "onClick": funs.del
              }, [_createTextVNode("\u5220\u9664")])]);
            }
          }

          if (scope.column.key === 'progress') {
            if (props.uploadedList.find(function (item) {
              return item.mid === scope.record.mid;
            })) {
              return _createVNode("div", null, [_createTextVNode("\u5DF2\u4E0A\u4F20")]);
            } else {
              return _createVNode(Progress, {
                "status": scope.record.status,
                "percent": scope.record.percent
              }, null);
            }
          }
        },
        footer: function footer() {
          return _createVNode(Upload, {
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
              return [_createVNode(Button, {
                "style": {
                  width: '100%'
                },
                "type": "dashed"
              }, {
                "default": function _default() {
                  return [_createTextVNode("\u6DFB\u52A0")];
                }
              })];
            }
          });
        }
      });
    };

    return function () {
      return _createVNode(_Fragment, null, [renderTable()]);
    };
  }
});