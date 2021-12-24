"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _vue = require("vue");

/*
* @author: Archy
* @Date: 2021-12-23 13:46:38
 * @LastEditors: Archy
 * @LastEditTime: 2021-12-24 14:16:53
 * @FilePath: \sgd-pro-components\components\shared\util\insertRefInstance.ts
* @description: 
*/
var _default = function _default(name, attr) {
  console.log((0, _vue.getCurrentInstance)());
  var ctx = (0, _vue.getCurrentInstance)().ctx;
  ctx[name] = attr;
};

exports["default"] = _default;