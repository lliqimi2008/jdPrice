<template>
  <div class="add-pocket-money display-table">
    <div class="pub-sm-title mar-b-20 clear">
      <h3>创建实物奖</h3>
    </div>

    <el-form class="app-dialog-form" ref="ruleForm" :rules="rules" :model="ruleForm" label-position="right" label-width="120px" size="small">
      <el-form-item label="奖品名称">
        <el-input v-model="ruleForm.name" placeholder="必填，限制20个字符"></el-input>
      </el-form-item>
      <el-form-item label="奖品数量">
        <el-input></el-input>
      </el-form-item>
      <el-form-item label="面额">
        <el-input></el-input>
      </el-form-item>
      <el-form-item label="描述">
        <el-input></el-input>
      </el-form-item>
      
      <el-form-item size="large">
        <el-button type="primary" @click="submitForm('ruleForm')">保存</el-button>
        <el-button>取消</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      ruleForm: {
        name: ''
      },
      rules: {
        name: [
          { required: true, message: '请输入活动名称', trigger: 'blur' },
          { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          alert('submit!')
        } else {
          console.log('error submit!!')
          return false
        }
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
