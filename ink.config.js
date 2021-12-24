/*
 * @author: Archy
 * @Date: 2021-12-24 15:09:26
 * @LastEditors: Archy
 * @LastEditTime: 2021-12-24 15:09:27
 * @FilePath: \sgd-pro-components\ink.config.js
 * @description:
 */
module.exports = {
  compileConfig: {
    babelConfig: {
      plugins: ["@vue/babel-plugin-jsx"],
    },
  },
  include: ["components"],
  target: ["commonjs", "esmodule", "umd"],
};
