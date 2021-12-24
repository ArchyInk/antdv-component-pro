"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _prefix = require("../constant/prefix");

/*
 * @author: Archy
 * @Date: 2021-12-22 15:36:03
 * @LastEditors: Archy
 * @LastEditTime: 2021-12-22 15:36:03
 * @FilePath: \sgd-pro-components\components\shared\util\getCls.ts
 * @description: 
 */
var _default = function _default(cls) {
  return _prefix.COMPONENT_PREFIX + '-' + cls;
};

exports["default"] = _default;