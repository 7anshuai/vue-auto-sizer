import { renderToString } from '@vue/server-test-utils'
import AutoSizer from '@/components/AutoSizer.vue'

describe('AutoSizer.vue', () => {
  it('should render content with default widths and heights initially', async () => {
    const rendered = await renderToString(AutoSizer, {
      propsData: { defaultHeight: 200, defaultWidth: 200 },
      scopedSlots: {
        default: `<template v-slot="scope">
          <div :style="{ height: scope.size.height + 'px' }" />
        </template>`
      }
    })
    expect(rendered).toContain('height:200px')
  })
})
