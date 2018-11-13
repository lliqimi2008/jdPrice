<template>
  <!--新增绑券-->
  <section class="all-plan-section">
    <el-tabs style="width:100%">
    <div class="pub-sm-title clear">
      <h3 class="fl" >新增绑券</h3>
    </div>
    <div>
      <el-form ref="form" :model="form" :rules="rules" label-width="100px" class="demo-ruleForm">
        <el-form-item label="奖品ID" prop="prizeId">
          <el-input v-model="form.prizeId" placeholder="请输入奖品ID"></el-input>
        </el-form-item>
        <el-form-item label="活动ID" prop="activityId">
          <el-input v-model="form.activityId" placeholder="请输入活动ID"></el-input>
        </el-form-item>
        <el-form-item label="用户维度" prop="userDimension">
          <el-radio-group v-model="form.userDimension">
            <el-radio label="1">JDPN</el-radio>
            <el-radio label="0">PHONE</el-radio>
          </el-radio-group>
          <p class="p_styles">上传的文件中只能全部是JDPN或者全部是手机号</p>
        </el-form-item>
        <el-form-item label="用户信息" prop="resource"  @change.native="getCurrentRow()" >
          <el-radio v-model="form.resource" label="true">文件上传</el-radio>
          <el-radio v-model="form.resource" label="false">手工输入</el-radio>
        </el-form-item>
        <div v-if="radioShow" style="padding: 0 0 20px 100px;" prop="file">
          <el-upload
          class="upload-demo"
          ref="upload"
          name="file"
          :action="uploadUrl"
          :data="param"
          :limit="1"
          :before-upload="beforeUpload"
          :with-credentials="true"
          :on-progress="progressOn"
          :on-success="sucessRes"
          :on-error="errorRes"
          :auto-upload="false">
            <el-button slot="trigger" size="small" type="primary">选取文件</el-button>
            <div slot="tip" class="el-upload__tip">仅支持xls,xlsx格式的文件，每个账号一行，每次最多支持5000个</div>
          </el-upload>
        </div>
        <el-form-item v-if="!radioShow" label="" prop="textarea">
          <el-input
          type="textarea"
          :rows="3"
          placeholder="数据每行一个，超过100个建议使用文件上传"
          v-model="form.textarea">
          </el-input>
        </el-form-item>
        <el-form-item>
          <el-button v-if="!radioShow" type="primary" @click="onSubmit('form')">提交</el-button>
          <el-button  v-if="radioShow" type="primary" @click="submitUpload('form')">提交</el-button>
          <el-button @click="resetForm('form')">取消</el-button>
        </el-form-item>
      </el-form>
    </div>
    <el-dialog title="导入信息" :visible.sync="dialogTableVisible" width="30%">
      <p>{{dailogImports}}</p>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="dialogTableVisible = false">确定</el-button>
    </div>
    </el-dialog>
  </el-tabs>
  </section>
</template>

<script>
import {
  newBindByText
} from 'api/service'
import {
  BASE_URL
} from 'api/index'
export default {
  data() {
    return {
      dialogTableVisible: false,
      dailogImports: '',
      textarea: '',
      form: {
        prizeId: '', // 奖品ID
        activityId: '', // 活动ID
        userDimension: '', // 用户维度
        resource: 'true', // 用户信息
        textarea: '' // 手动输入信息
      },
      uploadUrl: '',
      param: {}, // 表单要提交的参数
      radioShow: true,
      rules: {
        prizeId: [
          { required: true,
            validator: (rule, value, callback) => {
              if ((/^[+]{0,1}(\d+)$|^[+]{0,1}(\d+\.\d+)$/).test(value) === false || value === '') {
                callback(new Error('请填写正确的ID'))
              } else {
                callback()
              }
            },
            trigger: 'blur'
          }
        ],
        activityId: [
          { required: true, message: '请输入活动ID', trigger: 'blur' }
        ],
        userDimension: [
          { required: true, message: '请选择用户维度', trigger: 'change' }
        ]
      }
    }
  },
  activated() {
    this.uploadUrl = 'http:' + BASE_URL + '/rest/prize/manualCoupon/bindByFile'
    this.form.prizeId = ''
    this.form.activityId = ''
  },
  methods: {
    beforeUpload(file) {
      var testmsg = file.name.substring(file.name.lastIndexOf('.') + 1)
      const extension = testmsg === 'txt'
      const extension2 = testmsg === 'xlsx'
      const extension3 = testmsg === 'xls'
      const isLt2M = file.size / 1024 / 1024 < 10
      if (!extension && !extension2 && !extension3) {
        this.$message({
          message: '上传文件只能是 txt、xls、xlsx格式!',
          type: 'warning'
        })
      }
      if (!isLt2M) {
        this.$message({
          message: '上传文件大小不能超过 10MB!',
          type: 'warning'
        })
      }
      this.dialogTableVisible = true
      return extension || (extension2 && isLt2M)
    },
    progressOn() {
      this.dailogImports = '正在开始绑券'
    },
    sucessRes(response, file) {
      if (response.errorMsg) {
        this.dailogImports = response.errorMsg
      } else {
        this.dailogImports = response.message
      }
      this.$refs.upload.clearFiles()
      this.form.prizeId = ''
      this.form.activityId = ''
      // this.form.userDimension = ''
    },
    errorRes() {
      this.dailogImports = '文件上传失败'
    },
    submitUpload(form) {
      this.$refs[form] &&
        this.$refs[form].validate((valid) => {
          if (!valid) {
            return false
          } else {
            this.param.prizeId = this.form.prizeId
            this.param.activityId = this.form.activityId
            this.param.dimension = this.form.userDimension
            this.$refs.upload.submit()
          }
        })
    },
    getCurrentRow() {
      if (this.form.resource === 'true') {
        this.radioShow = true
      } else {
        this.radioShow = false
      }
    },
    // 点击保存访问方法
    onSubmit(form) {
      this.$refs[form] &&
        this.$refs[form].validate((valid) => {
          if (!valid) {
            return false
          } else {
            let reqParams = {
              prizeId: this.form.prizeId,
              activityId: this.form.activityId,
              dimension: this.form.userDimension,
              text: this.form.textarea
            }
            newBindByText(reqParams)
              .then(res => {
                // if (!this.httpThen(this, res)) return
                if (res.errorMsg) {
                  this.$message({
                    message: res.errorMsg || '未知错误',
                    type: 'warning'
                  })
                } else {
                  this.$message({
                    message: '提交成功',
                    type: 'success'
                  })
                  this.$router.push({
                    path: '/operatingFunction/manualBindTicket'
                  })
                }
              })
              .catch((err) => {
                this.httpCatch(this, err)
              })
          }
        })
    },
    // 点击取消访问方法
    async resetForm(form) {
      this.$confirm('确认取消操作', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(() => {
          this.$router.push({
            path: '/operatingFunction/manualBindTicket'
          })
        })
        .catch(() => {})
    }
  }
}
</script>

<style scoped="scoped">
  .el-select{ display: block;}
  .text_center{ text-align: center;}
  .p_styles{ height: 20px; line-height: 20px; font-size: 14px; padding: 0; margin: 0;}
  .substy{color: #fff; background-color: #409EFF; border-color: #409EFF;font-size: 12px; border-radius: 3px; border: 1px solid #dcdfe6; padding: 7px 15px; cursor: pointer;}
</style>
