<template>
  <div class="prize-type-tmpl">
    <el-row class="mar-b-20">
      <el-col :span="2">
        <el-button size="mini" type="primary" @click="addPrizePop" v-hasPermissions="'marketingPlanManage:createAward:addTrophy'">添加奖品</el-button>
      </el-col>
      <el-col :span="9">
        <p class="hint-text" style="line-height: 30px;">仅可关联一个奖品，若需要更换关联奖品，需将原有关联奖品删除</p>
      </el-col>
    </el-row>

    <div class="table-content">
      <el-table
        ref="multipleTable"
        :data="data"
        border
        stripe
        tooltip-effect="dark"
        style="width: 100%">
        <el-table-column
          label="奖品ID"
          width="120">
          <template slot-scope="scope">{{ scope.row.prizeId }}</template>
        </el-table-column>
        <el-table-column
          prop="prizeName"
          label="奖品名称"
          width="120">
        </el-table-column>
        <el-table-column
          prop="amount"
          label="面值"
          show-overflow-tooltip>
        </el-table-column>
        <el-table-column
          label="奖品类型"
          show-overflow-tooltip>
          <template slot-scope="scope">{{scope.row.prizeCategory | prizeType}}</template>
        </el-table-column>
        <el-table-column
          prop="budgetCode"
          label="预算编码"
          show-overflow-tooltip>
        </el-table-column>
        <el-table-column
          label="可用库存"
          show-overflow-tooltip>
          <template slot-scope="scope">
            {{scope.row.total}}
          </template>
        </el-table-column>
        <el-table-column
          label="配置库存"
          show-overflow-tooltip>
          <template slot-scope="scope">
            <el-input size="small" v-model="scope.row.setStock" placeholder="" :ref="'setStock_'+scope.row.prizeId" @blur="showStockBlur(scope.row, $event)"></el-input>
          </template>
        </el-table-column>
        <el-table-column
          label="操作"
          show-overflow-tooltip>
          <template slot-scope="scope">
            <el-button type="text" size="small" @click="deletePrizeItem(scope.row)" v-hasPermissions="'marketingPlanManage:createAward:deleteTroly'">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
  </div>
</template>

<script>
import { deletePrizeConfirm, awardsPublic } from 'common/awards.mixins'
export default {
  name: 'singlePrize',
  mixins: [deletePrizeConfirm, awardsPublic],
  components: {},
  props: {
    data: {
      type: Array,
      default: () => {
        return []
      }
    }
  },
  data () {
    return {}
  },
  created() {},
  methods: {
    addPrizePop() {
      this.$emit('addPrizePop', 'prize')
    }
  }
}
</script>

<style lang='scss'>
</style>
