<template>
  <div class="activity-detail">
    <div class="pub-sm-title clear">
      <h3 class="fl">计划部门</h3>
      <el-row class="fr">
        <el-button size="mini" type="primary" @click="createEditPlanDepartment">编辑</el-button>
      </el-row>
    </div>
    <div class="pv bg-pad-border">
      <el-row>
        <el-col :span="8"><strong>一级部门：</strong>{{this.firstLevDptName}}</el-col>
        <el-col :span="8"><strong>二级部门：</strong>{{this.secondLevDptName}}</el-col>
        <el-col :span="8"><strong>负责人：</strong>{{this.director}}</el-col>
      </el-row>
      <el-row>
        <el-col :span="8"><strong>手机：</strong>{{this.mobile}}</el-col>
        <el-col :span="8"><strong>邮箱：</strong>{{this.email}}</el-col>
      </el-row>
    </div>

    <div class="table-content">
      <el-row>
        <el-col :span="12"><strong>计划目标：</strong></el-col>
      </el-row>
      <el-table
        v-loading="marketLoading"
        element-loading-text="拼命加载中"
        :data="planTargetInstance"
        border
        stripe
        style="width: 100%">
        <el-table-column
          fixed
          prop="tgtId"
          label="目标ID"
          width="160px">
        </el-table-column>
        <el-table-column
          prop="tgtName"
          label="目标名称">
        </el-table-column>
        <el-table-column
          prop="desc"
          label="描述">
        </el-table-column>
      </el-table>
    </div>
    <div class="table-content">
      <el-row>
        <el-col :span="12"><strong>业务标识：</strong></el-col>
      </el-row>
      <el-table
        v-loading="marketLoading"
        element-loading-text="拼命加载中"
        :data="bizIdfInstance"
        border
        stripe
        style="width: 100%">
        <el-table-column
          fixed
          prop="bizIdfId"
          label="业务标识ID"
          width="160px">
        </el-table-column>
        <el-table-column
          prop="bizIdfName"
          label="业务标识">
        </el-table-column>
        <el-table-column
          prop="desc"
          label="描述">
        </el-table-column>
      </el-table>
    </div>
  </div>
</template>

<script>
import { detailPlanDepartment } from 'api/service'
export default {
  name: '',
  components: {},
  props: {
    data: {
      type: Object,
      default: () => {
        return {}
      }
    }
  },
  data() {
    return {
      marketLoading: false,
      firstLevDptName: '',
      secondLevDptName: '',
      director: '',
      mobile: '',
      email: '',
      bizIdfInstance: [],
      planTargetInstance: []

    }
  },
  activated() {
    this.handlePlanDepartmentDetail()
  },
  methods: {
    // 获取计划部门详情
    handlePlanDepartmentDetail() {
      // 点击搜索计划部门
      this.marketLoading = true
      let reqParams = {
        dptId: this.$route.query.dptId
      }
      detailPlanDepartment(reqParams)
        .then(res => {
          this.marketLoading = false
          if (!this.httpThen(this, res)) return
          let data = res.data || []
          this.firstLevDptName = data.planDepartmentDto.firstLevDptName
          this.secondLevDptName = data.planDepartmentDto.secondLevDptName
          this.director = data.planDepartmentDto.director
          this.mobile = data.planDepartmentDto.mobile
          this.email = data.planDepartmentDto.email
          this.bizIdfInstance = data.planDepartmentDto.bizIdf
          this.planTargetInstance = data.planDepartmentDto.planTarget
        })
        .catch(err => {
          this.httpCatch(this, err)
        })
    },
    // 修改计划部门
    createEditPlanDepartment(item) {
      // 跳转新建计划页 有入参即编辑 无入参即新建
      let pathObj = {
        path: '/marketingSystemManage/planDepartmentCreate'
      }
      if (item) {
        pathObj = {
          path: '/marketingSystemManage/planDepartmentModify',
          query: {
            dptId: this.$route.query.dptId
          }
        }
      }
      this.$router.push(pathObj)
    }
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
