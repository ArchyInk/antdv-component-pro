"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _prefix = require("../shared/constant/prefix");

var _vueFullscreen = _interopRequireDefault(require("vue-fullscreen"));

var _tablePro = _interopRequireDefault(require("./tablePro"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

/*
 * @Author: Sgdchy
 * @Date: 2021-08-06 18:20:26
 * @LastEditors: Archy
 * @LastEditTime: 2021-12-28 10:02:09
 * @FilePath: \sgd-pro-components\components\tablePro\index.tsx
 * @description: 
 */
_tablePro["default"].install = function (app) {
  app.use(_vueFullscreen["default"]);
  app.component(_prefix.COMPONENT_PREFIX + _tablePro["default"].name, _tablePro["default"]);
  return app;
};

var _default = _tablePro["default"];
exports["default"] = _default;