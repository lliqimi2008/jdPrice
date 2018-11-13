<template>
  <div class="add-pocket-money display-table">
    <div class="pub-sm-title mar-b-20 clear">
      <h3>创建金豆</h3>
    </div>

    <el-form class="app-dialog-form" :label-position="labelPosition" label-width="120px" :model="formLabelAlign" size="small">
      <el-form-item label="奖品名称">
        <el-input></el-input>
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
      <el-form-item label="奖品金额" v-if="prizeType==='0'">
        <el-input></el-input>
      </el-form-item>
      <el-form-item label="订单比例" v-if="prizeType==='1'">
        <el-input></el-input>
      </el-form-item>
      <el-form-item label="金额上限/下限" v-if="prizeType==='2'">
        <el-input></el-input>
      </el-form-item>
      <div class="probability-group" v-if="prizeType==='3'">
        <el-form-item label="概率1">
          <el-input></el-input>
        </el-form-item>
        <el-form-item label="概率2">
          <el-input></el-input>
        </el-form-item>
      </div>

      <el-form-item label="PIN月限制">
        <el-input></el-input>
      </el-form-item>
      <el-form-item label="预算阈值">
        <el-input></el-input>
      </el-form-item>
      
      <el-form-item size="large">
        <el-button type="primary">保存</el-button>
        <el-button>取消</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  data () {
    return {
      prizeType: '0'
    }
  }
}
</script>

<style lang="scss" scoped>
.add-pocket-money{
  width: 100%;
}
</style>
