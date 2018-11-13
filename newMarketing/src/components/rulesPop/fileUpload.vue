<template>
  <div class="">
    <el-upload
      class="uploadBox"
      :action="uploadUrl"
      multiple
      :limit="1"
      :before-upload="beforeUpload"
      :on-success="uploadSuccess"
      :on-remove="fileRemove"
      :with-credentials="true">
      <el-button size="small" type="primary">点击上传</el-button>
      <div slot="tip" class="el-upload__tip">sku值过多时，以文件上传，支持xlsx、txt文档，且不超过10MB</div>
    </el-upload>
  </div>
</template>

<script>
import {
  BASE_URL
} from 'api/index'
export default {
  name: '',
  components: {},
  data() {
    return {
      uploadUrl: ''
    }
  },
  created() {},
  activated() {
    this.uploadUrl = 'http:' + BASE_URL + '/rest/rule/getFileContent'
  },
  methods: {
    beforeUpload(file) {
      var testmsg = file.name.substring(file.name.lastIndexOf('.') + 1)
      const extension = testmsg === 'txt'
      const extension2 = testmsg === 'xlsx'
      const isLt2M = file.size / 1024 / 1024 < 10
      if (!extension && !extension2) {
        this.$message({
          message: '上传文件只能是 txt、xlsx格式!',
          type: 'warning'
        })
      }
      if (!isLt2M) {
        this.$message({
          message: '上传文件大小不能超过 10MB!',
          type: 'warning'
        })
      }
      return extension || (extension2 && isLt2M)
    },
    uploadSuccess(res, file, fileList) {
      this.$message('资料上传成功!')
      this.$emit('success', res.data)
    },
    fileRemove(file, fileList) {
      console.log(file)
      this.$message('您已清空上传资料!')
      this.$emit('remove')
    }
  }
}
</script>

<style lang='scss' scoped>
</style>
