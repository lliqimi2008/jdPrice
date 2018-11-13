<template>
  <div class="prize-type-tmpl">
    <el-row class="mar-b-20">
      <el-col :span="2">
        <el-button size="mini" type="primary" @click="addPrizePop">添加礼包</el-button>
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
          <template slot-scope="scope">{{ scope.row.bagId }}</template>
        </el-table-column>
        <el-table-column
          prop="bagName"
          label="奖品名称"
          width="120">
        </el-table-column>
        <el-table-column
          prop="amount"
          label="面值"
          show-overflow-tooltip>
        </el-table-column>
        <el-table-column
          label="可用库存"
          show-overflow-tooltip>
          <template slot-scope="scope">
            {{scope.row.quantity}}
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
            <el-button type="text" size="small" @click="deletePrizeItem(scope.row)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
  </div>
</template>

<script>
import { deletePrizeConfirm, awardsPublic } from 'common/awards.mixins'
export default {
  name: 'luckDrawGift',
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
      this.$emit('addPrizePop', 'gift')
    }
  }
}
</script>

<style lang='scss'>
</style>
