<template>
  <div class="width100">
    <el-form class="app-dialog-form demo-form-inline"
      label-position="right" size="small"
      :label-width="showRuleType === 'group' ? '130px': ''"
      v-if="showRuleType === 'group'">
        <el-form-item label="后返奖项规则:">
          <el-col :span="3">
            <el-button size="mini" type="primary" @click="addRuleGroup">添加新的规则组</el-button>
          </el-col>
          <el-col :span="9">
            <p class="single-hint-text">规则组中的规则是“且”的关系，规则组之间是“或”的关系</p>
          </el-col>
        </el-form-item>

        <el-form-item class="rules-group pv" label="" v-if="rulesGroups.length">
          <!-- {{rulesGroups[rulesGroups.length - 1].rulesDataList[0].calGroupId}} -->
          <!-- 规则组 -->

          <div class="btns pa">
            <el-button type="mini" size="primary" @click="delRuleGroupConfirm">删除规则组</el-button>
            <el-button size="mini" type="primary" @click="showRulesPop">添加规则</el-button>
          </div>
          <div class="rules-group pv">
            <el-tabs v-model="ruleTabActiveName" tab-position="top" @tab-click="ruleGroupClick">
              <el-tab-pane
                v-for="(item, index) in rulesGroups"
                :name="'ruleTabActiveName_'+index"
                :label="item.groupTitle"
                :key="index">
                <!-- label存在不存在 calGroupId 的问题，需要做处理-->

                <!-- :label="item.groupTitle+(rulesGroups[index].rulesDataList[0].calGroupId || '1')" -->
                <!-- :label="item.groupTitle+(item[index].rulesDataList[0].calGroupId)" -->
                <!-- {{rulesGroups[index].rulesDataList[0].calGroupId || '1'}} -->
                <div class="rules-box-body">
                  <el-table
                    class="fixed-height"
                    :data="rulesGroups[index].rulesDataList"
                    border
                    stripe>
                    <el-table-column
                      prop="ruleName"
                      label="规则名称">
                      <template slot-scope="scope">
                        {{scope.row.field | ruleNames}}
                      </template>
                    </el-table-column>
                    <el-table-column
                      prop="field"
                      label="对应规则">
                      <template slot-scope="scope">
                        {{scope.row.field}}
                      </template>
                    </el-table-column>
                    <el-table-column
                      prop="calType"
                      label="计算类型"
                      width="100px">
                      <template slot-scope="scope">
                        {{scope.row.calType}}
                      </template>
                    </el-table-column>
                    <el-table-column
                      prop="calValue"
                      label="计算值"
                      width="100px">
                      <template slot-scope="scope">
                        {{scope.row.calValue}}
                      </template>
                    </el-table-column>
                    <el-table-column
                      prop="extension"
                      label="扩展值"
                      width="300px">
                      <template slot-scope="scope">
                        {{scope.row.extension}}
                      </template>
                    </el-table-column>
                    <el-table-column
                      prop="noPassDesc"
                      label="错误文案"
                      width="250px">
                      <template slot-scope="scope">
                        {{scope.row.noPassDesc}}
                      </template>
                    </el-table-column>
                    <!-- <el-table-column
                      prop="order"
                      label="优先级">
                      <template slot-scope="scope">
                        {{scope.row.order}}
                      </template>
                    </el-table-column> -->
                    <el-table-column
                      label="优先级">
                      <template slot-scope="scope">
                        <el-button type="text" size="small" class="font18 el-icon-caret-top" @click="sortTop(rulesGroups[index].rulesDataList, scope.row)"></el-button>
                        <el-button type="text" size="small" class="font18 el-icon-caret-bottom" @click="sortBottom(rulesGroups[index].rulesDataList, scope.row)"></el-button>
                      </template>
                    </el-table-column>
                    <el-table-column
                      label="操作"
                      width="120px">
                      <template slot-scope="scope">
                        <el-button @click="deleteRule(scope.row)" type="text" size="small">删除</el-button>
                        <el-button @click="editRule(scope.row)" type="text" size="small">编辑</el-button>
                      </template>
                    </el-table-column>
                  </el-table>
                </div>
              </el-tab-pane>
            </el-tabs>
          </div>
        </el-form-item>
    </el-form>



    <!-- 单个规则数据展示 -->
    <div class="pub-sm-title clear" v-if="showRuleType === 'single'">
      <h3 class="fl">奖品规则</h3>
      <el-row class="fr">
        <el-button size="mini" type="primary" @click="showRulesPop">添加规则</el-button>
      </el-row>
    </div>

    <div class="single-rule-content" v-if="showRuleType === 'single' && rulesGroups.length">
      <div class="rules-box-body">
        <el-table
          class="fixed-height"
          :data="rulesGroups[0].rulesDataList"
          border
          stripe>
          <el-table-column
            prop="ruleName"
            label="规则名称">
            <template slot-scope="scope">
              {{scope.row.field | ruleNames}}
            </template>
          </el-table-column>
          <el-table-column
            prop="field"
            label="对应规则">
            <template slot-scope="scope">
              {{scope.row.field}}
            </template>
          </el-table-column>
          <el-table-column
            prop="calType"
            label="计算类型"
            width="100px">
            <template slot-scope="scope">
              {{scope.row.calType}}
            </template>
          </el-table-column>
          <el-table-column
            prop="calValue"
            label="计算值"
            width="100px">
            <template slot-scope="scope">
              {{scope.row.calValue}}
            </template>
          </el-table-column>
          <el-table-column
            prop="extension"
            label="扩展值"
            width="300px">
            <template slot-scope="scope">
              {{scope.row.extension}}
            </template>
          </el-table-column>
          <el-table-column
            prop="noPassDesc"
            label="错误文案"
            width="250px">
            <template slot-scope="scope">
              {{scope.row.noPassDesc}}
            </template>
          </el-table-column>
          <el-table-column
            label="操作"
            width="120px">
            <template slot-scope="scope">
              <el-button @click="deleteRule(scope.row, 'notDelRuleGroup')" type="text" size="small">删除</el-button>
              <el-button @click="editRule(scope.row)" type="text" size="small">编辑</el-button>
            </template>
          </el-table-column>
        </el-table>
      </div>
    </div>


    <!--
      ruleType: 02奖项、03奖品,用于指定创建规则是在哪种类型
      isShow: 显示规则弹窗
      ruleCodeName: 规则对应的名称
      ruleDataTemplate: 编辑规则时携带的数据，看需求是否需要，可去除
      order: 弹窗口显示之前设置该属性，用于动态新增优先级，
             如果是添加规则组，order接收的参数需要从1开始，否则获取rulesGroupData.rulesDataList最后一个元素的orderId,
             如果是编辑，直接获取当前元素及order的赋值
      createRulePopCallBack: 每种规则对应的创建成功回调事件
      close: 规则弹窗右上角点击关闭事件
    -->
    <rules-pop
      :isShow="isShowRulesPop"
      :ruleCodeName="ruleCodeName"
      :ruleDataTemplate="ruleDataTemplate"
      :order="order"
      :groupId="groupId"
      :ruleType="ruleType"
      @createRulePopCallBack="createRulePopCallBack"
      @createRulePopCallBackTwice="createRulePopCallBackTwice"
      @close="hiddenRules"></rules-pop>

  </div>
