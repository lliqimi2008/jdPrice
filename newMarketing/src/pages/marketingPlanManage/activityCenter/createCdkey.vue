<template>
  <!-- 新增礼包弹窗 -->
  <el-dialog
    title="生成活动兑换码"
    :visible.sync="isVisibleForCdkey"
    width="30%"
    :before-close="handleClose">

    <el-form :label-position="labelPosition" :rules="createCdkeyRules" ref="createCdkeyForm" label-width="100px" :model="createCdkey">
      <el-form-item label="活动ID：" prop="activityId">
        <el-select v-model="createCdkey.activityId" @change="changeInterVal" placeholder="请选择" class="select100">
          <el-option :label="item.activityId" :value="item.activityId"  v-for="(item, index) in interActivityList" :key="index"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="活动名称：">
        <p>{{createCdkey.activityName}}</p>
      </el-form-item>
      <el-form-item label="生成数量：" prop="sendLimitTotal">
        <el-input max=100 v-model.number="createCdkey.sendLimitTotal"></el-input>
      </el-form-item>

      <el-form-item size="large">
        <el-button :disabled="butDisabled" type="primary" @click="save('createCdkeyForm')">保存</el-button>
        <el-button @click="cancel">取消</el-button>
      </el-form-item>
    </el-form>
  </el-dialog>
</template>

<script>
import {
  queryCdkeyActivity,
  createCdkey
} from 'api/service'

export default {
  // name: 'createCdkey'
  props: ['isVisibleForCdkey'],
  data () {
    var validateTotal = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入生成数量'))
      } else {
        if (value > this.totalLimit) {
          callback(new Error('生成数量不能超过总发放限制'))
        }
      }
      callback()
    }
    return {
      butDisabled: false,
      labelPosition: 'right',
      interActivityList: [],
      createCdkey: {
        activityId: '',
        activityName: '',
        sendLimitTotal: ''
      },
      totalLimit: 0,
      visible: this.isVisibleForCdkey,
      createCdkeyRules: {
        sendLimitTotal: [
          {validator: validateTotal, trigger: ['change', 'blur']},
          {type: 'number', message: '必须为数字'}
        ]
      }
    }
  },
  methods: {
    handleClose(done) {
      this.$emit('cancel')
      // this.$confirm('确认关闭？')
      //   .then(_ => {
      //     this.cancel()
      //   })
      //   .catch(_ => {})
    },
    cancel() {
      this.$emit('cancel')
    },
    // 查询接口奖品数据
    queryCdkeyActivityList() {
      let reqParams = {
        planId: this.$route.query.planId
      }
      queryCdkeyActivity(reqParams)
        .then(res => {
          // this.giftBagLoading = false
          if (!this.httpThen(this, res)) return
          let data = res.data || {}
          this.interActivityList = data || []
          if (this.interActivityList.length > 0) {
            this.createCdkey = JSON.parse(JSON.stringify(data[0]))
            this.totalLimit = this.createCdkey.sendLimitTotal
          }
        })
        .catch(err => {
          this.httpCatch(this, err)
        })
    },
    changeInterVal(val) {
      for (var i = 0; i < this.interActivityList.length; i++) {
        if (this.interActivityList[i].activityId === val) {
          this.createCdkey = JSON.parse(JSON.stringify(this.interActivityList[i]))
          this.totalLimit = this.createCdkey.sendLimitTotal
        }
      }
    },
    save(formName) {
      this.$refs[formName].validate((valid) => {
        console.log(valid)
        if (!valid) {
          console.log('create cdkey error submit!!')
          return false
        }
        this.butDisabled = true
        console.log('创建兑换码...')
        let reqParams = {
          activityId: this.createCdkey.activityId,
          num: this.createCdkey.sendLimitTotal
        }
        createCdkey(reqParams)
          .then(res => {
            setTimeout(() => {
              this.butDisabled = false
            }, 1000)
            if (!this.httpThen(this, res)) return
            this.$message({
              message: '创建成功',
              type: 'success'
            })
            this.$emit('cancel')
          })
          .catch(err => {
            this.httpCatch(this, err)
          })
      })
    }

    // // 创建礼包
    // createGiftBag() {
    //   // 开始创建礼包
    //   let reqParams = {
    //     planId: this.$route.query.planId,
    //     bagName: this.giftBagForm.name,
    //     quantity: this.giftBagForm.number,
    //     prizeIds: this.prizeIds
    //   }
    //   createGiftBag(reqParams)
    //     .then(res => {
    //       if (!this.httpThen(this, res)) return
    //       this.$message({
    //         message: '创建成功',
    //         type: 'success'
    //       })
    //       this.giftBag = false
    //       // 请求礼包数据列表
    //       this.queryGiftBag()
    //       // 请求奖品列表接口
    //       this.$emit('getPrizeList')
    //     })
    //     .catch(err => {
    //       this.httpCatch(this, err)
    //     })
    // },
  },
  watch: {
    isVisibleForCdkey: function (newValue, oldValue) {
      if (newValue === true) {
        this.queryCdkeyActivityList()
      }
    }
  }
}
</script>

<style scoped>

</style>
