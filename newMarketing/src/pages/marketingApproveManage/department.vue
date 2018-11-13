<template>
  <section class="all-plan-section">
    <el-tabs style="width:100%">
    <div class="pub-sm-title clear">
      <h3 class="fl">部门管理</h3>
    </div>
    <div class="table-content">
      <ul class="ulmodeth">
        <li><span>部门名称</span></li>
        <li><span>ID</span></li>
        <li><span>修改人</span></li>
        <li><span>修改时间</span></li>
        <li><span>操作</span></li>
      </ul>
      <el-tree
        :data="marketList"
        node-key="id"
        default-expand-all
        :expand-on-click-node="false"
        >
      <span class="custom-tree-node" slot-scope="{node , data }">
        <span>{{ data.deptName }}</span>
        <span class="makeID">{{ data.deptId }}</span>
        <span class="makePreson">{{ data.creator }}</span>
        <span class="makeTime">{{ data.createdDate | formatDate('YYYY-MM-DD hh:mm:ss')}}</span>
        <span class="makeUpdAndDown">
          <el-button
            type="text"
            size="mini"
            @click="append(data)" v-hasPermissions="'marketingApproveManage:department:additional'">
                      追加
          </el-button>
          <el-button
            type="text"
            size="mini"
            @click="update(data)" v-hasPermissions="'marketingApproveManage:department:modifyBpm'">
                      修改
          </el-button>
          <el-button
            v-if="data.deptId !== '1'"
            type="text"
            size="mini"
            @click="handleDel(data.deptId)" v-hasPermissions="'marketingApproveManage:department:deleteBpm'">
                      删除
          </el-button>
        </span>
      </span>
      </el-tree>
    </div>
  <el-dialog title="新增部门" :visible.sync="dialogFormVisible">
    <el-form :model="form">
      <el-form-item label="父节点名称：" :label-width="formLabelWidth">
        <span v-html="fatherName"></span>
      </el-form-item>
      <el-form-item label="部门名称：" :label-width="formLabelWidth">
        <el-input v-model="form.name" auto-complete="off"></el-input>
      </el-form-item>
      <!-- <el-form-item label="部门ID：" :label-width="formLabelWidth">
        <el-input v-model="form.useId" auto-complete="off"></el-input>
      </el-form-item> -->
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button @click="FormVisible()">取 消</el-button>
      <el-button type="primary" @click="appendOver()">确 定</el-button>
    </div>
  </el-dialog>
  <el-dialog title="修改部门" :visible.sync="logFormVisible">
    <el-form :model="formChange">
      <el-form-item label="部门名称：" :label-width="formLabelWidth">
        <el-input v-model="formChange.name" auto-complete="off"></el-input>
      </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button @click="FormVisiChange()">取 消</el-button>
      <el-button type="primary" @click="appendOverChange()">确 定</el-button>
    </div>
  </el-dialog>
  </el-tabs>
  </section>
</template>

<script>
// import store from 'store'
import {
  approveDeparmentSearchall,
  approveDepartmentDel,
  approveDepartmentUpdate,
  approveDepartmentModify
} from 'api/service'
export default {
  data() {
    const data = []
    return {
      marketList: JSON.parse(JSON.stringify(data)),
      dialogTableVisible: false,
      dialogFormVisible: false,
      logFormVisible: false,
      deleteFormVisible: false,
      form: {
        name: '',
        useId: ''
      },
      formChange: {
        name: '',
        useId: ''
      },
      formLabelWidth: '120px',
      fatherName: '',
      dataEvn: { },
      nodeEvn: { }
    }
  },
  activated() {
    this.searchListData()
  },
  methods: {
    searchListData() {
      approveDeparmentSearchall().then(res => {
        if (!this.httpThen(this, res)) return
        let data = res.data || []
        this.marketList = data
      })
        .catch(err => {
          this.httpCatch(this, err)
        })
    },
    // 追加
    append(data) {
      this.dialogFormVisible = true
      this.fatherName = data.deptName
      this.dataEvn = data
    },
    // 追加确定
    appendOver() {
      let reqParams = {
        deptName: this.form.name,
        parentDeptId: this.dataEvn.deptId,
        ancestralIds: 1,
        level: this.dataEvn.level
      }
      approveDepartmentUpdate(reqParams)
        .then(res => {
          if (!this.httpThen(this, res)) return
          this.searchListData()
        }).catch((err) => {
          this.httpCatch(this, err)
        })
      this.dialogFormVisible = false
    },
    FormVisiChange() {
      this.logFormVisible = false
    },
    FormVisible() {
      this.dialogFormVisible = false
    },
    // 修改
    update(data) {
      this.logFormVisible = true
      this.dataEvn = data
      this.formChange.name = data.deptName
    },
    // 修改确认
    appendOverChange() {
      let reqParams = {
        deptName: this.formChange.name,
        deptId: this.dataEvn.deptId,
        parentDeptId: 1,
        ancestralIds: 1,
        level: this.dataEvn.level
      }
      approveDepartmentModify(reqParams)
        .then(res => {
          if (!this.httpThen(this, res)) return
          this.searchListData()
        }).catch((err) => {
          this.httpCatch(this, err)
        })
      this.logFormVisible = false
    },
    deleteVisiChange() {
      this.deleteFormVisible = false
    },
    handleDel(id) {
      // 删除营销计划
      this.$confirm('此操作将永久删除该条信息, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(() => {
          approveDepartmentDel({ deptId: id })
            .then(res => {
              if (res.code === '1') {
                this.$message({
                  message: '操作成功',
                  type: 'success'
                })
                this.searchListData() // 更新列表
              } else {
                this.$message.error(res.message)
              }
            })
            .catch(() => {
              this.$message.error('删除失败')
            })
        })
        .catch(() => {})
    }
  }
}
</script>

<style lang="scss" scoped="scoped">
  .ulmodeth{ width: 100%; height: 36px; display: flex; background-color: #fff;}
  .ulmodeth li{ flex: 1; line-height: 23px; padding: 6px 0; vertical-align: middle; text-align: center; color: #909399; border-bottom: 1px solid #eee;}
  .makeUpdAndDown{ position: absolute; right: 0; width: 20%; display: inline-block; text-align: center; line-height: 30px; padding: 0;}
  .makeID{ position: absolute; left: 20%; width: 20%; display: inline-block; text-align: center; line-height: 30px; padding: 0;}
  .makePreson{ position: absolute; left: 40%; width: 20%; display: inline-block; text-align: center; line-height: 30px; padding: 0;}
  .makeTime{ position: absolute; left: 60%; width: 20%; display: inline-block; text-align: center; line-height: 30px; padding: 0;}
  .custom-tree-node{ display: block; width: 100%; line-height: 30px; padding: 3px 0;}
</style>
