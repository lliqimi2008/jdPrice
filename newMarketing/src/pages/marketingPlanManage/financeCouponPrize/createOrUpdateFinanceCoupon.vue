<template>
  <section class="all-plan-section">
    <el-tabs style="width:100%">
    <div class="pub-sm-title clear">
      <h3 class="fl">新增{{bigCategoryName}}优惠券</h3>
    </div>

    <div class="content-body">
      <el-form :label-position="'right'" label-width="150px" size="small" :rules="rules" ref="ruleForm" :model="ruleForm">
        <el-form-item label="预算编号：">
          <div class="create-item1">
            <el-input
              size="small"
              placeholder="预算编号"
              v-model="ruleForm.activityBudgetId"
              maxlength="120"
              clearable>
            </el-input>
          </div>
        </el-form-item>

        <el-form-item label="券类别：" prop="type">
          <div class="create-item4">
            <el-select class="select100" v-model="ruleForm.type" placeholder="请选择" size="small" @change="resetType">
              <el-option
                v-for="item in types"
                :key="item.value"
                :label="item.name"
                :value="item.value">
              </el-option>
            </el-select>
          </div>
        </el-form-item>

        <!-- 加息券 -->
        <div v-if="ruleForm.type == 1">
          <el-form-item label="加息比率：" prop="rate">
            <div class="create-item1">
              <el-input-number @change="resetName"
                               class="create-item-number"
                               controls-position="right"
                               size="small"
                               placeholder="加息比率"
                               v-model="ruleForm.rate"
                               maxlength="3"
                               :max="100"
                               :min="1"
                               clearable>
              </el-input-number>
              <span class="hint-text">%</span>
            </div>
          </el-form-item>
          <el-form-item label="加息天数：" prop="interestDayCount">
            <div class="create-item1">
              <el-input
                size="small"
                placeholder="加息天数"
                v-model="ruleForm.interestDayCount"
                maxlength="4"
                clearable>
              </el-input>
            </div>
          </el-form-item>
          <el-form-item label="优惠上限：" prop="maxProfit">
            <div class="create-item1">
              <el-input
                size="small"
                placeholder="优惠上限"
                v-model="ruleForm.maxProfit"
                maxlength="8"
                clearable>
              </el-input>
            </div>
          </el-form-item>
        </div>

        <!-- 每满返券 -->
        <div v-if="ruleForm.type == 2">
          <el-form-item label="优惠面额：">
            <el-row>
              <el-col :span="7">
                <el-form-item label="每满" class="text-left" label-width="60px" prop="satisfyValue">
                  <el-input v-model="ruleForm.satisfyValue" @keyup.native="resetName" maxlength="8"></el-input>
                  <div class="input-hint-text text-left">使用优惠券的订单最小金额</div>
                </el-form-item>
              </el-col>
              <el-col :span="1">
                <span class="hint-text">元</span>
              </el-col>
              <el-col :span="7">
                <el-form-item label="返" class="text-left" label-width="40px" prop="profit">
                  <el-input v-model="ruleForm.profit" @keyup.native="resetName" maxlength="6"></el-input>
                  <div class="input-hint-text text-left">奖品面值，最多两位小数</div>
                </el-form-item>
              </el-col>
              <el-col :span="1">
                <span class="hint-text">元</span>
              </el-col>
              <el-col :span="7">
                <el-form-item label="优惠上限" class="text-left" label-width="80px" prop="maxProfit">
                  <el-input v-model="ruleForm.maxProfit" maxlength="8"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="1">
                <span class="hint-text">元</span>
              </el-col>
            </el-row>
          </el-form-item>
        </div>

        <!-- 满返券 -->
        <div v-if="ruleForm.type == 3">
          <el-form-item label="优惠面额：">
            <el-row>
              <el-col :span="7">
                <el-form-item label="满" class="text-left" label-width="40px" prop="satisfyValue">
                  <el-input v-model="ruleForm.satisfyValue" @keyup.native="resetName" maxlength="8"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="1">
                <span class="hint-text">元</span>
              </el-col>
              <el-col :span="7">
                <el-form-item label="返" class="text-left" label-width="40px" prop="profit">
                  <el-input v-model="ruleForm.profit" @keyup.native="resetName" maxlength="6"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="1">
                <span class="hint-text">元</span>
              </el-col>
            </el-row>
          </el-form-item>
        </div>

        <!-- 众筹满减券 -->
        <div v-if="ruleForm.type == 8">
          <el-form-item label="优惠券面额：" prop="profit">
            <div class="create-item1">
              <el-input @keyup.native="resetName"
                        size="small"
                        placeholder="优惠券面额"
                        v-model="ruleForm.profit"
                        maxlength="6"
                        clearable>
              </el-input>
            </div>
          </el-form-item>
          <el-form-item label="金额使用门槛：" prop="satisfyValue">
            <div class="create-item1">
              <el-input @keyup.native="resetName"
                        size="small"
                        placeholder="金额使用门槛"
                        v-model="ruleForm.satisfyValue"
                        maxlength="8"
                        clearable>
              </el-input>
            </div>
          </el-form-item>
        </div>

        <!-- 息费折扣券 -->
        <div v-if="ruleForm.type == 11">
          <el-form-item label="折扣：" prop="rate">
            <div>
              <el-input-number @change="resetName"
                               class="create-item-number"
                               controls-position="right"
                               size="small"
                               placeholder="折扣"
                               v-model="ruleForm.rate"
                               maxlength="3"
                               :max="100"
                               :min="0"
                               clearable>
              </el-input-number>
              <span class="hint-text">%</span>
            </div>
          </el-form-item>
          <el-form-item label="减免上限：" prop="maxProfit">
            <div class="create-item1">
              <el-input
                size="small"
                placeholder="减免上限"
                v-model="ruleForm.maxProfit"
                maxlength="8"
                clearable>
              </el-input>
            </div>
            <div class="input-hint-text text-left">必填，息费减免最大值，最多精确到小数点后两位</div>
          </el-form-item>
          <el-form-item >
            <el-row>
              <el-col :span="7">
                <el-form-item label="优惠开始于第" class="text-left" label-width="120px" prop="relativeStartValue">
                  <el-input v-model="ruleForm.relativeStartValue" maxlength="4"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="1">
                <span class="hint-text">天</span>
              </el-col>
              <el-col :span="7">
                <el-form-item label="持续" class="text-left" label-width="60px" prop="relativeEndValue">
                  <el-input v-model="ruleForm.relativeEndValue" maxlength="4"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="1">
                <span class="hint-text">天</span>
              </el-col>
            </el-row>
          </el-form-item>
        </div>

        <!-- 固定费率券 -->
        <div v-if="ruleForm.type == 12">
          <el-form-item label="优惠面额：">
            <el-row>
              <el-col :span="7">
                <el-form-item label="费率" class="text-left" label-width="60px" prop="rate">
                  <el-input v-model="ruleForm.rate" @keyup.native="resetName" maxlength="3" clearable></el-input>
                  <div class="input-hint-text text-left">单位为万分之一</div>
                </el-form-item>
              </el-col>
              <el-col :span="7">
                <span class="hint-text">‱</span>
              </el-col>
            </el-row>
          </el-form-item>
          <el-form-item label="订单金额限制：">
            <el-row>
              <el-col :span="7">
                <el-form-item class="text-left" prop="compareType">
                  <div class="create-item4">
                    <el-select class="select100" v-model="ruleForm.compareType" placeholder="请选择" size="small">
                      <el-option
                        v-for="item in compareTypes"
                        :key="item.value"
                        :label="item.name"
                        :value="item.value">
                      </el-option>
                    </el-select>
                  </div>
                </el-form-item>
              </el-col>
              <el-col :span="1">
                <span class="hint-text"></span>
              </el-col>
              <el-col :span="7">
                <el-form-item class="text-left" prop="satisfyValue">
                  <el-input v-model="ruleForm.satisfyValue" maxlength="6"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="1">
                <span class="hint-text">元</span>
              </el-col>
            </el-row>
          </el-form-item>
        </div>

        <!-- 黄金满返券 -->
        <div v-if="ruleForm.type == 13">
          <el-form-item label="优惠面额：">
            <el-row>
              <el-col :span="7">
                <el-form-item label="满" class="text-left" label-width="40px" prop="satisfyValue">
                  <el-input v-model="ruleForm.satisfyValue" @keyup.native="resetName" maxlength="8"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="1">
                <span class="hint-text">元</span>
              </el-col>
              <el-col :span="7">
                <el-form-item label="返" class="text-left" label-width="40px" prop="profit">
                  <el-input v-model="ruleForm.profit" @keyup.native="resetName" maxlength="6"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="2">
                <span class="hint-text">毫克</span>
              </el-col>
            </el-row>
          </el-form-item>
        </div>

        <!-- 保险提额券 -->
        <div v-if="ruleForm.type == 14">
          <el-form-item label="优惠券面额：" prop="profit">
            <div class="create-item1">
              <el-input @keyup.native="resetName"
                        size="small"
                        placeholder="优惠券面额"
                        v-model="ruleForm.profit"
                        maxlength="6"
                        clearable>
              </el-input>
            </div>
          </el-form-item>
        </div>

        <!-- 满减券 -->
        <div v-if="ruleForm.type == 15">
          <el-form-item label="优惠面额：">
            <el-row>
              <el-col :span="7">
                <el-form-item label="满" class="text-left" label-width="40px" prop="satisfyValue">
                  <el-input v-model="ruleForm.satisfyValue" @keyup.native="resetName" maxlength="8"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="1">
                <span class="hint-text">元</span>
              </el-col>
              <el-col :span="7">
                <el-form-item label="减" class="text-left" label-width="40px" prop="profit">
                  <el-input v-model="ruleForm.profit" @keyup.native="resetName" maxlength="6"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="1">
                <span class="hint-text">元</span>
              </el-col>
            </el-row>
          </el-form-item>
        </div>

        <!-- 折扣券 -->
        <div v-if="ruleForm.type == 16">
          <el-form-item label="订单金额限制：" prop="satisfyValue">
            <div class="create-item1">
              <el-input @keyup.native="resetName"
                        size="small"
                        placeholder="订单金额限制"
                        v-model="ruleForm.satisfyValue"
                        maxlength="8"
                        clearable>
              </el-input>
            </div>
          </el-form-item>
          <el-form-item label="折扣：" prop="rate">
            <div class="create-item1">
              <el-input-number @change="resetName"
                               class="create-item-number"
                               controls-position="right"
                               size="small"
                               placeholder="折扣"
                               v-model="ruleForm.rate"
                               maxlength="3"
                               :max="100"
                               :min="0"
                               clearable>
              </el-input-number>
              <span class="hint-text">%</span>
            </div>
          </el-form-item>
          <el-form-item label="优惠上限：" prop="maxProfit">
            <div class="create-item1">
              <el-input
                size="small"
                placeholder="优惠上限"
                v-model="ruleForm.maxProfit"
                maxlength="8"
                clearable>
              </el-input>
            </div>
          </el-form-item>
        </div>

        <el-form-item label="优惠券名称：" prop="name">
          <div class="create-item1">
            <el-input
              size="small"
              placeholder="优惠券名称"
              v-model="ruleForm.name"
              maxlength="10"
              clearable>
            </el-input>
            <div class="input-hint-text text-left">该名字会用于前端展示及短信发放，限10字以内</div>
          </div>
        </el-form-item>

        <el-form-item label="有效时间类型：">
          <div class="create-item4">
            <el-select class="select100" v-model="ruleForm.validateDateType" placeholder="请选择" size="small" @change="resetValidateDateType">
              <el-option
                v-for="item in validateDateTypes"
                :key="item.value"
                :label="item.name"
                :value="item.value">
              </el-option>
            </el-select>
          </div>
        </el-form-item>
        <el-form-item label="有效期：" prop="validateDateType">
          <el-row v-if="ruleForm.validateDateType == 1">
            <el-col :span="6">
              <el-form-item class="null-label" prop="startTime">
                <el-date-picker
                  class="select100"
                  type="date"
                  placeholder="开始日期"
                  value-format="yyyy-MM-dd"
                  v-model="ruleForm.startTime"></el-date-picker>
              </el-form-item>
            </el-col>
            <el-col class="text-center" :span="1">-</el-col>
            <el-col :span="6">
              <el-form-item class="null-label" prop="endTime">
                <el-date-picker
                  class="select100"
                  type="date"
                  placeholder="结束日期"
                  value-format="yyyy-MM-dd"
                  v-model="ruleForm.endTime"></el-date-picker>
              </el-form-item>
            </el-col>
          </el-row>

          <el-row v-if="ruleForm.validateDateType == 2">
            <el-col :span="10">
              <el-form-item label="自领取日期有效期：" prop="dateCount">
                <el-input placeholder="自领取日期有效期" v-model="ruleForm.dateCount"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="2">
              <span class="hint-text">天</span>
            </el-col>
          </el-row>
        </el-form-item>

        <el-form-item label="优惠券数量：" prop="estimateCount">
          <div class="create-item1">
            <el-input
              size="small"
              placeholder="优惠券数量"
              v-model="ruleForm.estimateCount"
              maxlength="9"
              clearable>
            </el-input>
          </div>
        </el-form-item>

        <!-- <el-form-item label="券使用率：">
          <el-row>
            <el-col :span="8">
              <el-form-item prop="useRate">
                <el-input placeholder="券使用率" v-model="ruleForm.useRate"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="2">
              <span class="hint-text">%</span>
            </el-col>
          </el-row>
        </el-form-item> -->

        <el-form-item label="余量阈值：" prop="threshold">
          <div class="create-item1">
            <el-input
              size="small"
              placeholder="必填，1-1000000之间"
              v-model="ruleForm.threshold"
              maxlength="7"
              clearable>
            </el-input>
            <div class="input-hint-text text-left">剩余数量小于次数时，会发送报警短信提醒</div>
          </div>
        </el-form-item>

        <el-form-item label="手机号：" prop="tel">
          <div class="create-item1">
            <el-input
              size="small"
              placeholder="手机号"
              v-model="ruleForm.tel"
              maxlength="11"
              clearable>
            </el-input>
          </div>
        </el-form-item>

        <el-form-item label="负责人ERP：" prop="director">
          <div class="create-item1">
            <el-input
              size="small"
              placeholder="负责人ERP"
              v-model="ruleForm.director"
              maxlength="50"
              clearable>
            </el-input>
          </div>
        </el-form-item>

        <el-form-item label="负责人邮箱：" prop="email">
          <div class="create-item1">
            <el-input
              size="small"
              placeholder="负责人邮箱"
              v-model="ruleForm.email"
              maxlength="50"
              clearable>
            </el-input>
          </div>
        </el-form-item>

        <el-form-item label="小品类限制：" v-if="smallCategoryTypes.length > 0">
          <el-radio-group v-model="ruleForm.smallCategoryType" @change="findSmallCategoryValue">
            <el-radio
              v-for="item in smallCategoryTypes"
              :key="item.value"
              :label="item.value">{{item.name}}</el-radio>
          </el-radio-group>
        </el-form-item>

        <!-- 多选框 -->
        <div v-if="smallCategoryItem.smallType == 'checkbox'">
          <el-form-item>
            <el-checkbox-group v-model="smallCategoryValuesArray">
              <el-checkbox
                v-for="item in smallCategoryItem.smallCategoryValues"
                :key="item.value"
                :label="item.value">{{item.name}}</el-checkbox>
            </el-checkbox-group>
          </el-form-item>
        </div>

        <!-- 输入框 -->
        <div v-if="smallCategoryItem.smallType == 'text'">
          <el-form-item>
            <el-input
              size="small"
              placeholder=""
              v-model="ruleForm.smallCategoryValues"
              maxlength="smallCategoryItem.maxlength"
              clearable>
            </el-input>
            <div class="input-hint-text text-left">{{smallCategoryItem.comment}}</div>
          </el-form-item>
        </div>

        <el-form-item label="平台限制：" prop="platformsArray">
          <el-checkbox-group v-model="ruleForm.platformsArray">
            <el-checkbox
              v-for="item in platforms"
              :key="item.value"
              :label="item.value">{{item.name}}</el-checkbox>
          </el-checkbox-group>
        </el-form-item>

        <el-form-item label="返利方式：" prop="profitWay">
          <div class="create-item4">
            <el-select class="select100" v-model="ruleForm.profitWay" placeholder="请选择" size="small">
              <el-option
                v-for="item in profitWays"
                :key="item.value"
                :label="item.name"
                :value="item.value">
              </el-option>
            </el-select>
            <div class="input-hint-text text-left">必选，收益返还给用户的方式</div>
          </div>
        </el-form-item>

        <el-form-item label="使用说明：" prop="descs">
          <div class="create-item1">
            <el-input
              type="textarea"
              size="small"
              placeholder="使用说明"
              v-model="ruleForm.descs"
              maxlength="100"
              rows="4"
              clearable>
            </el-input>
            <div class="input-hint-text text-left">必填，用于前端显示，限制100个字</div>
          </div>
        </el-form-item>

        <el-form-item label="PC端引导链接：" prop="offerUrl">
          <div class="create-item1">
            <el-input
              size="small"
              placeholder="PC端引导链接"
              v-model="ruleForm.offerUrl"
              maxlength="100"
              clearable>
            </el-input>
            <div class="input-hint-text text-left">卡券PC端跳转链接</div>
          </div>
        </el-form-item>

        <el-form-item label="H5端引导链接：" prop="offerHUrl">
          <div class="create-item1">
            <el-input
              size="small"
              placeholder="H5端引导链接"
              v-model="ruleForm.offerHUrl"
              maxlength="150"
              clearable>
            </el-input>
            <div class="input-hint-text text-left">卡券H5端跳转链接，请尽量填写</div>
          </div>
        </el-form-item>

        <div v-if="ruleForm.bigCategory == 2">
          <el-form-item label="jumpType(APP)：">
            <div class="create-item1">
              <el-input
                size="small"
                placeholder=""
                v-model="jumpType"
                maxlength="15"
                clearable>
              </el-input>
              <div class="input-hint-text text-left">值参考：http://cf.jd.com/pages/viewpage.action?pageId=75271446</div>
            </div>
          </el-form-item>

          <el-form-item label="jumpUrl(APP)：">
            <div class="create-item1">
              <el-input
                size="small"
                placeholder=""
                v-model="jumpUrl"
                maxlength="150"
                clearable>
              </el-input>
            </div>
          </el-form-item>

          <el-form-item label="orderId(APP)：">
            <div class="create-item1">
              <el-input
                size="small"
                placeholder=""
                v-model="orderId"
                maxlength="15"
                clearable>
              </el-input>
            </div>
          </el-form-item>

          <el-form-item label="productId(APP)：">
            <div class="create-item1">
              <el-input
                size="small"
                placeholder=""
                v-model="productId"
                maxlength="15"
                clearable>
              </el-input>
            </div>
          </el-form-item>
        </div>
        <div v-else>
          <el-form-item label="金融app引导链接：" prop="offerMUrl">
            <div class="create-item1">
              <el-input
                size="small"
                placeholder="金融app引导链接"
                v-model="ruleForm.offerMUrl"
                maxlength="150"
                clearable>
              </el-input>
              <div class="input-hint-text text-left">卡券APP端跳转链接，请尽量填写</div>
            </div>
          </el-form-item>
        </div>

      </el-form>

      <div class="nextBtnBox">
        <el-button type="primary" :disabled="butDisabled" size="mini" @click="saveOrUpdateFinanceCoupon('ruleForm')">保存</el-button>
      </div>
    </div>
    </el-tabs>
  </section>