</template>

<script>
import store from 'store'
import { rulesGroupMisinx } from 'common/awards.mixins'
import { COMPUTED_TYPE, RULES_NAME } from 'common/config'
import rulesPop from 'components/rulesPop/rulesPop'
// 根据不同活动、奖品加载不同

import { deleteRule, deleteRuleGroup, searchRule } from 'api/service'
export default {
  name: 'returnRuleIndex',
  mixins: [rulesGroupMisinx],
  components: {
    rulesPop
  },
  props: {
    // 接收修改时的规则组数据
    getRulesGroups: {
      type: Array,
      default: () => {
        return []
      }
    },
    // 不管规则组数据是否有数据，都进行监听
    watchRulesGroups: {
      type: Number,
      default: 0
    }
  },
  data() {
    return {
      showRuleType: 'group',
      ruleType: '01',
      // 设置tab选中的名字
      ruleTabActiveName: 'ruleTabActiveName_0',
      // 通过addRulesType来记录是新添加规则组，还是在现有的规则组里面添加规则,ruleGroup,rule
      addRulesType: '',
      // 规则弹窗显示
      isShowRulesPop: false,
      // 用于修改规则时带入的规则数据
      ruleDataTemplate: {},
      // 用于修改规则时展示的规则模板名,默认展开rule1
      ruleCodeName: 'rule1',
      // 创建规则开始
      startCreateRule: true,
      rulesGroupData: [],
      // tab下标，从0开始
      tabIndex: 0,
      groupName: '',
      // 默认分组id下标为1
      groupId: 1,
      // 创建规则的优先级,默认为1开始
      order: 1,
      // 规则组数据
      rulesGroups: [
        // 组
        /* {
          groupTitle: '规则组',
          rulesDataList: [
            // 每组数据
            // {
            //   ruleName: '规则组1数据1111',
            //   field: 'rule1',
            //   calType: '大于等于',
            //   calValue: 'n',
            //   extension: '这是扩展值',
            // },
            // {
            //   ruleName: '规则组1数据2222',
            //   field: 'rule1',
            //   calType: '大于等于',
            //   calValue: 'n',
            //   extension: '这是扩展值',
            // }
          ]
        } */
      ]
    }
  },
  watch: {
    // 修改规则组时携带的数据
    watchRulesGroups(newVal, oldVal) {
      console.log(newVal)
      // this.rulesGroups = newVal
      this.rulesGroups = this.getRulesGroups
    },
    rulesGroups(newVal, oldVal) {
      console.log(this.rulesGroups)
      // 需要存储所有规则数据，存储在store里面，用于奖项判断
      store.dispatch('setRulesGroups', newVal)
      console.log(store)
      // 存在规则数据，保存rulesGroupData,用于数据交互
      if (this.rulesGroups.length) {
        this.rulesGroupData = this.rulesGroups[0].rulesDataList
      }
    }
  },
  created() {
    // 查询规则
    if (this.showRuleType === 'single') {
      this.searchRules()
    }
    // 查询规则组接口在创建活动时及活动详情页调用

    // console.log(this.rulesGroups[0].rulesDataList)
    // 在增加时先验证长度，防止报错
    if (this.rulesGroups.length) {
      // 保存对应的某一组，用于对组中的数据进行编辑、删除、添加
      if (this.showRuleType === 'single') {
        this.rulesGroupData = this.rulesGroups[0].rulesDataList || []
      } else if (this.showRuleType === 'group') {
        // 0: 获取tab选中的下标
        this.rulesGroupData = this.rulesGroups[0].rulesDataList || []
      }
    }

    // 存储规则数据
    store.dispatch('setRulesGroups', this.rulesGroups)
  },
  activated() {
    console.log(this.rulesGroups)
  },
  methods: {
    // 查询规则信息
    searchRules() {
      let reqParams = {}
      console.log(this.ruleType)
      // 规则组，活动id
      if (this.ruleType === '01') {
        reqParams.entranceId = this.$route.query.activityId
      } else if (this.ruleType === '02') {
        // 奖项，使用奖项id查询
        reqParams.entranceId = store.state.awardsId // this.$route.query.activityId
      } else if (this.ruleType === '03') {
        // 奖品，使用奖品id查询
        reqParams.entranceId = this.$route.query.prizeId
      }
      searchRule(reqParams)
        .then(res => {
          if (!this.httpThen(this, res)) return
          let data = res.data || []
          this.rulesGroups.push({
            groupTitle: '规则组1',
            rulesDataList: data || []
          })
        })
        .catch((err) => {
          this.httpCatch(this, err)
        })
    },
    // 弹窗创建规则的回调,返回创建规则弹窗数据
    createRulePopCallBack(data) {
      // *此处可能返回多条数据，需要对data进行遍历
      let ruleArr = []
      // 存储需要展示的奖品规则
      ruleArr.push(data)
      // 编辑规则（如果在创建的时候返回多条规则，不能使用编辑功能，需求待确定）
      if (ruleArr[0].isEdit) {
        this.rulesGroupData.forEach((item, index) => {
          // 目前为写死的测试ruleId，会出现全部数据都被修改的情况
          if (ruleArr[0].oldRuleId === item.ruleId) {
            // item = data
            this.rulesGroupData.splice(index, 1, ruleArr[0])
          }
        })
        // 隐藏规则弹窗
        this.isShowRulesPop = false
        return
      }

      /**
       * 记录:
       * 需要区分是添加新的规则组，还是在现有的规则组里面添加规则
       * 如果是添加新的规则，这时候需要动态创建规则组
       * 如果是在现有的规则组里面添加新的规则，这时候不需要创建规则组，只需要在原有的rulesGroupData里面添加数据即可
       */

      // 规则创建完过后，添加一个新的规则组，再将规则添加到该组中
      let rulesDataList = null
      if (this.addRulesType === 'ruleGroup') {
        console.log('ruleArr: ' + ruleArr)
        // 添加成功规则组，干掉标识
        store.dispatch('setIsAddRuleGroup', false)

        this.rulesGroups.push({
          groupTitle: '规则组' + ruleArr[0].calGroupId,
          rulesDataList: []
        })
        rulesDataList = this.rulesGroups[this.rulesGroups.length - 1].rulesDataList
        this.groupId = ruleArr[0].calGroupId
        console.log(this.groupId)

        // 存储tab选中的下标
        // this.tabIndex = this.rulesGroups.length - 1
        this.setTabIndex()
        // 设置tab激活状态
        this.setRuleTabActiveName()
      } else if (this.addRulesType === 'rule') {
        // 用于创建奖品下的规则rulesDataList不存在的情况
        if (!this.rulesGroups.length) {
          this.rulesGroups.push({
            groupTitle: '规则组' + ruleArr[0].calGroupId,
            rulesDataList: []
          })
        }
        // 在规则组中添加规则，需要获取选中的tab下标
        rulesDataList = this.rulesGroups[this.tabIndex].rulesDataList
      }

      // 新增规则（同时可能增加多条规则）
      ruleArr.forEach((item, index) => {
        console.log(rulesDataList.length)
        // 动态规则组
        rulesDataList.push({
          index: rulesDataList.length,
          ruleId: item.ruleId,
          // 规则名称
          ruleName: item.ruleName,
          // 对应规则
          field: item.field,
          // 计算值类型
          calType_: COMPUTED_TYPE[item.calType],
          // 计算值
          calValue: item.calValue,
          // 扩展值
          extension: item.extension,
          // 错误文案
          // 以下存储的数据用于后端传输
          calGroupId: item.calGroupId,
          calType: item.calType,
          calValueType: item.calValueType,
          // 入口编号（如果是奖项的规则，则为活动ID,如果是奖品的规则，则为奖品ID。）
          entranceId: item.entranceId,
          fieldSource: item.fieldSource,
          noPassDesc: item.noPassDesc,
          order: item.order,
          prizeId: item.prizeId,
          prizeOverlay: item.prizeOverlay,
          ruleCodeName: item.ruleCodeName,
          ruleType: item.ruleType,
          status: item.status
        })
      })

      // rulesDataList[rulesDataList.length - 1].index =

      console.log(rulesDataList)

      // 设置tab名称下标
      this.setGroupName()

      setTimeout(() => {
        // 更新新添加规则组返回结果的数据
        this.rulesGroupData = rulesDataList
      }, 10)

      // 隐藏规则弹窗
      this.isShowRulesPop = false
    },
    createRulePopCallBackTwice() {
      this.addRulesType = 'rule'
      console.log('addRulesType', this.addRulesType)
    },
    // 编辑规则
    editRule(rule) {
      console.log(rule)
      // 设置规则组id
      this.groupId = rule.calGroupId || '1'
      // 编辑时优先级不变
      this.order = rule.order
      this.isShowRulesPop = true
      // 指定要修改的规则模板
      // this.ruleCodeName = rule.field // 'rule2' // rule.ruleCodeName
      this.ruleCodeName = rule.ruleCodeName || RULES_NAME[rule.field] || '外部规则'
      rule.type = 'edit'
      this.ruleDataTemplate = rule
    },
    // 删除规则
    deleteRule(rule, notDelRuleGroup) {
      this.rulesGroupData.forEach((item, index) => {
        // 判断创建的规则id相同，则进行删除
        if (item.ruleId === rule.ruleId) {
          this.$confirm('确认删除?', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
          })
            .then(() => {
              // 先调用删除接口，再删除本地数据
              let reqParams = {
                ruleId: item.ruleId
              }
              deleteRule(reqParams)
                .then(res => {
                  if (!this.httpThen(this, res)) return
                  this.rulesGroupData.splice(index, 1)
                  this.$message({
                    message: '删除成功',
                    type: 'success'
                  })
                  // 是否存在规则组,如果当前规则组中的数据被全部删除，则需要同时删除该规则组
                  if (!this.rulesGroupData.length) {
                    if (!notDelRuleGroup) {
                      // 删除规则组
                      this.delRuleGroup()
                    }
                  }
                })
                .catch((err) => {
                  this.httpCatch(this, err)
                })
            })
            .catch(() => {})
        }
      })
    },
    // 规则组点击(表示肯定有规则组,可以直接获取tab选项的下标)
    ruleGroupClick(tab, event) {
      // 保存规则组下标，用于传递在添加规则的时候，区分添加的第几组
      // this.tabIndex = tab.index // Number(tab.index) + 1
      this.setTabIndex(tab.index)
      // 保证有规则组并且有数据的情况下，可以不做判断处理，直接获取tabIndex
      this.groupId = Number(tab.index) + 1 // this.rulesGroups[this.rulesGroups.length - 1].rulesDataList[0].calGroupId

      // this.groupName = this.rulesGroups[tab.index].rulesDataList[0].calGroupId

      // 设置tab激活状态
      this.setRuleTabActiveName()
      // 设置tab名称下标
      this.setGroupName(tab.index)
      this.rulesGroupData = this.rulesGroups[tab.index].rulesDataList
    },
    // 添加规则组（添加规则组之前必须先添加规则，用规则来生成组的概念）
    addRuleGroup() {
      // 添加规则组标识
      let activityId = this.$route.query.activityId
      store.dispatch('setAwardsId', activityId)
      console.log(store.state.awardsId)

      // 只要是新添加规则组功能，把order设置为1即可（优化级从1开始）
      this.order = 1
      // 通过addRulesType来记录是新添加规则组，还是在现有的规则组里面添加规则
      this.addRulesType = 'ruleGroup'

      // 保存规则组id，用于建规则组的规则
      // 最最后一条规则组数据中的第1条数据的calGroupId

      // 不存在规则组
      if (!this.rulesGroups.length) {
        this.groupId = this.rulesGroups.length + 1
      } else {
        // 可能没有数据？
        this.groupId =
          Number(
            this.rulesGroups[this.rulesGroups.length - 1].rulesDataList[0]
              .calGroupId
          ) + 1
      }

      // 先显示添加规则
      this.ruleDataTemplate = {}
      this.isShowRulesPop = true

      // 规则创建完过后，添加一个新的规则组，再将规则添加到该组中
      // this.rulesGroups.push({
      //   groupTitle: '规则组',
      //   rulesDataList: []
      // })
    },
    // 删除规则组确定框(只有在创建活动时才会有创建删除规则组的功能)
    delRuleGroupConfirm() {
      this.$confirm('确认删除“规则组' + this.groupName + '”吗?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(() => {
          // 删除规则组
          this.delRuleGroup()
        })
        .catch(() => {})
    },
    // 删除规则组
    delRuleGroup() {
      // this.rulesGroups.splice(this.groupId - 1, 1)
      // 删除规则组
      let reqParams = {
        // 活动id
        entranceId: this.$route.query.activityId,
        // 奖项id（获取创建成功的奖项id，从store里面获取）
        prizeId: store.state.awardsId,
        // 规则组
        calGroupid: this.rulesGroupData[0].calGroupId
      }
      deleteRuleGroup(reqParams)
        .then(res => {
          if (!this.httpThen(this, res)) return
          // 删除规则组本地数据
          // tabIndex为0，表示只有一个规则组
          this.rulesGroups.splice(this.tabIndex, 1)
          this.$message({
            message: '删除成功',
            type: 'success'
          })

          // 更新tab下标
          this.setTabIndex()
          // 设置tab激活状态
          this.setRuleTabActiveName()
          // 设置tab名称下标
          this.setGroupName()
        })
        .catch((err) => {
          this.httpCatch(this, err)
        })
    },
    // 设置tab名称下标
    setRuleTabActiveName() {
      this.ruleTabActiveName =
        'ruleTabActiveName_' + (this.rulesGroups.length - 1)
    },
    // 设置tab名称下标
    setGroupName(index) {
      try {
        // 此时可能没有了规则组，是获取不到calGroupId值的，所以需要做过滤
        this.groupName = this.rulesGroups[index || this.rulesGroups.length - 1].rulesDataList[0].calGroupId
      } catch (error) {}
    },
    /**
     * 设置tab下标
     * index: 下标从0开始，传入说明用户点击了规则组，已经更新下标，直接使用index即可
     * 否则使用this.rulesGroups.length - 1（这种情况目前用于创建规则组的情况，获取length取得下标）
     */
    setTabIndex(index) {
      this.tabIndex = index || this.rulesGroups.length - 1
    },
    // 添加规则
    showRulesPop() {
      // 如果是在创建奖品时，需要排除没有数据的情况获取不到order的处理
      store.dispatch('setIsAddRuleGroup', false)
      if (this.rulesGroupData.length) {
        this.order = this.rulesGroupData[this.rulesGroupData.length - 1].order + 1
        this.groupId = this.rulesGroupData[0].calGroupId
      }
      this.addRulesType = 'rule'
      this.ruleDataTemplate = {}
      this.isShowRulesPop = true
    },
    // 关闭规则弹窗
    hiddenRules() {
      this.isShowRulesPop = false
    }
  }
}
</script>

<style lang='scss' scoped>
.single-rule-content {
  // margin-right: 10px;
  margin-bottom: 20px;
}
.single-hint-text {
  line-height: 16px;
  color: #999;
  font-size: 12px;
}
.single-hint-text {
  line-height: 30px;
}
</style>
