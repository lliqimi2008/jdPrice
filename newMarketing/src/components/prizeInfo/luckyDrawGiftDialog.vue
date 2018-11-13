<template>
  <!-- 弹窗 -->
  <div class="app-dialog">
    <el-dialog title="可关联礼包列表" :visible.sync="show" :beforeClose="hideDialog">
      <el-form
        :inline="true"
        :model="associatedPrize"
        :rules="associatedPrizeBagRules"
        ref="associatedPrize"
        class="demo-form-inline clear">
        <el-col :span="7">
          <el-form-item label="礼包id" prop="prizeId">
            <el-input v-model="associatedPrize.prizeId" placeholder="礼包id" size="mini" class="w90"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="7">
          <el-form-item label="礼包名称">
            <el-input v-model="associatedPrize.prizeName" placeholder="礼包名称" size="mini" class="w90"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="3">
          <el-form-item>
            <el-button type="primary" @click="queryGiftPrize('associatedPrize')" size="mini">查询</el-button>
          </el-form-item>
        </el-col>
      </el-form>

      <!-- 弹窗关联奖品数据列表 -->
      <div class="table-content">
        <el-table
          v-loading="loading"
          element-loading-text="拼命加载中"
          ref="multipleTable"
          :data="data"
          border
          stripe
          tooltip-effect="dark"
          style="width: 100%">
          <el-table-column
            label="礼包ID"
            width="120">
            <template slot-scope="scope">{{ scope.row.bagId }}</template>
          </el-table-column>
          <el-table-column
            prop="bagName"
            label="礼包名称"
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
              {{scope.row.assigned}}
            </template>
          </el-table-column>
          <el-table-column
            prop="setStock"
            label="配置库存"
            show-overflow-tooltip>
            <template slot-scope="scope">
              <el-input size="small" v-model="scope.row.setStock" placeholder="" :ref="'setStock_'+scope.row.bagId" @blur="stockBlur(scope.row, $event)"></el-input>
            </template>
          </el-table-column>
          <el-table-column
            label="操作"
            show-overflow-tooltip>
            <template slot-scope="scope">
              <el-button type="text" size="small" v-if="scope.row.on === 0" @click="addPrizeItem(scope.row)">添加</el-button>
              <el-button type="text" size="small" v-else @click="cancelAddPrizeItem(scope.row)">取消添加</el-button>
            </template>
          </el-table-column>
        </el-table>

        <div class="mar-t-20 clear">
          <el-col :span="20">
            <div class="text-left" v-if="pageData.totalRowCount">
              <el-pagination
                @current-change="changePageGift"
                :current-page="1"
                layout="total, prev, pager, next"
                background
                :page-size="5"
                :total="pageData.totalRowCount">
              </el-pagination>
            </div>
          </el-col>
          <el-col :span="4" class="text-right">
            <el-button type="primary" @click="hideDialog" size="mini">确定</el-button>
          </el-col>
        </div>
        
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { awardsPublic } from 'common/awards.mixins'
export default {
  name: '',
  mixins: [awardsPublic],
  components: {},
  data () {
    return {}
  },
  created() {},
  methods: {
    // 隐藏弹窗
    hideDialog() {
      this.$emit('hideDialog')
    },
    // 添加奖品
    addPrizeItem(row) {
      // 单个奖品类型只允许添加一个关联奖品
      // if (store.getters.singlePrize.length) {
      //   this.$message({
      //     message: '单个奖品类型只允许添加一个关联奖品数据',
      //     type: 'warning'
      //   })
      //   return
      // }
      let setStockInput = this.$refs['setStock_' + row.bagId]
      let val = String(setStockInput.value).replace(/\s+/g, '')
      if (!val) {
        setStockInput.$el.className = this.errClass
        this.$message({
          message: '请填写配置库存',
          type: 'warning'
        })
        return
      }
      if (!/^\d+$/.test(val)) {
        this.$message({
          message: '配置库存只能是整数，并且不能大于可用库存',
          type: 'warning'
        })
        setStockInput.$el.className = this.errClass
        return
      }
      if (Number(val) > Number(row.quantity - row.assigned)) {
        this.$message({
          message: '配置库存不能大于可用库存',
          type: 'warning'
        })
        setStockInput.$el.className = this.errClass
        return
      }
      setStockInput.$el.className = this.defaultClass
      this.$emit('addPrizeItem', row)
    }
  }
}
</script>

<style lang='scss' scoped>
</style>
