<template>
  <section class="all-plan-section">
    <el-tabs style="width:100%">
        <div class="pub-sm-title clear">
          <h3 class="fl">计划目标</h3>
          <div class="fr">

            <el-button type="primary" @click="handleReset">新增计划目标</el-button>
            <el-dialog :visible.sync="dialogFormVisible">
              <el-form :model="planTarget">
                <el-form-item class="is-required" label="计划目标类型：">
                  <el-select class="select100" v-model="planTarget.planTargetType" placeholder="请选择" size="small">
                    <el-option
                      v-for="item in planTarget.targetTypeOptions"
                      :key="item.value"
                      :label="item.label"
                      :value="item.value">
                    </el-option>
                  </el-select>
                </el-form-item>
                <el-form-item class="is-required" label="计划目标名称">
                  <el-input placeholder="限10字以内" v-model="planTarget.tgtName" auto-complete="off"></el-input>
                  <div class="input-hint-text text-left">您还可以输入{{10 -planTarget.tgtName.length}}个字</div>
                </el-form-item>
                <el-form-item class="is-required" label="计划目标描述">
                  <el-input placeholder="限50字以内" v-model="planTarget.desc" auto-complete="off"></el-input>
                  <div class="input-hint-text text-left">您还可以输入{{50 -planTarget.desc.length}}个字</div>
                </el-form-item>
              </el-form>
              <div slot="footer" class="dialog-footer">
                <el-button @click="dialogFormVisible = false">取 消</el-button>
                <el-button type="primary" @click="handleCreatePlanTarget">确 定</el-button>
              </div>
            </el-dialog>
          </div>
        </div>

        <div class="plan-content">
          <el-form
            :label-position="'right'"
            label-width="120px"
            size="small"
            ref="searchPlanTargetObj"
            :model="searchPlanTargetObj">
            <el-row>
              <el-col :span="8">
                <el-form-item label="计划目标：" prop="bizIdfName">
                  <el-input placeholder="请输入计划目标" v-model="searchPlanTargetObj.tgtName" clearable></el-input>
                </el-form-item>
              </el-col>

              <el-col :span="8">
                <el-form-item label="">
                  <el-button size="small" type="primary" @click="handleSearchPlanTarget">查询</el-button>
                </el-form-item>
              </el-col>

            </el-row>

          </el-form>

          <div class="table-content">
            <el-table
              v-loading="marketLoading"
              element-loading-text="拼命加载中"
              :data="marketList"
              border
              stripe
              style="width: 100%">
              <el-table-column
                fixed
                prop="tgtId"
                label="计划目标ID"
                width="100px">
              </el-table-column>
              <el-table-column
                prop="planTargetType"
                label="目标类型">
              </el-table-column>
              <el-table-column
                prop="tgtName"
                label="计划目标名称">
              </el-table-column>
              <el-table-column
                prop="desc"
                label="计划目标描述">
              </el-table-column>
              <el-table-column
                prop="creator"
                label="创建人">
              </el-table-column>
              <el-table-column
                fixed="right"
                label="操作"
                align="center">
                <template slot-scope="scope">
                  <el-button type="text" @click="handleSetTargetId(scope.row.tgtId);handleSearchPlanTargetAndEdit(scope.row.tgtName)">编辑</el-button>

                  <el-button size="mini" type="text" @click="handlePlanTargetDelete(scope.row.tgtId)">删除</el-button>
                </template>
              </el-table-column>
            </el-table>
          </div>

          <div class="pagination" v-if="searchPlanTargetObj.marketTotal">
            <el-pagination
              background
              layout="total, prev, pager, next, jumper"
              @current-change="pageChange"
              :current-page="searchPlanTargetObj.pageNumber"
              :total="searchPlanTargetObj.marketTotal">
            </el-pagination>
          </div>
        </div>
      <el-dialog :visible.sync="dialogFormVisible2">
        <el-form :model="planTarget">
          <el-form-item class="is-required" label="计划目标类型：">
            <el-select class="select100" v-model="planTarget.planTargetType" placeholder="请选择" size="small">
              <el-option
                v-for="item in planTarget.targetTypeOptions"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item class="is-required" label="计划目标名称">
            <el-input placeholder="限10字以内" v-model="planTarget.tgtName" auto-complete="off"></el-input>
            <div class="input-hint-text text-left">您还可以输入{{10 -planTarget.tgtName.length}}个字</div>
          </el-form-item>
          <el-form-item class="is-required" label="计划目标描述">
            <el-input placeholder="限50字以内" v-model="planTarget.desc" auto-complete="off"></el-input>
            <div class="input-hint-text text-left">您还可以输入{{50 -planTarget.desc.length}}个字</div>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="dialogFormVisible2 = false">取 消</el-button>
          <el-button type="primary" @click="handleEditPlanTarget">确 定</el-button>
        </div>
      </el-dialog>
    </el-tabs>
  </section>
</template>

