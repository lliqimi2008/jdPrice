/**
 * 公共属性方法集合
 */

// http请求时的loading状态
export const httpLoadingMixins = {
  data () {
    return {
      // 提供http请求时的加载状态回调
      httpLoading: null
    }
  },
  methods: {
    showHttpLoading() {
      this.httpLoading = this.$loading({
        lock: true,
        text: 'Loading',
        spinner: 'el-icon-loading',
        background: 'rgba(0, 0, 0, 0.7)'
      })
    },
    closeHttpLoading() {
      this.httpLoading.close()
    }
  }
}
