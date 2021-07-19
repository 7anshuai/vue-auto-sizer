<template>
  <div ref="autoSizer" :style="{ ...outerStyle }">
    <slot :size="childParams"></slot>
  </div>
</template>

<script>
import createDetectElementResize from '../detectElementResize'
export default {
  name: 'AutoSizer',
  props: {

    /** Default height to use for initial render; useful for SSR */
    defaultHeight: Number,

    /** Default width to use for initial render; useful for SSR */
    defaultWidth: Number,

    /** Disable dynamic :height property */
    disableHeight: {
      type: Boolean,
      default: false
    },

    /** Disable dynamic :width property */
    disableWidth: {
      type: Boolean,
      default: false
    },

    /** Nonce of the inlined stylesheet for Content Security Policy */
    nonce: String,

    /** Callback to be invoked on-resize */
    onResize: {
      type: Function,
      default: () => {}
    }

  },
  data () {
    return {
      height: this.defaultHeight || 0,
      width: this.defaultWidth || 0
    }
  },
  computed: {
    outerStyle: function () {
      const outerStyle = { overflow: 'visible' }
      if (!this.disableHeight) {
        outerStyle.height = 0
      }
      if (!this.disableWidth) {
        outerStyle.width = 0
      }
      return outerStyle
    },
    childParams: function () {
      const childParams = {}
      if (!this.disableHeight) {
        childParams.height = this.height
      }
      if (!this.disableWidth) {
        childParams.width = this.width
      }
      return childParams
    }
  },
  mounted () {
    const autoSizer = this.$refs.autoSizer
    if (autoSizer && autoSizer.parentNode && autoSizer.parentElement.ownerDocument && autoSizer.parentNode.ownerDocument.defaultView && autoSizer.parentNode instanceof autoSizer.parentNode.ownerDocument.defaultView.HTMLElement) {
      this._parentNode = autoSizer.parentNode
      this._window = autoSizer.parentNode.ownerDocument.defaultView
      this._detectElementResize = createDetectElementResize(this.nonce, this._window)
      this._detectElementResize.addResizeListener(this._parentNode, this._onResize)
      this._onResize()
    }
  },
  beforeDestroy () {
    if (this._detectElementResize && this._parentNode) {
      this._detectElementResize.removeResizeListener(
        this._parentNode,
        this._onResize
      )
    }
  },
  methods: {
    _onResize () {
      if (this._parentNode) {
        const height = this._parentNode.offsetHeight || 0
        const width = this._parentNode.offsetWidth || 0

        const win = this._window || window
        const style = win.getComputedStyle(this._parentNode) || {}
        const paddingLeft = parseInt(style.paddingLeft, 10) || 0
        const paddingRight = parseInt(style.paddingRight, 10) || 0
        const paddingTop = parseInt(style.paddingTop, 10) || 0
        const paddingBottom = parseInt(style.paddingBottom, 10) || 0

        const newHeight = height - paddingTop - paddingBottom
        const newWidth = width - paddingLeft - paddingRight

        if (
          (!this._disableHeight && this.height !== newHeight) ||
          (!this._disableWidth && this.width !== newWidth)
        ) {
          this.height = height - paddingTop - paddingBottom
          this.width = width - paddingLeft - paddingRight

          this.onResize({ height, width })
        }
      }
    }
  }
}
</script>
