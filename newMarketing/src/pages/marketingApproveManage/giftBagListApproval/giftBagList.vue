<template>
  <div class="gift-bag-list">
    <div class="pub-sm-title clear">
      <h3 class="fl">礼包列表</h3>
     <!-- <el-row class="fr">
        <el-button size="mini" type="primary" @click="showGiftBagPop('create')">新增礼包</el-button>
      </el-row>-->
    </div>

    <not-data v-if="!giftBagList.length" text="您还没有创建礼包奖品喔">
      <app-loading slot="loading" :height="80" v-if="giftBagLoading"></app-loading>
    </not-data>
    <div v-else class="table-content">
      <div class="gift-bag-table">
        <ul class="gift-bag-head">
          <li class="item">礼包ID</li>
          <li class="item">礼包名称</li>
          <li class="item">礼包面值（元）</li>
          <li class="item">礼包数量</li>
          <li class="item">包含奖品ID</li>
          <li class="item">奖品名称</li>
          <li class="item">奖品面值（元）</li>
          <li class="item">奖品类型</li>
          <li class="item">操作</li>
        </ul>
        <div class="gift-bag-body">
          <div class="list" v-for="(item, index) in giftBagList" :key="index">
            <ul class="ul gift-bag">
              <li class="item"><span>{{item.bagId}}</span></li>
              <li class="item"><span>{{item.bagName}}</span></li>
              <li class="item"><span>{{item.amount}}</span></li>
              <li class="item"><span>{{item.quantity}}</span></li>
            </ul>
            <ul class="ul prize text-center">
              <li class="prize-list" v-for="(prize, i) in item.bagPrizeList" :key="i">
                <div class="item">{{prize.prizeId}}</div>
                <div class="item">{{prize.prizeName}}</div>
                <div class="item">{{prize.amount}}</div>
                <div class="item">{{prize.prizeType}}</div>
              </li>
            </ul>
            <div class="operation text-center">
              <el-button type="text" size="small" @click="showGiftBagPop({item: item, bagPrizeList: item.bagPrizeList})">编辑</el-button>
              <el-button type="text" size="small" @click="deleteGiftBag(item)">删除</el-button>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- 新增礼包弹窗 -->
    <div class="app-dialog">
      <el-dialog title="新增礼包" :visible.sync="giftBag">
        <el-form class="app-dialog-form" label-position="left" label-width="90px" size="small" ref="giftBag" :model="giftBagForm" :rules="giftBagFormRules">
          <el-form-item label="礼包名称" prop="name">
            <el-input v-model="giftBagForm.name"></el-input>
          </el-form-item>
          <el-form-item label="礼包数量" prop="number">
            <el-input v-model="giftBagForm.number"></el-input>
          </el-form-item>
          <el-form-item label="可选奖品">
            <div class="table-content">
              <el-table
                ref="giftBagTable"
                :data="aGiftBagData"
                border
                stripe
                tooltip-effect="dark"
                style="width: 100%"
                @selection-change="handleSelectionChange">
                <el-table-column
                  type="selection"
                  width="55">
                </el-table-column>
                <el-table-column
                  prop="prizeId"
                  label="ID"
                  width="120">
                  <template slot-scope="scope">
                    {{scope.row.prizeId}}
                  </template>
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
                  prop="total"
                  label="总数量"
                  show-overflow-tooltip>
                </el-table-column>
                <el-table-column
                  prop="prizeCategory"
                  label="类别"
                  show-overflow-tooltip>
                </el-table-column>
              </el-table>
              <div class="pagination" v-if="giftBagListPage.total >= 5">
                <el-pagination
                  @current-change="giftBagPageChange"
                  :current-page="1"
                  layout="total, prev, pager, next"
                  background
                  :page-size="5"
                  :total="giftBagListPage.total">
                </el-pagination>
              </div>
            </div>
          </el-form-item>
          <el-form-item size="large">
            <el-button type="primary" @click="createGiftBagValidate('giftBag')">保存</el-button>
            <el-button @click="cancelGiftBagCreate">取消</el-button>
          </el-form-item>
        </el-form>
      </el-dialog>
    </div>


  </div>
</template>

