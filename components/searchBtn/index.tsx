/*
 * @author: Archy
 * @Date: 2022-01-07 10:56:43
 * @LastEditors: Archy
 * @LastEditTime: 2022-01-07 11:31:06
 * @FilePath: \sgd-pro-components\components\searchBtn\index.tsx
 * @description: 
 */
import { defineComponent, ref, defineProps } from "vue";
import { Button, Col, FormItem, ColProps } from 'ant-design-vue'
import { DownOutlined, UpOutlined } from '@ant-design/icons-vue'
const searchBtnProps = {
  span: { type: [String, Number], default: 8 }
}

export type SearchBtnProps = typeof searchBtnProps
export default defineComponent({
  name: "searchBtn",
  emits: ['search', 'reset', 'update:expand'],
  props: searchBtnProps,
  setup(props, { emit }) {
    const expand = ref(false)
    const search = () => {
      emit('search')
    }

    const reset = () => {
      emit('reset')
    }

    const expandChange = () => {
      expand.value = !expand.value
      emit('update:expand', expand.value)
    }
    return () => {
      return (
        <Col span={props.span}>
          <FormItem>
            <Button type="primary" onClick={search}>查询</Button>
            <Button onClick={reset}>重置</Button>
            <a onClick={expandChange}>
              展开
              {expand.value ? <DownOutlined /> : <UpOutlined />}
            </a>
          </FormItem>
        </Col>
      )
    };
  },
});

