/*
 * @Author: Sgdchy
 * @Date: 2021-08-10 14:29:49
 * @LastEditors: Archy
 * @LastEditTime: 2022-01-13 10:11:14
 * @FilePath: \sgd-pro-components\components\imageThumb\imageThumb.tsx
 * @description:
 */
import Image, { imageProps } from 'ant-design-vue/es/image'
import { defineComponent, ref, reactive, watch } from 'vue'

import getCls from '../shared/util/getCls'

import './style/index.less'

const imageThumbProps = Object.assign({}, imageProps, {
  thumb: { type: Boolean, default: false },
  thumbSrc: { type: String, default: false },
})

export type ImageThumbProps = typeof imageThumbProps

export default defineComponent({
  name: 'ImageThumb',
  props: imageThumbProps,
  setup(props, { attrs, slots }) {
    let thumbImg = ref(null) as any
    let thumbShow = ref(false)
    const thumbStyle = reactive({
      left: '0px',
      top: '0px',
    })
    const mouseenter = () => {
      thumbShow.value = true
    }

    const mousemove = (e: any) => {
      thumbStyle.left = e.x + 'px'
      thumbStyle.top = e.y + 'px'
      const clientHeight = document.documentElement.clientHeight
      const clientWidth = document.documentElement.clientWidth
      // 确保缩略图始终在视窗
      if (thumbImg.value && thumbImg.value.offsetHeight + e.y > clientHeight) {
        thumbStyle.top = clientHeight - thumbImg.value.offsetHeight + 'px'
      }
      if (thumbImg.value && thumbImg.value.offsetWidth + e.x > clientWidth) {
        thumbStyle.left = clientWidth - thumbImg.value.offsetWidth + 'px'
      }
    }

    const mouseleave = () => {
      thumbShow.value = false
    }

    watch(
      () => thumbImg.value,
      (n) => {
        if (n) {
          // 缩略图超过视窗时，调整到视窗大小
          const clientHeight = document.documentElement.clientHeight
          if (thumbImg.value.offsetHeight > clientHeight) {
            const zoom = clientHeight / thumbImg.value.offsetHeight
            thumbImg.value.height *= zoom
            thumbImg.value.width *= zoom
          }
        }
      }
    )
    return () => {
      const image = (
        <div
          style={{ display: 'inline' }}
          onMouseenter={mouseenter}
          onMouseleave={mouseleave}
          onMousemove={mousemove}>
          <Image {...{ ...attrs, ...props }} v-slots={slots}></Image>
        </div>
      )
      return (
        <>
          {image}
          {props.thumb ? (
            thumbShow.value ? (
              <div class={getCls('image-thumb')} style={thumbStyle}>
                <img
                  ref={thumbImg}
                  src={props.thumbSrc ? props.thumbSrc : props.src}
                  width={200}></img>
              </div>
            ) : null
          ) : null}
        </>
      )
    }
  },
})