<script>
import {
  createPlanTarget,
  modifyPlanTarget,
  allPlanTargetList,
  deletePlanTarget
} from 'api/service'
import {
  PLANTARGET_TYPE,
  PLANTARGET_REVERT
} from 'common/config'
export default {
  name: 'allPlan',
  data() {
    return {
      dialogFormVisible: false,
      dialogFormVisible2: false,
      marketLoading: false,
      goSerch: true,
      inputErr: true,
      planTargetTypeRecord: '',
      activeTabName: 'second', // 当前tab
      searchPlanTargetObj: {
        tgtName: '',
        pageNumber: 1,
        pageSize: 10,
        marketTotal: 0
      },
      planTarget: {
        tgtId: '',
        planTargetType: '',
        targetTypeOptions: [
          {
            label: '用户',
            value: 'USER'
          },
          {
            label: '交易额',
            value: 'TRANSACTION_AMOUNT'
          },
          {
            label: '订单量',
            value: 'ORDER_QUANTITY'
          }
        ],
        tgtName: '',
        desc: ''
      },
      marketList: []
    }
  },
  activated() {
    this.handleSearchPlanTarget()
  },
  methods: {
    // 设置目标id
    handleSetTargetId(id) {
      this.dialogFormVisible2 = true
      this.planTarget.tgtId = id
    },
    // 数据重置
    handleReset() {
      this.planTarget = {
        tgtName: '',
        desc: '',
        planTargetType: '',
        targetTypeOptions: [
          {
            label: '用户',
            value: 'USER'
          },
          {
            label: '交易额',
            value: 'TRANSACTION_AMOUNT'
          },
          {
            label: '订单量',
            value: 'ORDER_QUANTITY'
          }
        ]
      }
      this.dialogFormVisible = true
    },
    // 新增计划目标 TODO
    handleCreatePlanTarget() {
      let reqParams = {
        planTargetType: this.planTarget.planTargetType,
        tgtName: this.planTarget.tgtName,
        desc: this.planTarget.desc
      }
      createPlanTarget(reqParams)
        .then(res => {
          if (res.code === '1') {
            this.$message({
              message: '操作成功',
              type: 'success'
            })
            this.dialogFormVisible = false
            this.handleSearchPlanTarget() // 更新列表
          } else {
            this.dialogFormVisible = false
            this.$message.error(res.message)
          }
        })
    },
    // 修改计划目标
    handleEditPlanTarget() {
      let reqParams = {
        tgtId: this.planTarget.tgtId,
        planTargetType: this.planTarget.planTargetType === this.planTargetTypeRecord ? PLANTARGET_REVERT[this.planTarget.planTargetType] : this.planTarget.planTargetType,
        tgtName: this.planTarget.tgtName,
        desc: this.planTarget.desc
      }
      modifyPlanTarget(reqParams)
        .then(res => {
          if (res.code === '1') {
            this.$message({
              message: '操作成功',
              type: 'success'
            })
            this.dialogFormVisible2 = false
            this.handleSearchPlanTarget() // 更新列表
          } else {
            this.dialogFormVisible2 = false
            this.$message.error(res.message)
          }
        })
    },
    // 查询业务标识
    handleSearchPlanTarget() {
      // 点击搜索业务标识
      this.marketLoading = true
      let reqParams = {
        pageNumber: this.searchPlanTargetObj.pageNumber,
        pageSize: this.searchPlanTargetObj.pageSize,
        tgtName: this.searchPlanTargetObj.tgtName
      }
      allPlanTargetList(reqParams)
        .then(res => {
          this.marketLoading = false
          if (!this.httpThen(this, res)) return
          let data = res.data || []
          data.forEach((item, index) => {
            item.planTargetType = PLANTARGET_TYPE[item.planTargetType]
          })
          this.marketList = data
          this.searchPlanTargetObj.marketTotal = res.page ? res.page.totalRowCount : 0
        })
        .catch(err => {
          this.httpCatch(this, err)
        })
    },
    // 编辑页查询业务标识
    handleSearchPlanTargetAndEdit(tgtName) {
      // 点击搜索业务标识
      this.marketLoading = true
      let reqParams = {
        pageNumber: this.searchPlanTargetObj.pageNumber,
        pageSize: this.searchPlanTargetObj.pageSize,
        tgtName: tgtName
      }
      allPlanTargetList(reqParams)
        .then(res => {
          this.marketLoading = false
          if (!this.httpThen(this, res)) return
          let data = res.data || []
          console.log(data)
          data.forEach((item, index) => {
            item.planTargetType = PLANTARGET_TYPE[item.planTargetType]
          })
          this.planTarget.tgtName = data[0].tgtName
          this.planTarget.desc = data[0].desc
          this.planTarget.planTargetType = data[0].planTargetType
          this.planTargetTypeRecord = data[0].planTargetType
        })
        .catch(err => {
          this.httpCatch(this, err)
        })
    },
    // 删除计划目标
    handlePlanTargetDelete(id) {
      this.$confirm('确认删除该计划目标?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(() => {
          deletePlanTarget({ tgtId: id })
            .then(res => {
              if (res.code === '1') {
                this.$message({
                  message: '操作成功',
                  type: 'success'
                })
                this.handleSearchPlanTarget() // 更新列表
              } else {
                this.$message.error(res.message)
              }
            })
            .catch(() => {
              this.$message.error('删除失败')
            })
        })
        .catch(() => {})
    },
    pageChange(val) {
      this.searchPlanTargetObj.pageNumber = val
      this.handleSearchPlanTarget()
    }

  }
}
</script>

<style lang="scss">

</style>
