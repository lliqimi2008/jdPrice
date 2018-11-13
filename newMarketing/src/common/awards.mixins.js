/**
 * 活动奖项mixins
 */
import { queryActivityDetail, searchRuleGroup, sortRules } from 'api/service'

// 奖项及规则组数据查询
export const awardsMixins = {
  data () {
    return {
      // 发放限制，用于创建奖项时限制发放数量
      limitData: {},
      detailData: {},
      tempAwardsDtos: [],
      awardsDtos: []
    }
  },
  methods: {
    // 请求奖项信息数据
    getAwardsInfo() {
      this.awardsLoading = true
      // 隐藏创建奖项面板
      this.showAddAward = false
      let reqParams = {
        activityId: this.$route.query.activityId
      }
      queryActivityDetail(reqParams)
        .then(res => {
          if (!this.httpThen(this, res)) return
          let data = res.data || {}
          let awardsDtos = data.activityAwardsInfoDto.awardsDtos || []
          this.detailData = data.activityAwardsInfoDto || []
          
          // 活动内奖项发放限制
          this.limitData = {
            day: this.detailData.sendLimitDay,
            week: this.detailData.sendLimitWeek,
            month: this.detailData.sendLimitMonth,
            total: this.detailData.sendLimitTotal
          }

          console.log(this.limitData)

          awardsDtos.forEach((item, index) => {
            item.index = index + ''
          })
          // 奖项数据
          this.tempAwardsDtos = awardsDtos || []
          // 查询规则组数据
          this.queryRulesGroup()
        })
        .catch((err) => {
          this.httpCatch(this, err)
        })
    },
    // 查询规则组数据
    queryRulesGroup() {
      let reqParams = {
        entranceId: this.$route.query.activityId
      }
      searchRuleGroup(reqParams)
        .then(res => {
          this.awardsLoading = false
          if (!this.httpThen(this, res)) return
          let data = res.data || {}

          let restAwardRulesModels = data.restAwardRulesModels || []
          // this.tempAwardsDtos.forEach((item, index) => {
          //   item.restAwardRulesModels = []

          //   if (restAwardRulesModels[index].awardId === item.awardsId) {
          //     item.restAwardRulesModels.push(
          //       restAwardRulesModels[index].restRuleGroupModels
          //     )
          //   }
          // })

          for (var i = 0; i < this.tempAwardsDtos.length; i++) {
            var itemAwards = this.tempAwardsDtos[i]
            // 添加规则组key
            itemAwards.restAwardRulesModels = []
            // 规则组数据
            for (var j = 0; j < restAwardRulesModels.length; j++) {
              // 奖项id相同，获取奖项id下的规则数据
              if (itemAwards.awardsId === restAwardRulesModels[j].awardId) {
                // 添加index
                restAwardRulesModels[j].restRuleGroupModels.forEach((item, index) => {
                  item.promotionRuleDtoList.forEach((i, idx) => {
                    i.index = idx
                  })
                })
                itemAwards.restAwardRulesModels.push(
                  restAwardRulesModels[j].restRuleGroupModels
                )
              }
            }
          }
          this.awardsDtos = this.tempAwardsDtos
        })
        .catch((err) => {
          this.httpCatch(this, err)
        })
    }
  }
}

// 规则排序
export const rulesGroupMisinx = {
  methods: {
    /**
     * 向上排序
     * 1.如果只有1条数据，不进行排序
     * 2.如果2条数据，第一条往上不能排序，第二条往下不能排序
     * 3.2条以上数据，过滤第一条
     */
    sortTop(data, row) {
      console.log(data)
      let index = row.index
      // 过滤第一条和最后一条数据
      if (row.index === 0) {
        console.log('0')
        return
      } else if (++index === data.length) {
        console.log('length - 1')
      }
      // console.log(data.length)
      // console.log(row.index)

      // 1,2, newData
      let oldData = data.splice(row.index - 1, 1)
      data.splice(row.index, 0, oldData[0])

      // 交换index属性
      let prevIndex = data[row.index - 1].index || 0
      let currentIndex = data[row.index].index

      let prevOrder = data[row.index - 1].order || 1
      let currentOrder = data[row.index].order

      // console.log(prevIndex)
      // console.log(currentIndex)

      data[prevIndex].index = prevIndex
      data[currentIndex].index = currentIndex

      data[prevIndex].order = prevOrder
      data[currentIndex].order = currentOrder

      // console.log(data[prevIndex].order)
      // console.log(data[currentIndex].order)

      this.sortRules({
        tagRuleId: data[currentIndex].ruleId,
        tagOrder: data[currentIndex].order,
        otherRuleId: data[prevIndex].ruleId,
        otherOrder: data[prevIndex].order
      })
    },
    // 向下排序
    sortBottom(data, row) {
      let index = row.index
      if (++index === data.length) {
        return
      }
      // console.log(row.index)

      let oldData = data.splice(row.index, 1)
      // console.log(oldData)
      data.splice(row.index + 1, 0, oldData[0])

      // 交换index属性
      let nextIndex = data[row.index + 1].index
      let currentIndex = data[row.index].index

      let nextOrder = data[row.index + 1].order
      let currentOrder = data[row.index].order

      // console.log(nextIndex)
      // console.log(currentIndex)

      data[nextIndex].index = nextIndex
      data[currentIndex].index = currentIndex

      data[nextIndex].order = nextOrder
      data[currentIndex].order = currentOrder

      // console.log(data[nextIndex].order)
      // console.log(data[currentIndex].order)

      this.sortRules({
        tagOrder: data[currentIndex].order,
        tagRuleId: data[currentIndex].ruleId,
        otherOrder: data[nextIndex].order,
        otherRuleId: data[nextIndex].ruleId
      })
    },
    // 调用排序
    sortRules(sortObj) {
      let reqParams = {
        tagOrder: sortObj.tagOrder,
        tagRuleId: sortObj.tagRuleId,
        otherOrder: sortObj.otherOrder,
        otherRuleId: sortObj.otherRuleId
      }
      sortRules(reqParams)
        .then(res => {
          this.httpThen(this, res)
        })
        .catch((err) => {
          this.httpCatch(this, err)
        })
    }
  }
}

