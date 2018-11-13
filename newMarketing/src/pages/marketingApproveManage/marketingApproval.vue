<template>
  <div class="plan-detail">
    <div class="pub-sm-title clear" v-if="bpmType == 1" >
      <h3 class="fl">办理审批</h3>
    </div>
    <div class="radios" v-if="bpmType == 1">
      <el-row>
        <el-col :span="24">
          <el-radio v-model="radio" label="true">审批通过</el-radio>
          <el-radio v-model="radio" label="false">审批不通过</el-radio>
        </el-col>
        <el-col class="topPad" :span="20">
          <el-input type="textarea" :rows="3" placeholder="请输入内容" v-model="textarea">
          </el-input>
        </el-col>
        <el-col class="topPad" :span="5">
          <el-button type="primary" size="small" @click="taskComplete">提交</el-button>
        </el-col>
      </el-row>
    </div>
    <div class="pub-sm-title clear">
      <h3 class="fl">审批记录</h3>
    </div>
    <!-- 审批记录 -->
    <div class="table-content">
      <el-table
        v-loading="activityTableLoading"
        ref="multipleTable"
        :data="marketList"
        border
        stripe
        tooltip-effect="dark"
        style="width: 100%"
        @sort-change="activitySortChange">
        <el-table-column
          prop="processName"
          label="流程名称"
          width="150">
        </el-table-column>
        <el-table-column
          prop="taskName"
          label="当前节点"
          width="120"
          show-overflow-tooltip>
        </el-table-column>
        <el-table-column
          prop="approvedStatus"
          label="审批状态"
          show-overflow-tooltip>
        </el-table-column>
        <el-table-column
          prop="comment"
          label="审批意见"
          show-overflow-tooltip>
        </el-table-column>
        <el-table-column
          prop="assignee"
          label="操作人"
          show-overflow-tooltip>
        </el-table-column>
        <el-table-column
          prop="createdDate"
          label="操作时间"
          width="170"
          show-overflow-tooltip>
          <template slot-scope="scope">
            {{ scope.row.endTime | formatDate('YYYY-MM-DD hh:mm:ss') }}
          </template>
        </el-table-column>
      </el-table>
    </div>
    <div class="pub-sm-title clear">
      <h3 class="fl" >{{planDetailObj.planName}}</h3>
      <el-row class="fr">
        <!-- <el-button size="mini" type="primary">营销计划数据</el-button> -->
        <!-- <el-button size="mini" type="primary" disabled="">测试白名单</el-button> -->
      </el-row>
    </div>
    <div class="detail-head pv bg-pad-border">
      <app-loading :height="120" v-if="!planDetailObj.planId"></app-loading>
      <!-- <el-button class="pa edit-btn" size="mini" type="primary" @click="editPlan">编辑</el-button> -->
      <el-row>
        <el-col :span="12"><div class="bg-purple"><strong>营销计划ID：</strong>{{planDetailObj.planId}}</div></el-col>
        <el-col :span="12"><div class="bg-purple"><strong>营销计划部门：</strong>{{planDetailObj.planDepartment | planDepartment}}</div></el-col>
      </el-row>
      <el-row>
        <el-col :span="12"><div class="bg-purple"><strong>营销计划名称：</strong>{{planDetailObj.planName}}</div></el-col>
        <el-col :span="12">
          <div class="detail-flex">
            <div class="fl"><strong>营销计划关注人：</strong></div>
            <div class="value">
            <el-popover
                class="fl"
                placement="top-start"
                title="营销计划关注人"
                trigger="hover">
                <div class="table-content">
                  <el-table
                    :data="planDetailPerson"
                    border
                    max-height="218"
                    style="width: 350px">
                    <el-table-column
                      prop="name"
                      width="80"
                      label="姓名"
                      show-overflow-tooltip>
                    </el-table-column>
                    <el-table-column
                      prop="telephone"
                      width="110"
                      label="电话">
                    </el-table-column>
                    <el-table-column
                      prop="mail"
                      label="邮箱"
                      show-overflow-tooltip>
                    </el-table-column>
                  </el-table>
                </div>
                <el-button type="text" slot="reference" class="icon el-icon-view"></el-button>
              </el-popover>
              <ul class="fl list">
                <li class="item">
                  <span>{{planDetailPersonFirst.name}}</span>&nbsp;&nbsp;<span>{{planDetailPersonFirst.telephone}}</span>&nbsp;&nbsp;<span>{{planDetailPersonFirst.mail}}</span>
                </li>
              </ul>
            </div>
          </div>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="12">
          <div class="detail-flex clear">
            <div class="key"><strong>营销计划说明：</strong></div>
            <div class="value single-text">
              <el-popover
                placement="top-start"
                title="营销计划说明"
                width="400"
                trigger="hover"
                :content="planDetailObj.instructions">
                <el-button type="text" slot="reference" class="icon el-icon-view"></el-button>
              </el-popover><span class="text fl">{{planDetailObj.instructions}}</span></div>
          </div>
        </el-col>
        <el-col :span="12">
          <div class="detail-flex">
            <div class="fl"><strong>营销计划目标：</strong></div>
            <div class="value">
            <el-popover
                class="fl"
                placement="top-start"
                title="营销计划目标"
                trigger="hover">
                <ul class="list">
                  <li class="item" v-for="(item, index) in planTargetModels" :key="index">
                    <span>{{item.field | planTarget}}</span>&nbsp;&nbsp;<span>{{item.val}}</span>
                  </li>
                </ul>
                <el-button type="text" slot="reference" class="icon el-icon-view"></el-button>
              </el-popover>
              <ul class="fl list">
                <li class="item">
                  <span>{{planTargetModelsFirst.field | planTarget}}</span>&nbsp;&nbsp;<span>{{planTargetModelsFirst.val}}</span>
                </li>
              </ul>
            </div>
          </div>
        </el-col>
      </el-row>
    </div>

    <!-- <div class="pub-sm-title clear">
      <h3 class="fl">计划目标</h3>
    </div>

    <div class="project-goals mar-b-20">
      {{goals}}
      <el-form :inline="true" class="demo-form-inline clear">
        <div class="goals-item" v-for="(item, index) in goalsList" :key="index">
          <el-form-item label="监测指标">
            <el-select v-model="goals[index].select" placeholder="请选择" size="mini" class="w120">
              <el-option :label="child" :value="child" :key="idx" v-for="(child, idx) in item.aType"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item>
            <el-input v-model="goals[index].code" placeholder="预算编码" size="mini" class="w120"></el-input>
          </el-form-item>
          <el-form-item>
            已达成 <strong>{{goals[index].completedVal}}</strong>%
          </el-form-item>
        </div>
      </el-form>
    </div> -->

    <div class="pub-sm-title clear">
      <h3 class="fl">支付奖品列表</h3>
      <el-row class="fr">
        <!-- <el-button size="mini" type="primary" @click="showBudgetPrizePop">新增预算奖品</el-button> -->
        <!-- <el-button size="mini" type="primary" disabled="">新增无预算奖品</el-button> -->
      </el-row>
    </div>

    <not-data v-if="!budgetInfoData.budgetInfoData.length" text="您还没有创建预算和添加奖品喔">
      <app-loading slot="loading" :height="80" v-if="prizeListLoading"></app-loading>
    </not-data>
    <div v-else class="tab-content">
      <el-tabs v-model="activeName" @tab-click="budgetPrizeTabClick">
        <el-tab-pane v-for="(item, index) in budgetInfoData.budgetInfoData" :key="index"
          :name="'budget_'+index">
            <div class="counts-list bg-pad-border">
              <el-row>
                <el-col :span="12"><div class="bg-purple"><strong>预算编码：</strong><span class="red">{{item.budgetCode}}</span></div></el-col>
                <el-col :span="12"><div class="grid-content"><strong>预算阈值：</strong><span>{{item.thresholdAlarm}}元</span></div></el-col>
              </el-row>
              <el-row>
                <el-col :span="12"><div class="bg-purple"><strong>账户主体：</strong><span>{{item.accountSubject}}</span></div></el-col>
                <el-col :span="12"><div class="grid-content"><strong>预算花费：</strong><span>{{item.usedFee}}元</span></div></el-col>
              </el-row>
              <el-row>
                <el-col :span="24"><div class="bg-purple"><strong>预算总额：</strong><span>{{item.sumFee}}元</span></div></el-col>
              </el-row>
            </div>
            <!--
              loading: loading效果
              budgetCode: 预算编码
              prizeListData: 奖品数据
              pageData: 分页数据
              @changePrizePage: 分页切换回调
             -->
            <budget-prize-table
              :loading="loading"
              :budgetCode="item.budgetCode"
              :budgetId="item.budgetId"
              :thresholdAlarm="item.thresholdAlarm"
              :settleConfigId="item.settleConfigId"
              :prizeListData="prizeListData"
              :pageData="prizePageData"
              @changePrizePage="changePrizePage"></budget-prize-table>

          </el-tab-pane>
      </el-tabs>
    </div>


    <!-- 奖品列表 -->
    <!-- <budget-prize-list
      :budgetInfoData="budgetInfoData"
      ></budget-prize-list> -->
    <!-- 无预算奖品 -->
    <div class="pub-sm-title clear">
      <h3>金融业务/其它奖品列表</h3>
    </div>
    <!--<div class="pub-sm-title clear">
      <el-button size="mini" @click="toAddNoPrize()" v-hasPermissions="'marketingPlanManage:planDetail:addNoBudget'">新增</el-button>
      <el-button size="mini" @click="showInventoryData">查看库存</el-button>
      <el-button size="mini" @click="delPrize">删除</el-button>
      <el-button size="mini" @click="enableAndDisable" :disabled="disableStart">启用/停用</el-button>
      <el-button size="mini" @click="importCountBtn()" :disabled="disableDouble">导入外部券码</el-button>
    </div>-->
    <div class="table-content">
      <el-table
        ref="multipleTable"
        :data="tableData2"
        stripe
        border
        tooltip-effect="dark"
        style="width: 100%"
        @selection-change="handleSelectionChange">
        <!--<el-table-column
          label="选择"
          width="55">
          <template slot-scope="scope">
            <el-radio class="radio" v-model="radioNoBud" :label="scope.$index" @change.native="getCurrentRow(scope.row)" >&nbsp;</el-radio>
          </template>
        </el-table-column>-->
        <el-table-column
          label="ID"
          width="120">
          <template slot-scope="scope">
            <el-button type="text" size="small"  @click="prizeDetail(scope.row)">{{ scope.row.prizeId }}</el-button>
          </template>
        </el-table-column>
        <el-table-column
          prop="prizeType"
          label="奖品类别"
          width="120">
        </el-table-column>
        <el-table-column
          prop="prizeName"
          label="奖品名称"
          show-overflow-tooltip>
        </el-table-column>
        <el-table-column
          prop="total"
          label="总数量"
          show-overflow-tooltip>
        </el-table-column>
        <el-table-column
          prop="amount"
          label="金额"
          show-overflow-tooltip>
        </el-table-column>
        <el-table-column
          prop="creator"
          label="创建人"
          show-overflow-tooltip>
        </el-table-column>
        <el-table-column
          label="创建时间"
          show-overflow-tooltip>
          <template slot-scope="scope">{{ scope.row.createdDate | formatDate('YYYY-MM-DD hh:mm:ss')  }}</template>
        </el-table-column>
        <el-table-column
          prop="modifier"
          label="修改人"
          show-overflow-tooltip>
        </el-table-column>
        <el-table-column
          prop="auditStatus"
          label="流程"
          show-overflow-tooltip>
          <template slot-scope="scope">
            <span class="gray" v-if="scope.row.auditStatus === '编辑中'">编辑中</span>
            <span class="blue" v-if="scope.row.auditStatus === '待审核'">待审核</span>
            <span class="warning" v-if="scope.row.auditStatus === '审批打回'">审批打回</span>
            <span class="green" v-if="scope.row.auditStatus === '审核通过'">审核通过</span>
            <span class="red" v-if="scope.row.auditStatus === '审核不通过'">审核不通过</span>
          </template>
        </el-table-column>
        <el-table-column
          prop="status"
          label="状态"
          show-overflow-tooltip>
          <template slot-scope="scope">
            <span class="green" v-if="scope.row.status === '启用'">启用</span>
            <span class="red" v-else>停用</span>
          </template>
        </el-table-column>
        <!-- <el-table-column
          prop="status"
          label="操作"
          show-overflow-tooltip>
          <template slot-scope="scope">
            <el-button @click="handleClick(scope.row)" type="text" size="small">查看</el-button>
            <el-button type="text" size="small">编辑</el-button>
          </template>
        </el-table-column> -->
      </el-table>
      <div class="pagination" v-if="searchMarketObj.marketTotal">
        <el-pagination
        background
        layout="total, prev, pager, next"
        @current-change="pageChange"
        :current-page="searchMarketObj.pageNumber"
        :total="searchMarketObj.marketTotal">
        </el-pagination>
      </div>
    </div>

    <!-- 无预算奖品 -->
    <!-- <div class="pub-sm-title clear">
      <h3>无预算奖品</h3>
    </div>
    <div class="counts-list bg-pad-border">
      <el-row>
        <el-col :span="12"><div class="bg-purple"><strong>预算编码：</strong><span class="red">SC00180403155</span></div></el-col>
        <el-col :span="12"><div class="grid-content"><strong>预算阈值：</strong><span>10000.00</span></div></el-col>
      </el-row>
      <el-row>
        <el-col :span="12"><div class="bg-purple"><strong>账户主体：</strong><span>京东金融-支付业务部</span></div></el-col>
        <el-col :span="12"><div class="grid-content"><strong>预算花费：</strong><span>0.00元</span></div></el-col>
      </el-row>
      <el-row>
        <el-col :span="24"><div class="bg-purple"><strong>预算总额：</strong><span>100000.00</span></div></el-col>
      </el-row>
    </div>

    <div class="pub-sm-title clear">
      <el-button size="mini">新增</el-button>
      <el-button size="mini">查看库存</el-button>
      <el-button size="mini">删除</el-button>
      <el-button size="mini">启用/停用</el-button>
    </div>

    <div class="table-content">
      <el-table
        ref="multipleTable"
        :data="tableData2"
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
            <el-button @click="handleClick(scope.row)" type="text" size="small">查看</el-button>
            <el-button type="text" size="small">编辑</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div> -->

    <!-- 礼包列表 -->
    <gift-bag-list
      @getPrizeList="getPrizeList">
    </gift-bag-list>

    <div class="pub-sm-title clear">
      <h3 class="fl">活动列表</h3>
      <!-- <el-row class="fr">
        <el-button size="mini" type="primary" @click="createActivity">创建活动</el-button>
      </el-row> -->
    </div>

    <!-- 活动列表 -->
    <div class="table-content" style="margin: 0;">
      <el-table
        v-loading="activityTableLoading"
        ref="multipleTable"
        :data="activityListData"
        border
        stripe
        tooltip-effect="dark"
        style="width: 100%"
        @sort-change="activitySortChange">
        <el-table-column
          label="活动ID"
          width="180">
          <template slot-scope="scope">
            <el-button type="text" size="small" @click="activityDetail(scope.row)">{{ scope.row.activityId }}</el-button>
          </template>
        </el-table-column>
        <el-table-column
          prop="activityName"
          label="活动名称"
          width="150">
        </el-table-column>
        <el-table-column
          prop="bizType"
          label="业务标识"
          width="120"
          show-overflow-tooltip>
        </el-table-column>
        <el-table-column
          prop="activityType"
          label="活动类型"
          show-overflow-tooltip>
        </el-table-column>
        <el-table-column
          prop="createdDate"
          label="创建时间"
          width="170"
          sortable
          show-overflow-tooltip>
          <template slot-scope="scope">
            {{ scope.row.createdDate | formatDate('YYYY-MM-DD hh:mm:ss') }}
          </template>
        </el-table-column>
        <el-table-column
          prop="creator"
          label="创建人"
          show-overflow-tooltip>
        </el-table-column>
        <el-table-column
          prop="activityStatus"
          label="状态"
          show-overflow-tooltip>
        </el-table-column>
      </el-table>
      <div class="pagination" v-if="activityListPage.totalRowCount">
        <el-pagination
          @current-change="activityPageChange"
          :current-page="1"
          layout="total, prev, pager, next"
          background
          :page-size="10"
          :total="activityListPage.totalRowCount">
        </el-pagination>
      </div>
    </div>
    <!--&lt;!&ndash; 新增预算奖品弹层 &ndash;&gt;-->
    <!--<div class="app-dialog">-->
      <!--<el-dialog title="新增预算奖品" :closeOnClickModal="false" :visible.sync="fromBudgetPrize">-->
        <!--<el-form :model="budgetPrize" :rules="budgetPrizeRules" ref="budgetPrize" class="app-dialog-form" label-position="right" label-width="90px" size="small">-->
          <!--<el-form-item label="预算编码" prop="code">-->
            <!--<el-input placeholder="例: SC00123456789" :clearable="true" v-model="budgetPrize.code"></el-input>-->
          <!--</el-form-item>-->
          <!--<el-form-item label="预算总额" prop="totalNumber">-->
            <!--<el-input v-model="budgetPrize.totalNumber" :disabled="true"></el-input>-->
          <!--</el-form-item>-->
          <!--<el-form-item label="预算名称" prop="name">-->
            <!--<el-input v-model="budgetPrize.name" :disabled="true"></el-input>-->
          <!--</el-form-item>-->
          <!--<el-form-item label="帐户主体" prop="accountSubject">-->
            <!--<el-select class="select100" placeholder="请选择" v-model="budgetPrize.accountSubject">-->
              <!--<el-option :label="item.settleCompanyName" :value="item.settleCompanyName" v-for="(item, index) in accountSubjectList" :key="index"></el-option>-->
            <!--</el-select>-->
          <!--</el-form-item>-->
          <!--<el-form-item label="预算阈值" prop="threshold">-->
            <!--<el-input v-model="budgetPrize.threshold"></el-input>-->
          <!--</el-form-item>-->
          <!--<el-form-item size="large">-->
            <!--<el-button type="primary" @click="createBudgetPrize('budgetPrize')">保存</el-button>-->
            <!--<el-button @click="fromBudgetPrize = false">取消</el-button>-->
          <!--</el-form-item>-->
        <!--</el-form>-->
      <!--</el-dialog>-->
    <!--</div>-->
  </div>
