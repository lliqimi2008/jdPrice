<template>
  <div class="activity-detail">
    <el-row>
      <el-col :span="8">
        <el-form-item label="模板：" prop="model">
          <el-select class="select100" v-model="model" placeholder="请选择">
            <el-option v-for="(item, index) in models" :key="index" :label="item.label" :value="item.value" ></el-option>
          </el-select>
        </el-form-item>
      </el-col>
    </el-row>
    <el-form :model="tplForm" ref="linkPrizeActivity" label-width="180px" size="small" class="app-form-panel" :rules="tplFormRules">
      <el-row>
        <el-col :span="8">
          <el-form-item label="页面标题：" prop="pageTitle">
            <el-input v-model="tplForm.pageTitle"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="成功页背景图链接：" prop="sucBackImgUrl">
            <el-input v-model="tplForm.sucBackImgUrl"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="8">
          <el-form-item label="成功页按钮描述：" prop="sucButDesc">
            <el-input v-model="tplForm.sucButDesc"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="成功页按钮链接：" prop="sucButUrl">
            <el-input v-model="tplForm.sucButUrl"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="8">
          <el-form-item label="引导页背景图链接：" prop="guideBackImgUrl">
            <el-input v-model="tplForm.guideBackImgUrl"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="引导页按钮描述：" prop="guideButDesc">
            <el-input v-model="tplForm.guideButDesc"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="16">
          <el-form-item label="引导页按钮链接：" prop="guideButUrl">
            <el-input v-model="tplForm.guideButUrl"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="8">
          <el-form-item label="失败页背景图链接：" prop="failBackImgUrl">
            <el-input v-model="tplForm.failBackImgUrl"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="失败页按钮描述：" prop="failButDesc">
            <el-input v-model="tplForm.failButDesc"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="8">
          <el-form-item label="失败页按钮链接：" prop="failButUrl">
            <el-input v-model="tplForm.failButUrl"></el-input>
          </el-form-item>
        </el-col>
        <!--<el-col :span="8">
          <el-form-item label="微信分享链接：" prop="wechatShareUrl">
            <el-input v-model="tplForm.wechatShareUrl"></el-input>
          </el-form-item>
        </el-col>-->
        <el-col :span="8">
          <el-form-item label="成功页文字提示：" prop="sucTextDesc">
            <el-input v-model="tplForm.sucTextDesc"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <!--<el-row>
        <el-col :span="8">
          <el-form-item label="微信分享小图链接：" prop="wechatMiniImgUrl">
            <el-input v-model="tplForm.wechatMiniImgUrl"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="微信分享文案：" prop="wechatShareCopywriter">
            <el-input v-model="tplForm.wechatShareCopywriter"></el-input>
          </el-form-item>
        </el-col>
      </el-row>-->
      <el-row>
        <el-col :span="8">
          <el-form-item label="成功页文字提示链接：" prop="sucTextDescUrl">
            <el-input v-model="tplForm.sucTextDescUrl"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="16">
          <el-form-item label="活动规则：" prop="activityRules">
            <el-input type="textarea" v-model="tplForm.activityRules"></el-input>
            <div style="color: #999;" class="input-hint-text text-left">需将规则文档转换成可应用格式，转换工具地址:<a href="https://qianbao.jd.com/p/page/rule.htm" target="_blank" style="color: #333; font-size: 12px; text-decoration: underline;">https://qianbao.jd.com/p/page/rule.htm
</a></div>
          </el-form-item>
        </el-col>
      </el-row>
      <el-button type="primary" size="small"  @click="handleSave('linkPrizeActivity')" style="display: block; margin: 0 0 0 500px">保存配置</el-button>
    </el-form>
  </div>
</template>

