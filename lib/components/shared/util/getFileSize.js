"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

/*
 * @author: Archy
 * @Date: 2021-12-28 13:35:22
 * @LastEditors: Archy
 * @LastEditTime: 2021-12-28 13:48:46
 * @FilePath: \sgd-pro-components\components\shared\util\getFileSize.ts
 * @description: 
 */
var _default = function _default(size) {
  return size > 8 ? size > 8 * 1024 ? size > 8 * 1024 * 1024 ? size > 8 * 1024 * 1024 * 1024 ? '文件过大' : (size / (8 * 1024 * 1024)).toFixed(2) + 'MB' : (size / (8 * 1024)).toFixed(2) + 'KB' : (size / 8).toFixed(2) + 'bytes' : size.toFixed(2) + 'b';
};

exports["default"] = _default;