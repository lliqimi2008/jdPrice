<template>
  <div class="add-pocket-money display-table">
    <div class="pub-sm-title mar-b-20 clear">
      <h3>创建东券</h3>
    </div>

    <el-form class="app-dialog-form" label-position="right" label-width="120px" size="small">
      <el-form-item label="奖品名称">
        <el-input placeholder="必填，限制20个字符"></el-input>
      </el-form-item>
      <el-form-item label="奖品数量">
        <el-input></el-input>
      </el-form-item>
      <el-form-item label="token">
        <el-input></el-input>
      </el-form-item>
      <el-form-item label="ID">
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
    return {}
  }
}
</script>

<style lang="scss" scoped>
.add-pocket-money{
  width: 100%;
}
</style>