</template>

<script>
import {
  ACTIVITY_STATUS,
  PRIZE_CATEGORY,
  AUDIT_STATUS,
  STATUS
} from 'common/config'
import {
  allPlanCheckPlanById,
  queryByCode,
  createBudgetPrize,
  queryPrizeList,
  queryBudgetInfo,
  queryAccountSubject,
  queryActivityList,
  deleteActivityId,
  approveTaskDeal,
  searchProcessByInstanceId,
  approveTaskComplete,
  noBudgetEnable,
  noBudgetDisable,
  noBudgetGetstock, // 无预算奖品查看库存
  noBudgetBuddelete, // 无预算奖品删除
  noBudgetSearch // 无预算奖品查询接口
} from 'api/service'
import notData from 'components/notData/notData'
import prizeInfo from 'components/prizeInfo/prizeInfo'
import budgetPrizeList from 'pages/marketingApproveManage/budgetPrizeListApproval/budgetPrizeList'
import budgetPrizeTable from 'pages/marketingApproveManage/budgetPrizeListApproval/budgetPrizeTable'
import giftBagList from 'pages/marketingApproveManage/giftBagListApproval/giftBagList'

export default {
  components: {
    notData,
    prizeInfo,
    budgetPrizeList,
    budgetPrizeTable,
    giftBagList
  },
  data() {
    // 验证预算编码格式及是否存在
    var validateCode = (rule, value, callback) => {
      if (value === '') {
        return callback(
          new Error('请输入预算编码,两位大写字母加11位数字,例: SC00123456789')
        )
      }
      if (!/^SC\d{11}$/.test(value)) {
        // 清空原有数据
        this.budgetPrize.totalNumber = ''
        this.budgetPrize.name = ''
        return callback(
          new Error(
            '预算编码格式不正确,两位大写字母加11位数字,例: SC00123456789'
          )
        )
      } else if (this.aBudgetCode.join(',').match(value)) {
        this.budgetPrize.totalNumber = ''
        this.budgetPrize.name = ''
        return callback(new Error('不能重复创建,预算编码已经存在于当前计划中'))
      } else {
        // 验证通过，请求数据
        setTimeout(() => {
          this.getBudgetCode(res => {
            if (!res.data.dto) {
              return callback(new Error('预算编码不存在'))
            }
            // mock 余额使用完
            if (res.data.dto.remainFee <= 0) {
              this.budgetPrize.totalNumber = ''
              this.budgetPrize.name = ''
              return callback(
                new Error('预算编码余额已使用完,将不能再继续使用')
              )
            } else {
              callback()
              return 1
            }
          })
        }, 20)
      }
    }
    // 验证预算阈值
    var validateThreshold = (rule, value, callback) => {
      if (value === '') {
        return callback(new Error('请输入预算阈值'))
      } else if (!/^(\d+)?(?:\.\d{1,2})?$/.test(value)) {
        return callback(new Error('阈值只能是数字或小数,并且保留2,4位小数'))
      } else if (Number(value) > this.budgetPrize.totalNumber) {
        return callback(new Error('阈值不能大于预算总额'))
      } else {
        return callback()
      }
    }
    return {
      // 无预算奖品分页
      searchMarketObj: {
        pageNumber: 1,
        pageSize: 10,
        marketTotal: 0
      },
      radioNoBud: '',
      // 无预算奖品存库数据
      inventoryData: [],
      //
      disableStart: true,
      // 定义第三方导入按钮是否可用
      disableDouble: true,
      radio: 'true',
      textarea: '',
      prizeListLoading: false,
      // 预算编码
      aBudgetCode: [],
      // 预算奖品tab选项卡
      activeName: 'budget_0',
      // 计划id
      planId: '',
      // 办理任务
      marketList: [],
      // 计划详情数据
      planDetailObj: {},
      planDetailPerson: [],
      planDetailPersonFirst: {},
      planTargetModels: {},
      planTargetModelsFirst: {},
      // 预算奖品数据
      budgetInfoData: {
        budgetInfoData: []
      },
      // 新增预算奖品弹窗
      budgetPrize: {
        code: '',
        totalNumber: '',
        name: '',
        accountSubject: '',
        threshold: ''
      },
      // 预算奖品规则
      budgetPrizeRules: {
        code: [{ validator: validateCode, trigger: ['change', 'blur'] }],
        /* totalNumber: [
          { required: false, message: '请输入预算总额', trigger: 'blur' }
        ],
        name: [
          { required: false, message: '请输入预算名称', trigger: 'blur' }
        ], */
        accountSubject: [
          {
            type: 'string',
            required: true,
            message: '请选择帐户主体',
            trigger: 'change'
          }
        ],
        threshold: [
          { required: true, type: 'number', validator: validateThreshold, trigger: 'blur' }
        ]
      },
      // 帐户主体
      accountSubjectList: [],
      goals: [],
      /* goalsList: [
        {
          aType: ['京东支付优惠券', '小金库红包'],
          code: '',
          completedVal: '0'
        },
        {
          aType: ['京东支付优惠券', '小金库红包'],
          code: '',
          completedVal: '0'
        }
      ], */
      loading: true,
      prizeActiveIndex: 0,
      prizeListData: [],
      prizePageData: {},
      tableData2: [
        {
          date: '1001',
          prizeName: '王小虎',
          amount: '￥100.00',
          counts: 12000,
          type: '满减券',
          cPerson: 'Joh',
          createDate: '2017-06-01 17:51:53',
          uPerson: 'Joh',
          rules: '规则',
          process: '编辑中'
        }
      ],
      multipleSelection: [],
      // 新增预算奖品变量显示/隐藏
      fromBudgetPrize: false,
      formInline: {
        user: '',
        region: ''
      },
      // 活动数据列表
      activityListData: [
        // {
        //   activityId: '1001',
        //   activityName: '京东支付新人立减',
        //   bizType: '京东支付-商城',
        //   activityType: '无券活动',
        //   createdDate: '2017-06-01 17:51:53',
        //   creator: 'Joh',
        //   activityStatus: '编辑中',
        //   operation: '操作'
        // }
      ],
      // 活动列表分页数据
      activityListPage: {},
      // 活动数据列表排序类型(默认排序)
      activitySortTypeChange: {
        sort: '',
        prop: ''
      },
      activityTableLoading: false,
      bpmType: '',
      // 礼包数据列表
      giftBagList: []
    }
  },
  activated() {
    this.activeName = 'budget_0'
    this.aBudgetCode = []
    this.planId = this.$route.query.planId
    // 营销计划详情基本信息
    this.getPlanDetail()
    // 奖品预算信息
    this.getBudgetInfo('query')
    // 默认请求第一条预算奖品数据
    // this.getBudgetPrizeList('0')
    // 请求活动列表数据
    this.queryActivityList({
      pageNumber: 1,
      pageSize: 10,
      sort: ''
    })
    this.noBudgetSearch() // 无预算奖品查询
    this.appenSeachs()
  },
  methods: {
    appenSeachs() {
      this.bpmType = this.$route.query.bpmType
      if (this.bpmType === '1') {
        this.appenUyiver()
      } else if (this.bpmType === '2') {
        this.searchProcessByInstanceId()
      }
    },
    prizeDetail(row) {
      let path = ''
      if (row.prizeCategoryEnum === 'INTER_PRIZE') { //    接口奖品
        if (row.interPrizeCategoryEnum === 'LI_CAI') {
          path = '/marketingPlanManage/FinanceCouponDetail'
        } else {
          path = '/marketingPlanManage/InterPrizeDetail'
        }
      } else if (row.prizeCategoryEnum === 'PHYSICAL_PRIZE') { //     实物奖品
        path = '/marketingPlanManage/PhysicalPrizeDetail'
      } else if (row.prizeCategoryEnum === 'THIRD_PRIZE') { //     第三方奖品
        path = '/marketingPlanManage/ThirdPrizeDetail'
      }
      this.$router.push({
        path: path,
        query: {
          prizeId: row.prizeId,
          planId: this.$route.query.planId,
          auditStatus: this.$route.query.auditStatus
        }
      })
    },
    // 导入按钮
    importCountBtn(row) {
      this.$router.push({
        path: '/marketingPlanManage/importCoupon',
        query: {
          planId: this.$route.query.planId,
          prizeId: this.multipleSelection.prizeId
          // activityStatus: row.activityStatus,
        }
      })
    },
    // 无预算奖品分页
    pageChange(val) {
      this.searchMarketObj.pageNumber = val
      this.noBudgetSearch()
    },
    // 无预算奖品删除
    delPrize() {
      if (!this.multipleSelection.prizeId) {
        // 请选择想要删除的奖品
        return this.$message({ message: '请选择想要删除的奖品' })
      } else if (this.multipleSelection.auditStatus !== '编辑中') {
        return this.$message({ message: '请选择"编辑中"的数据进行删除' })
      }
      this.$confirm('此操作将永久删除该记录, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(() => {
          // 调用删除接口
          let reqParams = {
            prizeId: this.multipleSelection.prizeId
          }
          noBudgetBuddelete(reqParams)
            .then(res => {
              if (!this.httpThen(this, res)) return
              this.$message({
                message: '删除成功',
                type: 'success'
              })
              this.noBudgetSearch()
              // 删除成功后请求当前页数据
              // this.$emit('changePrizePage', this.pageData.pageNo)
            })
            .catch((err) => {
              this.httpCatch(this, err)
            })
        })
        .catch(() => {})
    },
    // 无预算奖品查看库存
    showInventoryData() {
      if (!this.multipleSelection.prizeId) {
        // 请选择想要查看库存的奖品
        return this.$message({ message: '请选择想要查看库存的奖品' })
      }
      // 调用查看库存接口
      let reqParams = {
        prizeId: this.multipleSelection.prizeId
      }
      console.log(this.multipleSelection.prizeId)
      noBudgetGetstock(reqParams)
        .then(res => {
          if (!this.httpThen(this, res)) return
          console.log(res)
          let data = res.data || {}
          this.isShowInventory = true
          this.inventoryData = [
            {
              prizeId: this.multipleSelection.prizeId,
              remainingInventory: data.stock,
              useAmount: this.multipleSelection.total - data.stock
            }
          ]
        })
        .catch((err) => {
          this.httpCatch(this, err)
        })
    },
    // 无预算奖品的启用/停用功能
    enableAndDisable() {
      if (!this.multipleSelection.prizeId) {
        // 请选择想要操作的奖品
        return this.$message({ message: '请选择想要操作的奖品' })
      }

      let reqParams = {
        prizeId: this.multipleSelection.prizeId
      }
      if (this.multipleSelection.status === '启用') {
        noBudgetDisable(reqParams)
          .then(res => {
            if (!this.httpThen(this, res)) return
            this.$message({
              type: 'success',
              message: '操作成功!'
            })
            // this.$emit('changePrizePage', this.pageData.pageNo)
            this.noBudgetSearch()
          })
          .catch((err) => {
            this.httpCatch(this, err)
          })
      } else if (this.multipleSelection.status === '停用') {
        noBudgetEnable(reqParams)
          .then(res => {
            if (!this.httpThen(this, res)) return
            this.$message({
              type: 'success',
              message: '操作成功!'
            })
            // this.$emit('changePrizePage', this.pageData.pageNo)
            this.noBudgetSearch()
          })
          .catch((err) => {
            this.httpCatch(this, err)
          })
      }
    },
    // 无预算奖品新增按钮方法
    toAddNoPrize() {
      this.$confirm('确定新增奖品信息?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.$router.push({
          path: '/marketingPlanManage/noBudgetPrize',
          query: {
            // budgetCode: this.budgetCode,
            // budgetId: this.budgetId,
            // thresholdAlarm: this.thresholdAlarm,
            planId: this.$route.query.planId
            // settleConfigId: this.settleConfigId
          }
        })
      })
        .catch(() => {})
    },
    // 无预算奖品查询
    noBudgetSearch() {
      let reqParams = {
        pageNumber: this.searchMarketObj.pageNumber,
        planId: this.$route.query.planId,
        pageSize: 10
      }
      noBudgetSearch(reqParams)
        .then(res => {
          if (!this.httpThen(this, res)) return
          let data = res.data || []
          data.forEach((item, index) => {
            item.auditStatus = AUDIT_STATUS[item.auditStatus]
            item.status = STATUS[item.status]
          })
          this.tableData2 = data
          this.searchMarketObj.marketTotal = res.page ? res.page.totalRowCount : 0
        })
        .catch((err) => {
          this.httpCatch(this, err)
        })
    },
    // 获取无预算奖品当前选中的行的数据
    getCurrentRow(val) {
      this.multipleSelection = val
      if (this.multipleSelection.prizeId > 11000000 && this.multipleSelection.prizeId < 12000000) {
        this.disableDouble = false
      } else {
        this.disableDouble = true
      }
      if (this.multipleSelection.auditStatus === '待审核') {
        this.disableStart = false
      } else {
        this.disableStart = true
      }
    },
    // 审批提交
    taskComplete() {
      let reqParams = {
        taskId: this.$route.query.id,
        parameterMap: {
          approved: [this.radio],
          comment: [this.textarea]
        }
      }
      approveTaskComplete(reqParams)
        .then(res => {
          if (!this.httpThen(this, res)) return
          this.radio = 'true'
          this.textarea = ''
          let pathObj = {
            path: '/marketingApproveManage/approveList'
          }
          this.$router.push(pathObj)
        }).catch((err) => {
          this.httpCatch(this, err)
        })
    },
    // 查询审批结果方法
    appenUyiver() {
      let reqParams = {
        taskId: this.$route.query.id
      }
      approveTaskDeal(reqParams)
        .then(res => {
          if (!this.httpThen(this, res)) return
          let data = res.data.approvedHistoryModels || []
          this.marketList = data
        }).catch((err) => {
          this.httpCatch(this, err)
        })
      // this.dialogFormVisible = false
    },
    // 查询审批结果方法
    searchProcessByInstanceId() {
      let reqParams = {
        processInstanceId: this.$route.query.id
      }
      searchProcessByInstanceId(reqParams)
        .then(res => {
          if (!this.httpThen(this, res)) return
          let data = res.data.approvedHistoryModels || []
          this.marketList = data
        }).catch((err) => {
          this.httpCatch(this, err)
        })
      // this.dialogFormVisible = false
    },
    // 此方法只有当编辑礼包和创建礼包时才调用
    getPrizeList() {
      this.queryPrizeList({
        budgetCode: this.aBudgetCode[this.prizeActiveIndex],
        pageNumber: 1,
        pageSize: 10,
        sort: 'desc'
      })
    },
    // 预算奖品tab点击
    budgetPrizeTabClick(tab, event) {
      // console.log(tab, event)
      let target = event.target || event.srcElement
      // 防重复点击
      if (target.className.match('is-active')) {
        return
      }
      this.prizePageData = {}
      // 存储预算奖品当前点击的下标
      this.prizeActiveIndex = tab.index
      // tab.index
      // 根据预算名称按需请求数据
      this.getBudgetPrizeList()
    },
    // tabIndex: 0、1、2...
    getBudgetPrizeList(tabIndex) {
      this.prizeListData = []
      this.loading = true
      // 请求奖品列表数据
      this.queryPrizeList({
        // budgetCode: this.aBudgetCode[this.this.prizeActiveIndex],
        pageNumber: 1,
        pageSize: 10,
        sort: 'desc'
      })
    },
    // 显示新增预算奖品弹窗
    showBudgetPrizePop() {
      // 显示预算奖品弹窗
      this.fromBudgetPrize = true
      // 清除表单
      this.resetForm('budgetPrize')
      // 请求帐户主体数据
      this.showBudgetPrizePop()
    },
    // 查询奖品列表
    queryPrizeList(data) {
      let reqParams = {
        planId: this.$route.query.planId,
        budgetCode: data.budgetCode || this.aBudgetCode[this.prizeActiveIndex],
        pageNumber: data.pageNumber || 1,
        pageSize: data.pageSize || 10,
        sort: 'desc'
      }
      queryPrizeList(reqParams)
        .then(res => {
          if (!this.httpThen(this, res)) return
          let data = res.data || []
          this.loading = false
          this.prizePageData = res.page
          data.forEach((item, index) => {
            item.prizeType = PRIZE_CATEGORY[item.prizeType]
            item.auditStatus = AUDIT_STATUS[item.auditStatus]
            item.status = STATUS[item.status]
          })
          this.prizeListData = data
        })
        .catch((err) => {
          this.httpCatch(this, err)
        })
    },
    // 分页回调请求数据
    changePrizePage(pageNumber) {
      this.loading = true
      this.queryPrizeList({
        // budgetCode: this.aBudgetCode[tabIndex],
        pageNumber: pageNumber,
        pageSize: 10,
        sort: 'desc'
      })
    },
    /**
     * 营销计划详情基础信息
     */
    getPlanDetail() {
      // 如果不存在planId，需要跳回到营销计划总览
      if (!this.planId) {
        this.$router.push({
          path: '/marketingPlanManage/allPlan'
        })
        return
      }
      // 开始请求基础数据
      let reqParams = {
        planId: this.planId
      }
      allPlanCheckPlanById(reqParams)
        .then(res => {
          if (!this.httpThen(this, res)) return
          let data = res.data || {}

          this.planDetailPerson = data.restPersonModels || []
          this.planDetailPersonFirst = data.restPersonModels[0] || {}

          this.planTargetModels = data.restTargetModels || []
          this.planTargetModelsFirst = data.restTargetModels[0] || {}

          this.planDetailObj = data
        })
        .catch((err) => {
          this.httpCatch(this, err)
        })
    },
    /**
     * 创建预算弹窗成功后调用
     * 请求奖品预算信息
     * callback: 1.创建完预算奖品后请求数据
     */
    getBudgetInfo(callback) {
      this.prizeListLoading = true
      let reqParams = {
        planId: this.planId
      }
      queryBudgetInfo(reqParams)
        .then(res => {
          this.prizeListLoading = false
          if (!this.httpThen(this, res)) return
          let data = res.data || {}
          // 存储预算编码信息
          let budgetInfos = data.budgetInfos || []
          // this.aBudgetCode = []
          budgetInfos.forEach((elm, index) => {
            // 存储预算编码，用于控制防止根据预算编码重复创建预算奖品
            this.aBudgetCode.push(elm.budgetCode)
          })

          // 根据预算信息请求奖品信息
          let testBudgetInfoData = {
            budgetInfoData: data.budgetInfos || []
          }

          // 合并奖品数据
          this.budgetInfoData = testBudgetInfoData

          // 弹窗创建成功
          if (typeof callback === 'function') {
            callback && callback()
          } else {
            // 页面刷新默认请求第一条预算信息的奖品数据，创建预算奖品时不请求
            this.queryPrizeList({
              budgetCode: this.aBudgetCode[0],
              pageNumber: 1,
              pageSize: 10,
              sort: 'desc'
            })
          }
        })
        .catch((err) => {
          this.httpCatch(this, err)
        })
    },
    /**
     * 创建预算奖品弹窗
     * @param formName: 指ref属性
     */
    createBudgetPrize(formName) {
      this.$refs[formName] &&
        this.$refs[formName].validate(valid => {
          if (!valid) {
            return false
          }
          console.log('创建预算奖品~~')
          // 创建预算奖品
          let reqParams = {
            planId: this.planId,
            budgetId: this.budgetCodeData.budgetId,
            accountSubject: this.budgetPrize.accountSubject,
            thresholdAlarm: this.budgetPrize.threshold
          }
          this.accountSubjectList.forEach((item, index) => {
            if (item.settleCompanyName === this.budgetPrize.accountSubject) {
              // 增加参数
              reqParams.settleConfigId = item.settleConfigId
            }
          })

          createBudgetPrize(reqParams)
            .then(res => {
              if (!this.httpThen(this, res)) return
              this.$message({
                message: '预算奖品创建成功',
                type: 'success'
              })
              // 创建成功后请求预算信息
              this.getBudgetInfo(() => {
                // 将创建完的预算进行展示
                console.log('请求新的预算数据')
                // 清空奖品列表数据
                this.prizeListData = []
                // 定位选中状态
                this.activeName = 'budget_' + (this.budgetInfoData.budgetInfoData.length - 1)
              })
              // 隐藏弹窗
              this.fromBudgetPrize = false
            })
            .catch((err) => {
              this.httpCatch(this, err)
            })
        })
    },
    // 请求帐户主体信息
    queryAccountSubject() {
      queryAccountSubject()
        .then(res => {
          if (!this.httpThen(this, res)) return
          let data = res.data || {}
          // 帐户主体数据列表
          this.accountSubjectList = data.list
        })
        .catch((err) => {
          this.httpCatch(this, err)
        })
    },
    // 重置表单
    resetForm(formName) {
      setTimeout(() => {
        // 延迟清空的原因是因为有时候dom及对应的model未渲染
        this.$refs[formName].resetFields()
      }, 0)
    },
    // 获取预算编码
    getBudgetCode(callback) {
      // if (this.budgetPrize.code === '') return
      console.log('获取预算编码')
      // 目前暂时写在这儿为了先调通接口
      let reqParams = {
        budgetCode: this.budgetPrize.code
      }
      queryByCode(reqParams)
        .then(res => {
          if (!this.httpThen(this, res)) return
          // 验证是否还剩于有预算余额，或者不预算编码不存在的情况
          if (!callback(res)) return
          let data = res.data.dto || {}
          // 存储预算信息
          this.budgetCodeData = data
          this.budgetPrize.totalNumber = data.sumFee
          this.budgetPrize.name = data.budgetName
        })
        .catch((err) => {
          this.httpCatch(this, err)
        })
    },
    // 创建活动入口
    createActivity() {
      this.$router.push({
        path: '/marketingPlanManage/createActivityHome',
        query: {
          planId: this.$route.query.planId
        }
      })
    },
    /**
     * 查询活动列表
     * @param page: { Object }
     * page.pageNumber: 当前页
     * page.pageSize: 每页数量
     * page.sort: 排序(默认时间字段排序)
     */
    queryActivityList(page) {
      this.activityTableLoading = true
      let reqParams = {
        pageNumber: page.pageNumber || 1,
        pageSize: page.pageSize || 10,
        planId: this.planId,
        sort: page.sort // || 'desc'
      }
      queryActivityList(reqParams)
        .then(res => {
          if (!this.httpThen(this, res)) return
          let data = res.data || {}
          this.activityTableLoading = false
          let aList = data.list || []
          // 总数量
          this.activityListPage = data
          // 重新组装数据(活动状态)
          aList.forEach((item, index) => {
            item.activityStatus = ACTIVITY_STATUS[item.activityStatus]
          })
          // 存储活动数据列表
          this.activityListData = data.list
        })
        .catch((err) => {
          this.httpCatch(this, err)
        })
    },
    /**
     * 删除活动数据列表
     * @param activityId: 活动id
     */
    deleteActivityItem(activityId) {
      this.$confirm('此操作将永久删除该活动, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(() => {
          let reqParmas = {
            activityId
          }
          deleteActivityId(reqParmas)
            .then(res => {
              if (!this.httpThen(this, res)) return
              // 删除成功请求新的数据
              this.queryActivityList({
                pageNumber: this.activityListPage.pageNo,
                pageSize: 10,
                sort: ''
              })
              this.$message({
                type: 'success',
                message: '删除成功!'
              })
            })
            .catch((err) => {
              this.httpCatch(this, err)
            })
        })
        .catch(() => {})
    },
    // 编辑活动,根据不同活动类型跳转不同页面
    editActivityItem(row) {
      let activityTypes = {
        '无券活动': '/marketingPlanManage/CreateNoCouponActivity',
        '外部调用发奖': '/marketingPlanManage/createExtraActivityAddPrize',
        '链接领奖活动': '/marketingPlanManage/createLinkPrizeActivity'
      }
      this.$router.push({
        path: activityTypes[row.activityType],
        query: {
          planId: this.$route.query.planId,
          activityId: row.activityId
        }
      })
    },
    // 表格排序字段点击有排序时触发
    activitySortChange(value) {
      // 更新排序类型字段数据
      this.activitySortTypeChange = {
        sort: value.order === 'descending' ? 'desc' : 'asc',
        prop: value.prop
      }
      // 默认排序
      if (!value.order) {
        this.activitySortTypeChange.sort = ''
      }
    },
    // 查看活动详情
    activityDetail(row) {
      // let activityTypes = {
      //   '无券活动': '/marketingPlanManage/noCouponDetail',
      //   '外部调用发奖': '/marketingPlanManage/noCouponDetail'
      // }

      // 根据不同活动类型区分在创建奖项时是否可以进行奖品类型选择，1可选择，0不可选择（单个奖品）
      let activityTypes = {
        '无券活动': 0,
        '外部调用发奖': 1
      }
      this.$router.push({
        path: '/marketingApproveManage/examinationApproval',
        query: {
          planId: this.$route.query.planId,
          activityId: row.activityId,
          // 区分活动类型
          type: activityTypes[row.activityType]
        }
      })
    },
    /**
     * 活动列表点击时获取排序的字段类型
     */
    activityPageChange(val) {
      this.changePage('queryActivityList', {
        pageNumber: val,
        pageSize: 10,
        sort: this.activitySortTypeChange.sort
      })
    },
    // 分页封装
    /**
     * @param queryActivityList: 方法名
     * this.changePage('queryActivityList', {
     *   pageNumber: 1,
     *   pageSize: 10,
     *   sort: 'desc'
     * })
     */
    changePage(fun, pageObj) {
      this[fun](pageObj)
    },
    handleSelectionChange(val) {
      this.multipleSelection = val
    },
    // 确定关闭对话框
    handleClose(done) {
      this.$confirm('确认关闭？')
        .then(_ => {
          done()
        })
        .catch(_ => {})
    },
    // 编辑营销计划
    editPlan() {
      this.$router.push({
        path: '/marketingPlanManage/createPlan',
        query: {
          planId: this.planId
        }
      })
    }
  }
}
</script>

