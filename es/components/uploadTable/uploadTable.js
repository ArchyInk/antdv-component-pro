import { resolveDirective as _resolveDirective, isVNode as _isVNode, createVNode as _createVNode, createTextVNode as _createTextVNode, Fragment as _Fragment } from "vue";

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

/*
 * @author: Archy
 * @Date: 2021-12-28 10:01:12
 * @LastEditors: Archy
 * @LastEditTime: 2022-01-05 10:21:51
 * @FilePath: \sgd-pro-components\components\uploadTable\uploadTable.tsx
 * @description: 
 */
import { defineComponent, reactive, watch, ref } from 'vue';
import Table from 'ant-design-vue/es/table/Table';
import { Divider, Upload, Button, Progress, Modal, ConfigProvider, Descriptions, DescriptionsItem } from 'ant-design-vue';
import zhCN from 'ant-design-vue/es/locale/zh_CN';
import './style/index.css';
import getCls from '../shared/util/getCls';
import formatFileSize from '../shared/util/formatFileSize';

function _isSlot(s) {
  return typeof s === 'function' || Object.prototype.toString.call(s) === '[object Object]' && !_isVNode(s);
}

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
          return formatFileSize(text * 1);
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
  data: {
    type: Object
  },
  showAdd: {
    type: Boolean,
    "default": true
  },
  customRow: {
    type: Function
  }
};
export default defineComponent({
  name: 'UploadTable',
  props: uploadTableProps,
  emits: ['download', 'del', 'uploadResult', 'cancel', 'submit'],
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
      fileList: [],
      file: undefined
    });
    watch(function () {
      return props.uploadedList;
    }, function (n) {
      local.uploadedList = n;
    });
    watch(function () {
      return local.fileList;
    }, function (n) {
      var success = true;
      var fileRes = null;

      var _n = n.map(function (item) {
        if (item.status === 'uploading') {
          success = false;
        }

        if (local.file.uid = item.uid) {
          fileRes = item;
        }

        return {
          fileName: item.name,
          fileSize: item.size,
          percent: Number(item.percent.toFixed(0)),
          status: item.status === 'uploading' ? 'normal' : item.status === 'done' ? 'success' : "exception"
        };
      });

      if (success) {
        emit('uploadResult', {
          fileList: n,
          file: fileRes
        });
      }

      local.uploadedList = _n.concat(props.uploadedList);
    }, {
      deep: true
    });
    var modalVisible = ref(false);
    var beforeUploadResolve = null;
    var beforeUploadReject = null;

    var renderModal = function renderModal() {
      var _slots$extendsModal;

      var _slot;

      var handleCancel = function handleCancel() {
        var _beforeUploadReject;

        modalVisible.value = false;
        emit('cancel');
        (_beforeUploadReject = beforeUploadReject) === null || _beforeUploadReject === void 0 ? void 0 : _beforeUploadReject();
      };

      var handleSubmit = function handleSubmit() {
        var _beforeUploadResolve;

        modalVisible.value = false;
        emit('submit');
        (_beforeUploadResolve = beforeUploadResolve) === null || _beforeUploadResolve === void 0 ? void 0 : _beforeUploadResolve();
      };

      return _createVNode(ConfigProvider, {
        "locale": zhCN
      }, {
        "default": function _default() {
          return [_createVNode(Modal, {
            "visible": modalVisible.value,
            "onUpdate:visible": function onUpdateVisible($event) {
              return modalVisible.value = $event;
            },
            "width": 400,
            "title": "文件信息"
          }, {
            "default": function _default() {
              return [slots.modal ? slots.modal() : _createVNode(_Fragment, null, [_createVNode(Descriptions, {
                "column": 1
              }, {
                "default": function _default() {
                  return [_createVNode(DescriptionsItem, {
                    "label": "文件名称"
                  }, {
                    "default": function _default() {
                      return [local.file.name];
                    }
                  }), _createVNode(DescriptionsItem, {
                    "label": "文件大小"
                  }, _isSlot(_slot = formatFileSize(local.file.size)) ? _slot : {
                    "default": function _default() {
                      return [_slot];
                    }
                  }), _createVNode(DescriptionsItem, {
                    "label": "文件类型"
                  }, {
                    "default": function _default() {
                      return [local.file.type];
                    }
                  })];
                }
              }), (_slots$extendsModal = slots.extendsModal) === null || _slots$extendsModal === void 0 ? void 0 : _slots$extendsModal.call(slots)])];
            },
            footer: function footer() {
              return _createVNode(_Fragment, null, [_createVNode(Button, {
                "key": "cancel",
                "onClick": handleCancel
              }, {
                "default": function _default() {
                  return [_createTextVNode("\u8FD4\u56DE")];
                }
              }), _createVNode(Button, {
                "key": "submit",
                "type": "primary",
                "onClick": handleSubmit
              }, {
                "default": function _default() {
                  return [_createTextVNode("\u4E0A\u4F20")];
                }
              })]);
            }
          })];
        }
      });
    };

    var beforeUpload = /*#__PURE__*/function () {
      var _ref4 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(file) {
        var p;
        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                local.file = file;
                modalVisible.value = true;
                _context.next = 4;
                return new Promise(function (resolve, reject) {
                  beforeUploadResolve = resolve;
                  beforeUploadReject = reject;
                });

              case 4:
                p = _context.sent;
                return _context.abrupt("return", p);

              case 6:
              case "end":
                return _context.stop();
            }
          }
        }, _callee);
      }));

      return function beforeUpload(_x) {
        return _ref4.apply(this, arguments);
      };
    }();

    var renderTable = function renderTable() {
      return _createVNode(Table, {
        "class": getCls('upload-table'),
        "size": "small",
        "columns": props.columns,
        "customRow": props.customRow,
        "dataSource": local.uploadedList
      }, {
        title: slots.title ? function (scope) {
          var _slots$title;

          return _createVNode(_Fragment, null, [(_slots$title = slots.title) === null || _slots$title === void 0 ? void 0 : _slots$title.call(slots, scope)]);
        } : undefined,
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
          return _createVNode(_Fragment, null, [props.showAdd ? _createVNode(Upload, {
            "file-list": local.fileList,
            "onUpdate:file-list": function onUpdateFileList($event) {
              return local.fileList = $event;
            },
            "data": props.data,
            "beforeUpload": beforeUpload,
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
          }) : null]);
        }
      });
    };

    return function () {
      return _createVNode(_Fragment, null, [renderTable(), renderModal()]);
    };
  }
});