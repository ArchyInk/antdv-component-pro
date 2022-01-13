"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _vue = require("vue");

var _Table = _interopRequireDefault(require("ant-design-vue/es/table/Table"));

var _antDesignVue = require("ant-design-vue");

var _zh_CN = _interopRequireDefault(require("ant-design-vue/es/locale/zh_CN"));

require("./style/index.css");

var _getCls = _interopRequireDefault(require("../shared/util/getCls"));

var _formatFileSize = _interopRequireDefault(require("../shared/util/formatFileSize"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

function _isSlot(s) {
  return typeof s === 'function' || Object.prototype.toString.call(s) === '[object Object]' && !(0, _vue.isVNode)(s);
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
        customRender: function customRender(_ref) {
          var record = _ref.record;
          return record.fileOldName ? record.fileOldName : record.fileName;
        }
      }, {
        title: '文件大小',
        dataIndex: 'fileSize',
        customRender: function customRender(_ref2) {
          var text = _ref2.text;
          return (0, _formatFileSize["default"])(text * 1);
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

var _default2 = (0, _vue.defineComponent)({
  name: 'UploadTable',
  props: uploadTableProps,
  emits: ['download', 'del', 'uploadResult', 'cancel', 'submit'],
  setup: function setup(props, _ref3) {
    var slots = _ref3.slots,
        emit = _ref3.emit;

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

    var fileChange = function fileChange(_ref4) {
      var file = _ref4.file,
          fileList = _ref4.fileList,
          event = _ref4.event;
      fileList.find(function (item) {
        return item.uid === file.uid;
      }).event = event;
      local.fileList = fileList;
    };

    var local = (0, _vue.reactive)({
      uploadedList: props.uploadedList,
      fileList: [],
      file: undefined
    });
    (0, _vue.watch)(function () {
      return props.uploadedList;
    }, function (n) {
      local.uploadedList = n;
    });
    (0, _vue.watch)(function () {
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
    var modalVisible = (0, _vue.ref)(false);
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

      return (0, _vue.createVNode)(_antDesignVue.ConfigProvider, {
        "locale": _zh_CN["default"]
      }, {
        "default": function _default() {
          return [(0, _vue.createVNode)(_antDesignVue.Modal, {
            "visible": modalVisible.value,
            "onUpdate:visible": function onUpdateVisible($event) {
              return modalVisible.value = $event;
            },
            "width": 400,
            "title": "文件信息"
          }, {
            "default": function _default() {
              return [slots.modal ? slots.modal() : (0, _vue.createVNode)(_vue.Fragment, null, [(0, _vue.createVNode)(_antDesignVue.Descriptions, {
                "column": 1
              }, {
                "default": function _default() {
                  return [(0, _vue.createVNode)(_antDesignVue.DescriptionsItem, {
                    "label": "文件名称"
                  }, {
                    "default": function _default() {
                      return [local.file.name];
                    }
                  }), (0, _vue.createVNode)(_antDesignVue.DescriptionsItem, {
                    "label": "文件大小"
                  }, _isSlot(_slot = (0, _formatFileSize["default"])(local.file.size)) ? _slot : {
                    "default": function _default() {
                      return [_slot];
                    }
                  }), (0, _vue.createVNode)(_antDesignVue.DescriptionsItem, {
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
              return (0, _vue.createVNode)(_vue.Fragment, null, [(0, _vue.createVNode)(_antDesignVue.Button, {
                "key": "cancel",
                "onClick": handleCancel
              }, {
                "default": function _default() {
                  return [(0, _vue.createTextVNode)("\u8FD4\u56DE")];
                }
              }), (0, _vue.createVNode)(_antDesignVue.Button, {
                "key": "submit",
                "type": "primary",
                "onClick": handleSubmit
              }, {
                "default": function _default() {
                  return [(0, _vue.createTextVNode)("\u4E0A\u4F20")];
                }
              })]);
            }
          })];
        }
      });
    };

    var beforeUpload = /*#__PURE__*/function () {
      var _ref5 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(file) {
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
        return _ref5.apply(this, arguments);
      };
    }();

    var renderTable = function renderTable() {
      return (0, _vue.createVNode)(_Table["default"], {
        "class": (0, _getCls["default"])('upload-table'),
        "size": "small",
        "columns": props.columns,
        "customRow": props.customRow,
        "dataSource": local.uploadedList
      }, {
        title: slots.title ? function (scope) {
          var _slots$title;

          return (0, _vue.createVNode)(_vue.Fragment, null, [(_slots$title = slots.title) === null || _slots$title === void 0 ? void 0 : _slots$title.call(slots, scope)]);
        } : undefined,
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
          return (0, _vue.createVNode)(_vue.Fragment, null, [props.showAdd ? (0, _vue.createVNode)(_antDesignVue.Upload, {
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
          }) : null]);
        }
      });
    };

    return function () {
      return (0, _vue.createVNode)(_vue.Fragment, null, [renderTable(), renderModal()]);
    };
  }
});

exports["default"] = _default2;