// 删除关联奖品
export const deletePrizeConfirm = {
  methods: {
    deletePrizeItem(row) {
      this.$confirm('确认删除?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(() => {
          this.$emit('deletePrizeItem', row)
        })
        .catch(() => {})
    }
  }
}

// 创建奖项信息公共数据
export const awardsPublic = {
  data() {
    return {
      // 关联奖品
      associatedPrize: {
        prizeId: '',
        prizeName: '',
        prizeType: ''
      },
      associatedPrizeRules: {
        prizeId: [
          {
            required: false,
            message: '请输入正确的奖品id',
            pattern: /^\d+$/,
            trigger: 'blur'
          }
        ]
      },
      associatedPrizeBagRules: {
        prizeId: [
          {
            required: false,
            message: '请输入正确的礼包Id',
            pattern: /^\d+$/,
            trigger: 'blur'
          }
        ]
      },
      errClass: 'el-input el-input--small error',
      defaultClass: 'el-input el-input--small'
    }
  },
  props: {
    loading: {
      type: Boolean,
      default: false
    },
    show: {
      type: Boolean,
      default: false
    },
    data: {
      type: Array,
      default: () => {
        return []
      }
    },
    pageData: {
      type: Object,
      default: () => {
        return {}
      }
    }
  },
  watch: {
    show() {
      // 清空弹窗中的form元素
      setTimeout(() => {
        this.$refs['associatedPrize'].resetFields()
      }, 10)
    }
  },
  methods: {
    stockBlur(row, event) {
      let target = event.target
      let value = String(target.value).replace(/\s+/g, '')

      this.blur(row, target, value)
    },
    showStockBlur(row, event) {
      let target = event.target
      let value = String(target.value).replace(/\s+/g, '')

      this.blur(row, target, value)

      this.$emit('stockBlurSetStoks', row, value)
    },
    blur(row, target, value) {
      if (value.replace(/\s+/g, '') === '') {
        target.parentNode.className = this.defaultClass
        return
      }
      if (/^\d+$/.test(value)) {
        target.parentNode.className = this.defaultClass
      } else {
        target.parentNode.className = this.errClass
        return
      }

      if (Number(value) > Number(row.total || row.quantity)) {
        this.$message({
          message: '配置库存不能大于可用库存',
          type: 'warning'
        })
        target.parentNode.className = this.errClass
      } else {
        target.parentNode.className = this.defaultClass
      }
    },
    // 查询礼包
    queryGiftPrize(formName) {
      this.$refs[formName] &&
        this.$refs[formName].validate(valid => {
          if (!valid) {
            return this.$message({
              message: '您输入的数据格式有误，请检查',
              type: 'warning'
            })
          }
          this.$emit('queryGiftPrize', this.associatedPrize)
        })
    },
    // 查询奖品列表
    queryAwards(formName) {
      this.$refs[formName] &&
        this.$refs[formName].validate(valid => {
          if (!valid) {
            return this.$message({
              message: '您输入的数据格式有误，请检查',
              type: 'warning'
            })
          }
          this.$emit('queryAwards', this.associatedPrize)
        })
    },
    // 礼包分页切换
    changePageGift(pageNumber) {
      this.$emit('changePage', 'gift', {
        pageNumber: pageNumber,
        prizeId: this.associatedPrize.prizeId,
        prizeName: this.associatedPrize.prizeName,
        prizeType: this.associatedPrize.prizeType
      })
    },
    // 奖品分页切换
    changePagePrize(pageNumber) {
      this.$emit('changePage', 'prize', {
        pageNumber: pageNumber,
        prizeId: this.associatedPrize.prizeId,
        prizeName: this.associatedPrize.prizeName,
        prizeType: this.associatedPrize.prizeType
      })
    },
    // 取消添加奖品
    cancelAddPrizeItem(row) {
      this.$emit('cancelAddPrizeItem', row)
    },
    // 隐藏弹窗
    hideDialog() {
      this.$emit('hideDialog')
    }
  }
}