<script>
export default {
  name: '',
  components: {},
  props: {
    activityExts: Array
  },
  data: function () {
    return {
      model: 0,
      models: [
        {
          label: '默认',
          value: 0
        },
        {
          label: '自定义',
          value: 1
        }
      ],

      tplForm: {
        pageTitle: '京东支付券   任性抢',
        sucBackImgUrl: 'https://img10.360buyimg.com/cms/jfs/t19828/330/1010756973/128526/ac2c810/5b111fb5Ne5fd1c20.jpg',
        sucButDesc: '立即使用',
        sucButUrl: 'http://sucess.com',
        sucTextDesc: '',
        sucTextDescUrl: '',
        guideBackImgUrl: 'http://img30.360buyimg.com/jr_image/jfs/t1/7937/31/1613/611497/5bcef84dE8599661a/a391bb4b0579b216.png',
        guideButDesc: '查看其它优惠',
        guideButUrl: 'http://12345.com',
        failBackImgUrl: 'https://img13.360buyimg.com/cms/jfs/t21916/331/567452845/132439/227f070d/5b111fb5N56e1aff6.jpg',
        failButDesc: '立即去绑卡',
        failButUrl: 'http://error.com',
        wechatShareUrl: '',
        wechatMiniImgUrl: '',
        wechatShareCopywriter: '',
        activityRules: ''
      },
      tplForm2: {
        pageTitle: '',
        sucBackImgUrl: '',
        sucButDesc: '',
        sucButUrl: '',
        sucTextDesc: '',
        sucTextDescUrl: '',
        guideBackImgUrl: '',
        guideButDesc: '',
        guideButUrl: '',
        failBackImgUrl: '',
        failButDesc: '',
        failButUrl: '',
        wechatShareUrl: '',
        wechatMiniImgUrl: '',
        wechatShareCopywriter: '',
        activityRules: ''
      },
      tplForm3: {
        pageTitle: '京东支付券   任性抢',
        sucBackImgUrl: 'https://img10.360buyimg.com/cms/jfs/t19828/330/1010756973/128526/ac2c810/5b111fb5Ne5fd1c20.jpg',
        sucButDesc: '立即使用',
        sucButUrl: 'http://sucess.com',
        sucTextDesc: '',
        sucTextDescUrl: '',
        guideBackImgUrl: 'http://img30.360buyimg.com/jr_image/jfs/t1/7937/31/1613/611497/5bcef84dE8599661a/a391bb4b0579b216.png',
        guideButDesc: '查看其它优惠',
        guideButUrl: 'http://12345.com',
        failBackImgUrl: 'https://img13.360buyimg.com/cms/jfs/t21916/331/567452845/132439/227f070d/5b111fb5N56e1aff6.jpg',
        failButDesc: '立即去绑卡',
        failButUrl: 'http://error.com',
        wechatShareUrl: '',
        wechatMiniImgUrl: '',
        wechatShareCopywriter: '',
        activityRules: ''
      },
      tplFormRules: {
        pageTitle: [
          { required: true, message: '字段不能为空', trigger: 'blur' }
        ],
        sucBackImgUrl: [
          { required: true, message: '字段不能为空', trigger: 'blur' }
        ],
        sucButDesc: [
          { required: true, message: '字段不能为空', trigger: 'blur' }
        ],
        sucButUrl: [
          { required: true, message: '字段不能为空', trigger: 'blur' }
        ],
        guideBackImgUrl: [
          { required: true, message: '字段不能为空', trigger: 'blur' }
        ],
        guideButDesc: [
          { required: true, message: '字段不能为空', trigger: 'blur' }
        ],
        guideButUrl: [
          { required: true, message: '字段不能为空', trigger: 'blur' }
        ],
        failBackImgUrl: [
          { required: true, message: '字段不能为空', trigger: 'blur' }
        ],
        failButDesc: [
          { required: true, message: '字段不能为空', trigger: 'blur' }
        ],
        failButUrl: [
          { required: true, message: '字段不能为空', trigger: 'blur' }
        ]
      }
    }
  },
  watch: {
    model: function (newV, oldV) {
      if (newV === 1) {
        this.tplForm = this.tplForm2
      } else if (newV === 0) {
        this.tplForm = this.tplForm3
      }
    },
    activityExts: function (v) {
      if (v && v.length > 0) {
        this.tplForm = this.tplForm2
        v.forEach((obj) => {
          if (obj.extField === 'TP_APP_TEMP_TITLE') {
            this.tplForm.pageTitle = obj.extValue
          }
          if (obj.extField === 'TP_APP_SUC_PAGE_BG_IMG_LINK') {
            this.tplForm.sucBackImgUrl = obj.extValue
          }
          if (obj.extField === 'TP_APP_SUC_PAGE_BTN_DESC') {
            this.tplForm.sucButDesc = obj.extValue
          }
          if (obj.extField === 'TP_APP_SUC_PAGE_BTN_REDIRECT_LINK') {
            this.tplForm.sucButUrl = obj.extValue
          }
          if (obj.extField === 'BK_APP_BG_IMG_LINK') {
            this.tplForm.guideBackImgUrl = obj.extValue
          }
          if (obj.extField === 'BK_APP_BTN_DESC') {
            this.tplForm.guideButDesc = obj.extValue
          }
          if (obj.extField === 'BK_APP_BTN_LINK') {
            this.tplForm.guideButUrl = obj.extValue
          }
          if (obj.extField === 'TP_APP_ERR_PAGE_BG_IMG_LINK') {
            this.tplForm.failBackImgUrl = obj.extValue
          }
          if (obj.extField === 'TP_APP_ERR_PAGE_BTN_DESC') {
            this.tplForm.failButDesc = obj.extValue
          }
          if (obj.extField === 'TP_APP_ERR_PAGE_BTN_REDIRECT_LINK') {
            this.tplForm.failButUrl = obj.extValue
          }
          if (obj.extField === 'TP_WECHAT_LINK') {
            this.tplForm.wechatShareUrl = obj.extValue
          }
          if (obj.extField === 'TP_WECHAT_THUMB_LINK') {
            this.tplForm.wechatMiniImgUrl = obj.extValue
          }
          if (obj.extField === 'TP_WECHAT_CONTENT') {
            this.tplForm.wechatShareCopywriter = obj.extValue
          }
          if (obj.extField === 'TP_APP_SUC_PAGE_TEXT') {
            this.tplForm.sucTextDesc = obj.extValue
          }
          if (obj.extField === 'TP_APP_SUC_PAGE_TEXT_LINK') {
            this.tplForm.sucTextDescUrl = obj.extValue
          }
          if (obj.extField === 'TP_APP_RULE_DESC') {
            this.tplForm.activityRules = obj.extValue
          }
        })
      }
    }
  },
  methods: {
    activityExtsArray() {
      if (this.activityExts && this.activityExts.length > 0) {
        this.tplForm = this.tplForm2
        this.activityExts.forEach((obj) => {
          if (obj.extField === 'TP_APP_TEMP_TITLE') {
            this.tplForm.pageTitle = obj.extValue
          }
          if (obj.extField === 'TP_APP_SUC_PAGE_BG_IMG_LINK') {
            this.tplForm.sucBackImgUrl = obj.extValue
          }
          if (obj.extField === 'TP_APP_SUC_PAGE_BTN_DESC') {
            this.tplForm.sucButDesc = obj.extValue
          }
          if (obj.extField === 'TP_APP_SUC_PAGE_BTN_REDIRECT_LINK') {
            this.tplForm.sucButUrl = obj.extValue
          }
          if (obj.extField === 'BK_APP_BG_IMG_LINK') {
            this.tplForm.guideBackImgUrl = obj.extValue
          }
          if (obj.extField === 'BK_APP_BTN_DESC') {
            this.tplForm.guideButDesc = obj.extValue
          }
          if (obj.extField === 'BK_APP_BTN_LINK') {
            this.tplForm.guideButUrl = obj.extValue
          }
          if (obj.extField === 'TP_APP_ERR_PAGE_BG_IMG_LINK') {
            this.tplForm.failBackImgUrl = obj.extValue
          }
          if (obj.extField === 'TP_APP_ERR_PAGE_BTN_DESC') {
            this.tplForm.failButDesc = obj.extValue
          }
          if (obj.extField === 'TP_APP_ERR_PAGE_BTN_REDIRECT_LINK') {
            this.tplForm.failButUrl = obj.extValue
          }
          if (obj.extField === 'TP_WECHAT_LINK') {
            this.tplForm.wechatShareUrl = obj.extValue
          }
          if (obj.extField === 'TP_WECHAT_THUMB_LINK') {
            this.tplForm.wechatMiniImgUrl = obj.extValue
          }
          if (obj.extField === 'TP_WECHAT_CONTENT') {
            this.tplForm.wechatShareCopywriter = obj.extValue
          }
          if (obj.extField === 'TP_APP_SUC_PAGE_TEXT') {
            this.tplForm.sucTextDesc = obj.extValue
          }
          if (obj.extField === 'TP_APP_SUC_PAGE_TEXT_LINK') {
            this.tplForm.sucTextDescUrl = obj.extValue
          }
          if (obj.extField === 'TP_APP_RULE_DESC') {
            this.tplForm.activityRules = obj.extValue
          }
        })
      }
    },
    handleArray () {
      let arr = []
      if (this.tplForm.pageTitle) {
        arr.push({
          'extField': 'TP_APP_TEMP_TITLE',
          'extValue': this.tplForm.pageTitle || ''
        })
      }
      if (this.tplForm.sucBackImgUrl) {
        arr.push({
          'extField': 'TP_APP_SUC_PAGE_BG_IMG_LINK',
          'extValue': this.tplForm.sucBackImgUrl || ''
        })
      }
      if (this.tplForm.sucButDesc) {
        arr.push({
          'extField': 'TP_APP_SUC_PAGE_BTN_DESC',
          'extValue': this.tplForm.sucButDesc || ''
        })
      }
      if (this.tplForm.sucButUrl) {
        arr.push({
          'extField': 'TP_APP_SUC_PAGE_BTN_REDIRECT_LINK',
          'extValue': this.tplForm.sucButUrl || ''
        })
      }
      if (this.tplForm.guideBackImgUrl) {
        arr.push({
          'extField': 'BK_APP_BG_IMG_LINK',
          'extValue': this.tplForm.guideBackImgUrl || ''
        })
      }
      if (this.tplForm.guideButDesc) {
        arr.push({
          'extField': 'BK_APP_BTN_DESC',
          'extValue': this.tplForm.guideButDesc || ''
        })
      }
      if (this.tplForm.guideButUrl) {
        arr.push({
          'extField': 'BK_APP_BTN_LINK',
          'extValue': this.tplForm.guideButUrl || ''
        })
      }
      if (this.tplForm.failBackImgUrl) {
        arr.push({
          'extField': 'TP_APP_ERR_PAGE_BG_IMG_LINK',
          'extValue': this.tplForm.failBackImgUrl || ''
        })
      }
      if (this.tplForm.failButDesc) {
        arr.push({
          'extField': 'TP_APP_ERR_PAGE_BTN_DESC',
          'extValue': this.tplForm.failButDesc || ''
        })
      }
      if (this.tplForm.failButUrl) {
        arr.push({
          'extField': 'TP_APP_ERR_PAGE_BTN_REDIRECT_LINK',
          'extValue': this.tplForm.failButUrl || ''
        })
      }
      if (this.tplForm.wechatShareUrl) {
        arr.push({
          'extField': 'TP_WECHAT_LINK',
          'extValue': this.tplForm.wechatShareUrl || ''
        })
      }
      if (this.tplForm.wechatMiniImgUrl) {
        arr.push({
          'extField': 'TP_WECHAT_THUMB_LINK',
          'extValue': this.tplForm.wechatMiniImgUrl || ''
        })
      }
      if (this.tplForm.wechatShareCopywriter) {
        arr.push({
          'extField': 'TP_WECHAT_CONTENT',
          'extValue': this.tplForm.wechatShareCopywriter || ''
        })
      }
      if (this.tplForm.sucTextDesc) {
        arr.push({
          'extField': 'TP_APP_SUC_PAGE_TEXT',
          'extValue': this.tplForm.sucTextDesc || ''
        })
      }
      if (this.tplForm.sucTextDescUrl) {
        arr.push({
          'extField': 'TP_APP_SUC_PAGE_TEXT_LINK',
          'extValue': this.tplForm.sucTextDescUrl || ''
        })
      }
      if (this.tplForm.activityRules) {
        arr.push({
          'extField': 'TP_APP_RULE_DESC',
          'extValue': this.tplForm.activityRules || ''
        })
      }
      return arr
    },
    handleSave (formName) {
      this.$refs[formName] &&
        this.$refs[formName].validate(valid => {
          if (!valid) {
            this.$message({
              message: '您页面配置输入的数据格式有误，请检查',
              type: 'warning'
            })
            return false
          } else {
            let arr = this.handleArray()
            this.$emit('emitTemplateInfo', arr)
            this.$message({
              message: '保存配置成功',
              type: 'success'
            })
          }
        })
    }
  },

  created () {
    this.activityExtsArray()
  }
}
</script>

<style lang='scss'>
.activity-detail {
  width: 100%;
  margin-bottom: 20px;
  .el-row {
    line-height: 30px;
  }
}
.detail-head {
  padding: 15px;
  border-radius: 5px;
  margin-bottom: 15px;
  background: #eee;
}
</style>