<script>
import { PRIZE_CATEGORY } from 'common/config'
import {
  queryGiftBagList,
  queryPrizePlanIdList,
  createGiftBag,
  deleteGiftBag,
  editGiftBag
} from 'api/service'
import notData from 'components/notData/notData'
export default {
  components: {
    notData
  },
  data() {
    return {
      giftBagLoading: false,
      // 操作礼包的类型
      giftBagType: 'create',
      // giftBagType: 'update',
      giftBagForm: {
        name: '',
        number: ''
      },
      giftBagFormRules: {
        name: [
          { required: true, message: '请输入礼包名称', trigger: 'change' },
          {
            min: 3,
            max: 10,
            message: '长度在 3 到 10 个字符',
            trigger: 'change'
          }
        ],
        number: [
          {
            required: true,
            message: '请输入礼包数量,只能输入1-100000000',
            pattern: /^([1-9]\d{0,7}?|100000000)$/,
            trigger: 'blur'
          }
        ]
      },
      // 活动列表分页数据
      giftBagListPage: {
        currentPage: 1,
        total: 0
      },
      // 新增礼包弹窗
      giftBag: false,
      giftBagList: [],
      // 新增礼包弹窗数据
      aGiftBagData: [],
      // 创建礼品选择的奖品id集合
      prizeIds: [],
      // 奖品库存总数量
      prizeTotals: [],
      // 编辑当前礼包下的所有奖品
      editCurPrizes: []
    }
  },
  activated() {
    // 请求礼包数据列表
    this.queryGiftBag()
  },
  methods: {
    // checkbox选中的当前某条数据
    handleSelectionChange(data) {
      console.log(data)
      let tempArr = {
        ids: [],
        totals: []
      }
      data.forEach((item, index) => {
        tempArr.ids.push(item.prizeId)
        tempArr.totals.push(item.total)
      })
      this.prizeIds = tempArr.ids
      this.prizeTotals = tempArr.totals
    },
    // 分页
    giftBagPageChange(val) {
      this.changePage('queryGiftBagListPop', {
        pageNumber: val,
        pageSize: 5
      })
    },
    changePage(fun, pageObj) {
      this[fun](pageObj)
    },
    // 查询礼包数据
    queryGiftBag() {
      this.giftBagLoading = true
      let reqParams = {
        planId: this.$route.query.planId
      }
      queryGiftBagList(reqParams)
        .then(res => {
          this.giftBagLoading = false
          if (!this.httpThen(this, res)) return
          let data = res.data || {}
          this.giftBagList = data.list || []
        })
        .catch(err => {
          this.httpCatch(this, err)
        })
    },
    // 显示礼包弹窗口类型
    showGiftBagPop(payload) {
      this.giftBag = true
      // 请求最新的礼包对应奖品数据
      this.queryGiftBagListPop({
        pageNumber: 1,
        pageSize: 5
      })
      if (payload === 'create') {
        this.giftBagType = 'create'
        this.giftBagForm.name = ''
        this.giftBagForm.number = ''
      } else {
        // 临时存储编辑的礼包数据
        this.giftBagData = payload

        this.giftBagType = 'update'
        console.log(payload)
        this.giftBagForm.name = payload.item.bagName
        this.giftBagForm.number = payload.item.quantity
        // 编辑时当前礼包下的奖品列表
        this.editCurPrizes = payload.bagPrizeList
      }
    },
    // 取消礼包创建
    cancelGiftBagCreate() {
      this.giftBag = false
    },
    // 查询礼包奖品信息
    queryGiftBagListPop(page) {
      let reqParams = {
        pageNumber: page.pageNumber || 1,
        pageSize: page.pageSize || 5,
        planId: this.$route.query.planId
      }
      queryPrizePlanIdList(reqParams)
        .then(res => {
          if (!this.httpThen(this, res)) return
          let data = res.data || {}
          let aList = data.list || []
          this.giftBagListPage.total = data.totalRowCount
          // 重新组装数据(活动状态)
          aList.forEach((item, index) => {
            item.prizeCategory = PRIZE_CATEGORY[item.prizeCategory]
          })
          this.aGiftBagData = aList
          // 编辑礼包，选中当前礼包所选择的奖品
          this.checkboxPrize()
        })
        .catch(err => {
          this.httpCatch(this, err)
        })
    },
    // 编辑礼包，选中当前礼包所选择的奖品
    checkboxPrize() {
      if (this.giftBagType !== 'update') return
      // 比对奖品数据，拿到下标，选中
      setTimeout(() => {
        this.aGiftBagData.forEach((item, index) => {
          this.editCurPrizes.forEach((childItem, childIndex) => {
            if (item.prizeId === childItem.prizeId) {
              this.$refs.giftBagTable.toggleRowSelection(this.aGiftBagData[index])
            }
          })
        })
      }, 100)
    },
    // 创建礼包验证
    createGiftBagValidate(formName) {
      // 先验证格式
      this.$refs[formName] &&
        this.$refs[formName].validate(valid => {
          if (!valid) {
            this.$message({
              message: '您输入的数据格式有误，请检查',
              type: 'warning'
            })
            console.log('error submit!!')
            return false
          }
          // 礼包奖品集合
          if (!this.prizeIds.length) {
            return this.$message({
              message: '请选择要添加的奖品',
              type: 'warning'
            })
          }

          // 验证库存最小值
          if (
            Number(this.giftBagForm.number) >
            Math.min.apply(null, this.prizeTotals)
          ) {
            return this.$message({
              message: '您选择的奖品总数量，不满足当前你想要配置的礼包数量',
              type: 'warning'
            })
          }

          // 验证通过
          // 区分是修改还是新增类型
          if (this.giftBagType === 'create') {
            // 创建
            this.createGiftBag()
          } else if (this.giftBagType === 'update') {
            // 修改
            this.editGiftBag()
          }
        })
    },
    // 创建礼包
    createGiftBag() {
      // 开始创建礼包
      let reqParams = {
        planId: this.$route.query.planId,
        bagName: this.giftBagForm.name,
        quantity: this.giftBagForm.number,
        prizeIds: this.prizeIds
      }
      createGiftBag(reqParams)
        .then(res => {
          if (!this.httpThen(this, res)) return
          this.$message({
            message: '创建成功',
            type: 'success'
          })
          this.giftBag = false
          // 请求礼包数据列表
          this.queryGiftBag()
          // 请求奖品列表接口
          this.$emit('getPrizeList')
        })
        .catch(err => {
          this.httpCatch(this, err)
        })
    },
    // 编辑礼包
    editGiftBag() {
      // 获取礼包下的所有奖品id集合
      // let aPrizeIds = []
      // this.giftBagData.bagPrizeList.forEach((elm, index) => {
      //   aPrizeIds.push(elm.prizeId)
      // })
      let reqParams = {
        bagId: this.giftBagData.item.bagId,
        bagName: this.giftBagData.bagName,
        quantity: this.giftBagForm.number,
        prizeIds: this.prizeIds
      }
      editGiftBag(reqParams)
        .then(res => {
          if (!this.httpThen(this, res)) return
          this.$message({
            message: '修改成功',
            type: 'success'
          })
          this.giftBag = false
          // 编辑完后查询礼包数据
          this.queryGiftBag()
          // 请求奖品列表接口
          this.$emit('getPrizeList')
        })
        .catch(err => {
          this.httpCatch(this, err)
        })
    },
    // 删除礼包
    deleteGiftBag(item) {
      this.$confirm('确认删除？' + item.bagName, '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(() => {
          let reqParams = {
            planId: this.$route.query.planId,
            bagId: item.bagId
          }
          deleteGiftBag(reqParams)
            .then(res => {
              if (!this.httpThen(this, res)) return
              this.$message({
                type: 'success',
                message: '删除成功!'
              })
              // 请求礼包数据列表
              this.queryGiftBag()
            })
            .catch(err => {
              this.httpCatch(this, err)
            })
        })
        .catch(() => {})
    }
  }
}
</script>