</template>

<script>
import store from 'store'
import { formatDate } from 'utils/util'
import {
  findCategoryInfo,
  findSmallCategoryValue,
  saveFinanceCoupon,
  updateFinanceCoupon,
  findCategoryDetail
} from 'api/service'

export default {
  name: 'createPlan',
  data() {
    return {
      butDisabled: false,
      bigCategoryName: this.$route.query.bigCategoryName,
      profitWays: '',
      validateDateTypes: [
        {
          value: 1,
          name: '固定'
        },
        {
          value: 2,
          name: '相对'
        }
      ],
      types: '',
      smallCategoryTypes: '',
      platforms: '',
      smallCategoryItem: {
        smallType: '',
        smallCategoryValues: '',
        comment: '',
        maxlength: '',
        defaultDesc: ''
      },
      compareTypes: [
        {
          value: 1,
          name: '等于'
        },
        {
          value: 2,
          name: '大于'
        },
        {
          value: 3,
          name: '小于'
        },
        {
          value: 4,
          name: '大于等于'
        },
        {
          value: 5,
          name: '小于等于'
        }
      ],
      smallCategoryValuesArray: [],
      jumpType: '',
      jumpUrl: '',
      orderId: '',
      productId: '',
      ruleForm: {
        platformsArray: [],
        couponKey: this.$route.query.couponKey,
        bigCategory: this.$route.query.bigCategory,
        scopeType: 1,
        useRate: '60',
        planId: this.$route.query.planId,
        createdBy: store.getters.userInfo.erp,
        modifiedBy: store.getters.userInfo.erp,
        director: '',
        prizeId: this.$route.query.prizeId,
        descs: '',
        email: '',
        estimateCount: '',
        name: '',
        offerHUrl: '',
        offerUrl: '',
        offerMUrl: '',
        platforms: '',
        satisfyValue: '',
        rate: '',
        profit: '',
        maxProfit: '',
        profitWay: '',
        startTime: '',
        endTime: '',
        tel: '',
        threshold: '',
        compareType: '',
        type: '',
        smallCategoryType: '',
        smallCategoryValues: '',
        validateDateType: 1,
        dateCount: '',
        dateCountUnit: '',
        relativeStartValue: '',
        relativeEndValue: '',
        interestDayCount: ''
      },
      isVerificationBy: false,
      rules: {
        satisfyValue: [
          {required: true, message: '最多两位小数', pattern: /^[0-9]+(.[0-9]{0,2})?$/, trigger: 'blur'}
        ],
        profit: [
          {required: true, message: '最多两位小数', pattern: /^[0-9]+(.[0-9]{0,2})?$/, trigger: 'blur'}
        ],
        maxProfit: [
          {required: true, message: '最多两位小数', pattern: /^[0-9]+(.[0-9]{0,2})?$/, trigger: 'blur'}
        ],
        rate: [
          {required: true, message: '只能输入非负的整数', pattern: /^[1-9]{1}\d*$/, trigger: 'blur'}
        ],
        interestDayCount: [
          {required: true, message: '只能输入非零的整数', pattern: /^[1-9]{1}\d*$/, trigger: 'blur'}
        ],
        compareType: [
          {required: true, message: '请选择订单金额限制', trigger: 'blur'}
        ],
        relativeStartValue: [
          {required: true, message: '只能输入非零的整数', pattern: /^[1-9]{1}\d*$/, trigger: 'blur'}
        ],
        relativeEndValue: [
          {required: true, message: '只能输入非零的整数', pattern: /^[1-9]{1}\d*$/, trigger: 'blur'}
        ],
        name: [
          {required: true, message: '请输入优惠券名称', trigger: 'blur'}
        ],
        startTime: [
          {required: true, message: '请选择开始时间', trigger: 'blur'}
        ],
        endTime: [
          {required: true, message: '请选择结束时间', trigger: 'blur'}
        ],
        dateCount: [
          {required: true, message: '只能输入非零的整数', pattern: /^[1-9]{1}\d*$/, trigger: 'blur'}
        ],
        estimateCount: [
          {required: true, message: '请输入优惠券数量', pattern: /^[1-9]{1}\d*$/, trigger: 'blur'}
        ],
        threshold: [
          {required: true, message: '只能输入非零的整数', pattern: /^[1-9]{1}\d*$/, trigger: 'blur'}
        ],
        tel: [
          {required: true, message: '只能正确的手机号', pattern: /^[1][0-9]{10}\d*$/, trigger: 'blur'}
        ],
        director: [
          {required: true, message: '请输入负责人ERP', trigger: 'blur'}
        ],
        email: [
          {type: 'email', required: true, message: '请输入正确的邮箱', trigger: 'blur'}
        ],
        descs: [
          {required: true, message: '请输入使用说明', trigger: 'blur'}
        ],
        offerUrl: [
          {required: true, message: '只能http://或https://开头', pattern: /^(https?|http):\/\/.+$/, trigger: 'blur'}
        ],
        offerHUrl: [
          {message: '只能http://或https://开头', pattern: /^(https?|http):\/\/.+$/, trigger: 'blur'}
        ],
        // offerMUrl: [
        //   {message: '只能http://或https://开头', pattern: /^(https?|http):\/\/.+$/, trigger: 'blur'}
        // ],
        profitWay: [
          {required: true, message: '请选择返利方式', trigger: 'change'}
        ],
        platformsArray: [
          {type: 'array', required: true, message: '请选择平台限制', trigger: 'change'}
        ]
      }
    }
  },
  activated() {
    this.init()
  },
  deactivated() {
    this.$destroy(true)
  },
  methods: {
    init() {
      this.findCategoryInfo()
      this.findCategoryDetail()
    },
    financeCouponPrize() {
      this.$router.push({
        path: '/marketingPlanManage/planDetail',
        query: {
          planId: this.ruleForm.planId
        }
      })
    },
    findCategoryInfo() {
      let reqParams = {
        categoryId: this.ruleForm.bigCategory
      }
      findCategoryInfo(reqParams)
        .then(res => {
          let data = res || {}

          this.platforms = data.platforms
          this.types = data.type
          this.profitWays = data.profitWay
          this.smallCategoryTypes = data.smallCategorys

          this.ruleForm.type = this.types[0].value
          this.ruleForm.smallCategoryType = this.smallCategoryTypes[0].value
          if (this.profitWays.length === 1) {
            this.ruleForm.profitWay = this.profitWays[0].value
          }
        })
        .catch((err) => {
          this.httpCatch(this, err)
        })
    },
    findSmallCategoryValue() {
      let reqParams = {
        categoryId: this.ruleForm.bigCategory,
        smallCategoryId: this.ruleForm.smallCategoryType
      }

      findSmallCategoryValue(reqParams)
        .then(res => {
          // if (!this.httpThen(this, res)) return
          let data = res || {}

          this.ruleForm.descs = data.defaultDesc
          this.ruleForm.offerHUrl = data.h5Url
          this.ruleForm.offerUrl = data.pcUrl
          this.smallCategoryItem.smallType = data.type
          this.smallCategoryItem.smallCategoryValues = data.smallValueList
          this.smallCategoryItem.comment = data.comment
          this.smallCategoryItem.maxlength = data.maxlength

          // reset
          this.ruleForm.smallCategoryValues = ''
          this.smallCategoryValuesArray = []
        })
        .catch((err) => {
          this.httpCatch(this, err)
        })
    },
    saveOrUpdateFinanceCoupon(formName) {
      this.testValidator(formName)
      // alert(this.isVerificationBy);
      if (!this.isVerificationBy) {
        // this.$message.error('填写信息有误')
        return false
      }
      this.butDisabled = true
      // 组装参数
      this.pkgParams()

      let reqParams = this.ruleForm

      if (this.ruleForm.prizeId) {
        // update
        reqParams.createdBy = ''
        updateFinanceCoupon(reqParams)
          .then(res => {
            setTimeout(() => {
              this.butDisabled = false
            }, 1000)
            // if (!this.httpThen(this, res)) return
            let data = res || {}

            if (data.success) {
              this.financeCouponPrize()
            } else {
              this.$message.error(data.message)
            }
          })
          .catch((err) => {
            this.httpCatch(this, err)
          })
      } else {
        // create
        reqParams.modifiedBy = ''
        saveFinanceCoupon(reqParams)
          .then(res => {
            setTimeout(() => {
              this.butDisabled = false
            }, 1000)
            // if (!this.httpThen(this, res)) return
            let data = res || {}

            if (data.success) {
              this.financeCouponPrize()
            } else {
              this.$message.error(data.message)
            }
          })
          .catch((err) => {
            this.httpCatch(this, err)
          })
      }
    },
    findCategoryDetail() {
      if (this.ruleForm.prizeId) {
        let reqParams = {
          prizeId: this.ruleForm.prizeId
        }
        findCategoryDetail(reqParams)
          .then(res => {
            let data = res.data || {}

            // this.ruleForm = data

            this.ruleForm.activityBudgetId = data.activityBudgetId
            this.ruleForm.descs = data.descs
            this.ruleForm.estimateCount = data.estimateCount
            this.ruleForm.name = data.name
            this.ruleForm.offerHUrl = data.offerHUrl
            this.ruleForm.offerUrl = data.offerUrl
            this.ruleForm.platforms = data.platforms
            this.ruleForm.satisfyValue = data.satisfyValue
            this.ruleForm.rate = data.rate
            this.ruleForm.profit = data.profit
            this.ruleForm.maxProfit = data.maxProfit
            this.ruleForm.profitWay = data.profitWay
            this.ruleForm.tel = data.tel
            this.ruleForm.director = data.director
            this.ruleForm.email = data.email
            this.ruleForm.threshold = data.threshold
            this.ruleForm.compareType = data.compareType
            this.ruleForm.dateCount = data.dateCount
            this.ruleForm.relativeStartValue = data.relativeStartValue
            this.ruleForm.relativeEndValue = data.relativeEndValue
            this.ruleForm.interestDayCount = data.interestDayCount
            this.ruleForm.validateDateType = data.validateDateType

            if (this.ruleForm.bigCategory !== 2) {
              this.ruleForm.offerMUrl = data.offerMUrl
            } else {
              // {"jumpType":"6","jumpUrl":"134","orderId":"jimu_user_info-1892","productId":"jimu_user_info-1892,CJHXJJ"}
              if (data.offerMUrl) {
                let offmurl = JSON.parse(data.offerMUrl)
                this.jumpType = offmurl.jumpType
                this.jumpUrl = offmurl.jumpUrl
                this.orderId = offmurl.orderId
                this.productId = offmurl.productId
              }
            }

            this.ruleForm.profitWay = data.profitWay.toString()
            this.ruleForm.type = data.type.toString()

            this.ruleForm.startTime = data.startTime !== '' ? formatDate('YYYY-MM-DD', data.startTime) : ''
            this.ruleForm.endTime = data.endTime !== '' ? formatDate('YYYY-MM-DD', data.endTime) : ''

            // plateforms
            let platformsArr = []
            var pf = data.platforms.split(',')
            for (let i = 0; i < pf.length; i++) {
              platformsArr.push(pf[i])
            }
            this.ruleForm.platformsArray = platformsArr
            this.ruleForm.platforms = ''

            // smallCategoryType
            if (!data.smallCategoryType) {
              this.ruleForm.smallCategoryType = this.smallCategoryTypes[0].value
            } else {
              this.ruleForm.smallCategoryType = data.smallCategoryType.toString()

              let reqParams = {
                categoryId: this.ruleForm.bigCategory,
                smallCategoryId: this.ruleForm.smallCategoryType
              }

              findSmallCategoryValue(reqParams)
                .then(res => {
                  // if (!this.httpThen(this, res)) return
                  let dd = res || {}

                  this.smallCategoryItem.smallType = dd.type
                  this.smallCategoryItem.smallCategoryValues = dd.smallValueList
                  this.smallCategoryItem.comment = dd.comment
                  this.smallCategoryItem.maxlength = dd.maxlength

                  if (this.smallCategoryItem.smallType === 'text') {
                    this.ruleForm.smallCategoryValues = data.smallCategoryValue
                  } else if (this.smallCategoryItem.smallType === 'checkbox') {
                    let smallCategoryValueArr = []
                    var pf = data.smallCategoryValue.split(',')
                    for (let i = 0; i < pf.length; i++) {
                      smallCategoryValueArr.push(pf[i])
                    }
                    this.smallCategoryValuesArray = smallCategoryValueArr
                    this.ruleForm.smallCategoryValues = ''
                  }
                })
                .catch((err) => {
                  this.httpCatch(this, err)
                })
            }
          })
          .catch((err) => {
            this.httpCatch(this, err)
          })
      }
    },
    pkgParams() {
      if (this.ruleForm.validateDateType === 2) {
        this.ruleForm.dateCountUnit = 1
        this.ruleForm.startTime = ''
        this.ruleForm.endTime = ''
      } else {
        this.ruleForm.dateCountUnit = ''
        this.ruleForm.dateCount = ''
      }
      if (this.ruleForm.type !== 12) {
        this.ruleForm.compareType = 4
      }

      if (this.smallCategoryItem.smallType === 'checkbox') {
        this.ruleForm.smallCategoryValues = this.smallCategoryValuesArray.join(',')
      }
      this.ruleForm.platforms = this.ruleForm.platformsArray.join(',')

      if (this.ruleForm.bigCategory === 2) {
        // {"jumpType":"6","jumpUrl":"134","orderId":"jimu_user_info-1892","productId":"jimu_user_info-1892,CJHXJJ"}
        let mUrl = {
          jumpType: this.jumpType,
          jumpUrl: this.jumpUrl,
          orderId: this.orderId,
          productId: this.productId
        }
        this.ruleForm.offerMUrl = JSON.stringify(mUrl)
      }
    },
    testValidator(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          this.isVerificationBy = true
        } else {
          this.isVerificationBy = false
        }
      })
    },
    resetType() {
      this.ruleForm.satisfyValue = ''
      this.ruleForm.profit = ''
      this.ruleForm.maxProfit = ''
      this.ruleForm.rate = ''
      this.ruleForm.interestDayCount = ''
      this.ruleForm.relativeStartValue = ''
      this.ruleForm.relativeEndValue = ''
      this.ruleForm.compareType = ''

      this.ruleForm.name = ''
    },
    resetName() {
      if (this.ruleForm.type === '1') {
        this.ruleForm.name = '返' + this.ruleForm.rate + '%理财券'
      } else if (this.ruleForm.type === '2') {
        this.ruleForm.name = '每满' + this.ruleForm.satisfyValue + '元返' + this.ruleForm.profit + '元'
      } else if (this.ruleForm.type === '3') {
        this.ruleForm.name = '满' + this.ruleForm.satisfyValue + '元返' + this.ruleForm.profit + '元'
      } else if (this.ruleForm.type === '8' || this.ruleForm.type === '15') {
        this.ruleForm.name = '满' + this.ruleForm.satisfyValue + '元减' + this.ruleForm.profit + '元'
      } else if (this.ruleForm.type === '11') {
        this.ruleForm.name = this.ruleForm.rate / 10 + '折券'
      // } else if (this.ruleForm.type === '12') {
      //   this.ruleForm.name = '万分之' + this.ruleForm.rate + '费率'
      } else if (this.ruleForm.type === '13') {
        this.ruleForm.name = '满' + this.ruleForm.satisfyValue + '元返' + this.ruleForm.profit + '毫克'
      } else if (this.ruleForm.type === '14') {
        this.ruleForm.name = this.ruleForm.profit + '元保险提额券'
      } else if (this.ruleForm.type === '16') {
        this.ruleForm.name = '满' + this.ruleForm.satisfyValue + '元享' + this.ruleForm.rate / 10 + '折'
      }
    },
    resetValidateDateType() {
      this.ruleForm.startTime = ''
      this.ruleForm.endTime = ''
      this.ruleForm.dateCount = ''
    }
  }
}
</script>

<style lang="scss" scoped>
.nextBtnBox {
  margin: 40px 0 40px 150px;
}
.pro-list-box {
  overflow: hidden;
  .pro-item {
    margin: 0 0 10px 0;
    clear: both;
    .el-icon-delete {
      margin-left: 10px;
      font-size: 16px;
      cursor: pointer;
      &:hover {
        color: #409eff;
      }
    }
  }
}
</style>
