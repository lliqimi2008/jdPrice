<template>
  <div class="no-coupon-detail display-table">
    <div class="pub-sm-title clear">
      <h3 class="fl">外部调用发奖活动详情</h3>
      <el-row class="fr">
        <el-button size="mini" type="primary">活动数据</el-button>
        <el-button size="mini" type="primary">编辑</el-button>
        <el-button size="mini" type="primary">发起审核</el-button>
        <el-button size="mini" type="primary">测试</el-button>
        <el-button size="mini" type="primary">测试通过</el-button>
        <el-button size="mini" type="primary">暂停</el-button>
        <el-button size="mini" type="primary">上线</el-button>
      </el-row>
    </div>
    <div class="detail-head">
      <el-row>
        <el-col :span="12"><div class="grid-content bg-purple">活动id：23085686079</div></el-col>
        <el-col :span="9"><div class="grid-content bg-purple-light">调用渠道：TTT</div></el-col>
        <el-col :span="3"><div class="grid-content bg-purple-light"><strong>当前状态:</strong><span class="red">已审核</span></div></el-col>
      </el-row>
      <el-row>
        <el-col :span="12"><div class="grid-content bg-purple">活动名称：京东支付新用户发奖</div></el-col>
        <el-col :span="10"><div class="grid-content bg-purple-light">活动优先级：5</div></el-col>
      </el-row>
      <el-row>
        <el-col :span="12"><div class="grid-content bg-purple">业务标识：京东支付-商城</div></el-col>
        <el-col :span="10"><div class="grid-content bg-purple-light">退款是否恢复：是</div></el-col>
      </el-row>
      <el-row>
        <el-col :span="12"><div class="grid-content bg-purple">活动时间：2018-05-08 00:00:00——2018-05-08 23:59:59</div></el-col>
        <el-col :span="10"><div class="grid-content bg-purple-light">活动说明：针对京东支付新用户的ABtest立减活动</div></el-col>
      </el-row>
    </div>
    
    <prize-info-detail></prize-info-detail>

  </div>
</template>

<script>
import prizeInfoDetail from 'components/prizeInfo/prizeInfoDetail'
export default {
  components: {
    prizeInfoDetail
  },
  data () {
    return {
      rulesGroupData1: [
        {
          name: '立减5元',
          calculateType: '计算类型',
          calculateValue: '计算值',
          extensionValue: '扩展值',
          priority: '优先级',
          errText: '错误文案',
          operation: '操作'
        }
      ],
      tableData3: [
        {
          date: '1001',
          activityName: '京东支付新人立减',
          business: '京东支付-商城',
          type: '无券活动',
          createDate: '2017-06-01 17:51:53',
          cPerson: 'Joh',
          status: '编辑中',
          operation: '操作'
        }
      ]
    }
  },
  methods: {
    handleSelectionChange (val) {
      this.multipleSelection = val
    }
  }
}
</script>

<style lang="scss">
.no-coupon-detail{
  width: 100%;
  .el-row {
    line-height: 30px;
  }
}
.detail-head{
  padding: 15px;
  border-radius: 5px;
  margin-bottom: 15px;
  background: #eee;
}
</style>
