<template>
  <div class="add-pocket-money display-table">
    <div class="pub-sm-title mar-b-20 clear">
      <h3>创建外部奖品</h3>
    </div>
    <el-col :span="15">
      <el-form class="app-dialog-form" label-width="120px" size="small">
        <el-form-item label="奖品名称">
          <el-input placeholder="必填，奖品名称将用于收银台展示，请谨慎填写"></el-input>
          <!-- <div class="input-hint-text"></div> -->
        </el-form-item>
        <el-form-item label="奖品面额">
          <el-input placeholder="必填，奖品面值，最多精确到小数点后两位"></el-input>
          <!-- <div class="input-hint-text"></div> -->
        </el-form-item>
        <el-form-item label="奖品描述">
          <el-input placeholder="必填，奖品描述"></el-input>
          <!-- <div class="input-hint-text"></div> -->
        </el-form-item>
        <el-form-item size="large">
          <el-button type="primary">保存</el-button>
          <el-button>取消</el-button>
        </el-form-item>
      </el-form>

      <div class="table-content">
        <div class="pv data-list">
          <span class="el-icon-circle-plus cur pa fr" @click="centerDialogVisible = true"></span>
          <el-table
            ref="multipleTable"
            :data="tableData"
            stripe
            border
            tooltip-effect="dark"
            style="width: 100%"
            @selection-change="handleSelectionChange">
            <el-table-column
              label="序号"
              width="60px">
              <template slot-scope="scope">{{ scope.row.date }}</template>
            </el-table-column>
            <el-table-column
              prop="counts"
              label="奖品数量">
            </el-table-column>
            <el-table-column
              prop="type"
              label="类别">
            </el-table-column>
            <el-table-column
              prop="date"
              label="操作时间"
              width="160px">
              <template slot-scope="scope">2017-06-11 17:51:53</template>
            </el-table-column>
            <el-table-column
              prop="uPerson"
              label="操作人">
            </el-table-column>
            <el-table-column
              prop="process"
              label="流程">
            </el-table-column>
            <el-table-column
              prop="status"
              label="操作"
              width="60px">
              <template slot-scope="scope">
                <span class="red">查看</span>
              </template>
            </el-table-column>
          </el-table>
        </div>
      </div>
    </el-col>

    <!-- 弹窗 -->
    <el-dialog class="app-dialog-nomargin"
      :visible.sync="centerDialogVisible"
      width="30%"
      :closeOnClickModal="false"
      left>

      <div class="step-item">
        <el-form class="app-dialog-form clear" label-width="100px" size="small">
          <el-col :span="20">
            <el-form-item label="选择文件">
              <el-input></el-input>
              <div class="input-hint-text text-left">每次导入请不超过50000个券码</div>
            </el-form-item>
          </el-col>
          <el-col :span="3" class="text-center">
            <el-button type="text" size="mini">选择</el-button>
          </el-col>
        </el-form>
      </div>

      <div class="step-item import-ing">
        <span class="el-icon-loading"></span> 券码导入中，请不要重复操作...
      </div>

      <div class="step-item success">
        <span class="el-icon-success"></span> 导入成功！
      </div>
      <div class="step-item success">
        <span class="el-icon-error"></span> 导入失败，请重新导入
      </div>

      <div slot="footer" class="dialog-footer text-center">
        <!-- <el-button @click="centerDialogVisible = false">取 消</el-button> -->
        <el-button type="primary" @click="centerDialogVisible = false">导 入</el-button>
      </div>
    </el-dialog>

  </div>
</template>

<script>
export default {
  data () {
    return {
      centerDialogVisible: false,
      tableData: [
        {
          date: '1001',
          prizeName: '满1000减100元优惠券',
          amount: '￥100.00',
          counts: 12000,
          type: '满减券',
          cPerson: 'Joh',
          createDate: '2017-06-01 17:51:53',
          uPerson: 'Joh',
          rules: '规则',
          process: '编辑中',
          status: '启用'
        },
        {
          date: '1001',
          prizeName: '满1000减100元优惠券',
          amount: '￥100.00',
          counts: 12000,
          type: '满减券',
          cPerson: 'Joh',
          createDate: '2017-06-01 17:51:53',
          uPerson: 'Joh',
          rules: '规则',
          process: '编辑中',
          status: '停用'
        }
      ]
    }
  },
  methods: {
    handleSelectionChange(val) {
      this.multipleSelection = val
    }
  }
}
</script>

<style lang="scss">
.app-dialog-nomargin{
  .el-dialog__footer{
    padding-top: 0;
  }
  .el-dialog__body{
    padding: 0 20px;
  }
  .el-dialog__headerbtn{
    top:0;
    right:5px;
    font-size: 28px;
  }
}
.add-pocket-money{
  width: 100%;
}
.data-list{
  padding-left: 120px;
  .el-icon-circle-plus{
    z-index: 1;
    right: -30px;
    top: 5px;
    font-size: 24px;
    &:hover{
      color: #409EFF;
    }
  }
}
.step-item{
  padding: 10px 0;
  text-align: center;
  color: #409EFF;
}
</style>
