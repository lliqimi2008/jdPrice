<template>
  <div class="add-pocket-money display-table">
    <div class="pub-sm-title clear">
      <h3>创建小金库红包</h3>
    </div>
    
    <el-form class="app-form-panel app-dialog-form" label-position="right" label-width="120px" size="small">
      <el-form-item label="奖品名称">
        <el-input placeholder="必填，限制20个字符"></el-input>
        <el-tooltip class="hint-tips" effect="dark" content="必填，奖品名称将用于收银台展示，请谨慎填写" placement="top-end">
          <span class="el-icon-warning"></span>
        </el-tooltip>
      </el-form-item>
      <el-form-item label="奖品描述">
        <el-input></el-input>
      </el-form-item>
      <el-form-item label="奖品数量">
        <el-input></el-input>
      </el-form-item>
      <el-form-item label="token">
        <el-input></el-input>
      </el-form-item>

      <el-form-item label="奖品类型">
        <el-select v-model="prizeType" placeholder="固定面额">
          <el-option label="固定面额" value="0"></el-option>
          <el-option label="订单比例" value="1"></el-option>
          <el-option label="随机金额" value="2"></el-option>
          <el-option label="概率" value="3"></el-option>
        </el-select>
      </el-form-item>

      <template v-if="prizeType==='0'">
        <el-form-item label="奖品金额">
          <el-input></el-input>
        </el-form-item>
      </template>

      <template v-if="prizeType==='1'">
        <el-col :span="6">
          <el-form-item label="订单比例">
            <el-input></el-input>
            <span class="tips-text">元</span>
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="金额上限">
            <el-input></el-input>
          </el-form-item>
        </el-col>
      </template>


      <template v-if="prizeType==='2'">
        <el-col :span="6">
          <el-form-item label="金额上限">
            <el-input></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="金额下限">
            <el-input></el-input>
          </el-form-item>
        </el-col>
      </template>

      <template v-if="prizeType==='3'">
        <div class="probability-group">
          <el-form-item label="概率1">
            <el-input></el-input>
          </el-form-item>
          <el-form-item label="概率2">
            <el-input></el-input>
          </el-form-item>
        </div>
      </template>
      
      <div class="clear"></div>
      <el-form-item label="PIN月限制">
        <el-input></el-input>
      </el-form-item>
      <el-form-item label="预算阈值">
        <el-input></el-input>
      </el-form-item>
      
      <el-form-item size="large">
        <el-button type="primary" @click="createPrize">保存</el-button>
        <el-button>取消</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { createNotZbudgetPrize } from 'api/service'
export default {
  data() {
    return {
      prizeType: '0',
      pocketMoney: {
        name: '',
        describe: '',
        number: '',
        token: '',
        prizeType: '',
        prizeMoney: '',
        pin: '',
        threshold: ''
      }
    }
  },
  created() {},
  methods: {
    createPrize() {
      /**
       * 1.验证
       * 2.提交
       */
      this.create()
    },
    create() {
      let reqData = {
        interName: '小金库固定面额',
        total: 1000,
        token: '123456',
        desc: '123456',
        interType: 'XFA',
        amount: 2,
        pinLimit: 1,
        threshold: 100,
        director: 'li',
        tel: '15810298670',
        email: 'jichao6@jd.com',
        operator: 'lichengzhao'
      }
      createNotZbudgetPrize(reqData)
        .then(res => {
          console.log(res)
        })
        .catch(err => {
          this.httpCatch(this, err)
        })
    }
  }
}
</script>

<style lang="scss" scoped>
.add-pocket-money {
  width: 100%;
}
</style>