<style lang="scss" scoped="scoped">
.project-goals {
  background: #fff;
  padding: 20px 30px 0;
}
.plan-detail {
  width: 100%;
  .el-row {
    line-height: 30px;
  }
}
.detail-head {
  margin-bottom: 15px;
  .edit-btn{
    right: 15px;
    top: 15px;
    z-index: 1;
  }
}
.counts-list {
  margin-bottom: 10px;
}
.app-dialog {
}
.app-dialog-form {
  // .el-form-item__label{
  //   width: 90px !important;
  // }
  // .el-form-item__content{
  //   margin-left: 90px !important;
  // }
  .el-dialog__body {
    padding: 10px;
  }
  // .el-form-item {
  //   margin-bottom: 10px;
  // }
}
.detail-flex{
  // display: flex;
  width: 100%;
  .list li{
    white-space: nowrap;
    span {
      margin-right: 10px;
    }
  }
  .icon{
    padding: 0;
    font-size: 16px;
  }
  .key{
    float: left;
    width: 100px;
    // flex: none;
  }
  .val{
    flex: 1;
  }
  .value span {
    float: left;
  }
  .text{
    display: block;
    float: left;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    max-width: 95%;
  }
}
.single-text {
  // display: block;
  // overflow: hidden;
  // text-overflow: ellipsis;
  // white-space: nowrap;
  // span{
  //   word-break: break-all;
  // }
  word-break: break-all;
  height: 24px;
  overflow: hidden;
  padding-right: 10px;
}
.el-popover--plain{
  word-break: break-all;
}
.tableOnesbak{ background-color: #fff; border: none; width: 100%;}
  .tableOnesbak tr th,.tableOnesbak tr td { border-bottom: 1px solid #eee; vertical-align: middle; line-height: 23px; padding: 6px 0; }
  .tableOnesbak tr th { color: #909399;}
  .tableOnesbak tr td{ color:#606266; text-align: center; border-right: 1px solid #eee;}
  .tableOnesbak tr td:last-child{ border-right: none;}
  .tableOnesbak tbody tr:hover{ background-color: #f4f4f4;}
  .pub-sm-title h3 {
    margin-top: 10px
  }
  .radios {
    background-color: #fff;
    padding: 20px;
    border-radius: 10px;
  }

  .topPad {
    padding-top: 10px
  }

  .detail-head .el-row {
    line-height: 30px;
  }

  .el-input {
    width: auto;
  }
  .table_tops{
    margin-top: 10px;
  }
</style>
