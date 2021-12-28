"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _prefix = require("../shared/constant/prefix");

var _uploadTable = _interopRequireDefault(require("./uploadTable"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

/*
 * @author: Archy
 * @Date: 2021-12-28 10:01:04
 * @LastEditors: Archy
 * @LastEditTime: 2021-12-28 10:04:35
 * @FilePath: \sgd-pro-components\components\uploadTable\index.tsx
 * @description: 
 */
_uploadTable["default"].install = function (app) {
  app.component(_prefix.COMPONENT_PREFIX + _uploadTable["default"].name, _uploadTable["default"]);
  return app;
};

var _default = _uploadTable["default"];
exports["default"] = _default;