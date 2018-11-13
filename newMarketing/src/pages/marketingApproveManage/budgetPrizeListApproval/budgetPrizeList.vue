<template>
  <div class="budget-prize-list">

    
    <div class="budget-prize-content" v-if="budgetInfoData.budgetInfoData.length" v-for="(item, index) in budgetInfoData.budgetInfoData" :key="index">
      <div class="counts-list bg-pad-border">
        <el-row>
          <el-col :span="12"><div class="grid-content bg-purple"><strong>预算编码：</strong><span class="red">{{item.budgetCode}}</span></div></el-col>
          <el-col :span="12"><div class="grid-content bg-purple-light"><strong>预算阈值：</strong><span>{{item.thresholdAlarm}}</span></div></el-col>
        </el-row>
        <el-row>
          <el-col :span="12"><div class="grid-content bg-purple"><strong>账户主体：</strong><span>{{item.accountSubject}}</span></div></el-col>
          <el-col :span="12"><div class="grid-content bg-purple-light"><strong>预算花费：</strong><span>{{item.usedFee}}元</span></div></el-col>
        </el-row>
        <el-row>
          <el-col :span="24"><div class="grid-content bg-purple"><strong>预算总额：</strong><span>{{item.sumFee}}元</span></div></el-col>
        </el-row>
      </div>

      <!-- {{budgetInfoData.tableData[0]}}
      <br><br><br>
      {{budgetInfoData.tableData[1]}} -->

      <!-- <div class="counts-list bg-pad-border text-center" v-if="!budgetInfoData.length">
        暂无预算信息
      </div> -->

      <!-- <budget-prize-table
        :budgetId="item.budgetId"
        :prizeListData="budgetInfoData.tableData[index].list"></budget-prize-table> -->

      <!-- <div class="pub-sm-title">
        <el-row>
          <el-button size="mini">新增</el-button>
          <el-button size="mini">查看库存</el-button>
          <el-button size="mini">删除</el-button>
          <el-button size="mini" @click="dialogTableVisible = true">生成券码</el-button>
          <el-button size="mini">券码下载</el-button>
          <el-button size="mini" @click="open2">启用/停用</el-button>
        </el-row>
      </div> -->

      <!-- 奖品列表 -->
      <!-- <div class="table-content">
        <el-table
          ref="multipleTable"
          :data="budgetInfoData.tableData[index].list"
          stripe
          border
          tooltip-effect="dark"
          style="width: 100%"
          @selection-change="handleSelectionChange">
          <el-table-column
            type="selection"
            width="55">
          </el-table-column>
          <el-table-column
            label="ID"
            width="120">
            <template slot-scope="scope">{{ scope.row.date }}</template>
          </el-table-column>
          <el-table-column
            prop="prizeName"
            label="奖品名称"
            width="120">
          </el-table-column>
          <el-table-column
            prop="amount"
            label="面额"
            show-overflow-tooltip>
          </el-table-column>
          <el-table-column
            prop="counts"
            label="总数量"
            show-overflow-tooltip>
          </el-table-column>
          <el-table-column
            prop="type"
            label="类别"
            show-overflow-tooltip>
          </el-table-column>
          <el-table-column
            prop="cPerson"
            label="创建人"
            show-overflow-tooltip>
          </el-table-column>
          <el-table-column
            prop="createDate"
            label="创建时间"
            show-overflow-tooltip>
          </el-table-column>
          <el-table-column
            prop="uPerson"
            label="修改人"
            show-overflow-tooltip>
          </el-table-column>
          <el-table-column
            prop="rules"
            label="使用规则"
            show-overflow-tooltip>
            <template slot-scope="scope">
              <el-popover
                placement="left-end"
                title="标题"
                width="200"
                trigger="hover"
                content="这是一段内容,这是一段内容,这是一段内容,这是一段内容。">
                <span class="red" slot="reference">规则</span>
              </el-popover>
            </template>
          </el-table-column>
          <el-table-column
            prop="process"
            label="流程"
            show-overflow-tooltip>
          </el-table-column>
          <el-table-column
            prop="status"
            label="状态"
            show-overflow-tooltip>
            <template slot-scope="scope">
              <span class="red">启用</span>
            </template>
          </el-table-column>
        </el-table>
        <div class="pagination">
          <el-pagination
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            :current-page="currentPage"
            :page-sizes="[100, 200, 300, 400]"
            :page-size="100"
            layout="total, sizes, prev, pager, next"
            background
            :total="16000">
          </el-pagination>
        </div>
      </div> -->


    </div>

  </div>
</template>

<script>
import budgetPrizeTable from './budgetPrizeTable'
export default {
  components: {
    budgetPrizeTable
  },
  props: {
    // 预算奖品数据
    budgetInfoData: {
      type: Object,
      default: () => {
        return {}
      }
    },
    // 奖品列表数据
    prizeListData: {
      type: Array,
      default: () => {
        return []
      }
    }
  }
}
</script>

<style>
</style>
