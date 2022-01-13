/*
 * @author: Archy
 * @Date: 2022-01-13 10:08:55
 * @LastEditors: Archy
 * @LastEditTime: 2022-01-13 10:12:27
 * @FilePath: \sgd-pro-components\components\imageThumb\index.tsx
 * @description: 
 */
import type { App, Plugin } from 'vue';
import { COMPONENT_PREFIX } from '../shared/constant/prefix';
import ImageThumb from './imageThumb'

export type { ImageThumbProps } from './imageThumb'

ImageThumb.install = function (app: App) {
  app.component(COMPONENT_PREFIX + ImageThumb.name, ImageThumb);
  return app;
};

export default ImageThumb as typeof ImageThumb & Plugin