<style lang="scss" scoped="scoped">
.gift-bag-table {
  background: #fff;
  .gift-bag-head {
    // padding-left: 1px;
    border-top: 1px solid #ddd;
    border-left: 1px solid #ddd;
    display: flex;
    background: #eee;
    .item {
      padding: 10px;
      width: 12%;
      // height: 30px;
      // line-height: 30px;
      text-align: center;
      border-right: 1px solid #ddd;
      border-bottom: 1px solid #ddd;
      // margin-left: -1px;
    }
  }
  .gift-bag-body {
    border-left: 1px solid #ddd;
    border-right: 1px solid #ddd;
    .item {
      padding: 10px 5px;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }
    .list {
      display: flex;
    }
    .gift-bag {
      width: 44.5%;
      // margin-left: -1px;
      .item {
        box-sizing: border-box;
        display: flex;
        justify-content: center;
        align-items: center;
        span {
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }
      }
    }
    .prize {
      width: 44.5%;
      .prize-list {
        width: 100%;
        // height: 30px;
        // line-height: 30px;
        clear: both;
        .item {
          float: left;
          width: 24.99%;
          min-height: 41px;
          border-right: 1px solid #ddd;
          border-bottom: 1px solid #ddd;
        }
      }
    }
    .gift-bag {
      display: flex;
      li.item {
        // flex: 1;
        width: 24.99%;
        // float: left;
        border-right: 1px solid #ddd;
        border-bottom: 1px solid #ddd;
      }
    }
    .operation {
      display: flex;
      width: 11%;
      border-bottom: 1px solid #ddd;
      justify-content: center;
      align-items: center;
    }
  }
}
</style>
