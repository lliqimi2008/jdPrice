<%@ page language="java" pageEncoding="UTF-8" %>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix="fn" uri="http://java.sun.com/jsp/jstl/functions" %>
<%@ taglib prefix="fmt" uri="http://java.sun.com/jsp/jstl/fmt" %>
<%@ taglib prefix="form" uri="http://www.springframework.org/tags/form" %>
<div id="modelDiv" class="jumbotron" style="width:800px">

    <div class="control-group">
        <span>规则名称：</span><label class="control-label" id="modelRuleName"></label>
    </div>

    <div class="control-group">
        <span>后端字段：</span><label class="control-label" id="modelField"></label>
    </div>

    <div class="control-group">
        <span>规则说明：</span>
        <label class="control-label" id="modelDesc">用户维度限制用户每天参与子活动活动的次数，直接与缓存数据对比，不进行库查询，效率较高</label>

    </div>
    <div class="control-group">
        限制类型：
        <select id="modelLimitType" style="height: 20px;width: 80px">
            <option value=">=">大于等于</option>
            <option value=">">大于</option>
            <option value="==">等于</option>
            <option value="<">小于</option>
            <option value="<=">小于等于</option>
        </select>
    </div>
    <div class="control-group">
        &nbsp;&nbsp;数&nbsp;&nbsp;量：&nbsp;&nbsp;&nbsp;&nbsp;<input type="text" id="modelCalValue"
                                                                  style="height: 20px;width: 80px"/>
    </div>
    <div class="control-group" id="dimension">
        限制维度：
        <input type="checkbox" name="vehicle" value="jdPin" checked="checked"/>京东账户
        <input type="checkbox" name="vehicle" value="phone" checked="checked"/>手机号
        <input type="checkbox" name="vehicle" value="idNo" checked="checked"/>身份证
        <input type="checkbox" name="vehicle" value="bankCardNo" checked="checked"/>银行卡
        <input type="checkbox" name="vehicle" value="uuid" checked="checked"/>设备号
        <input type="checkbox" name="vehicle" value="customerId" checked="checked"/>会员号

    </div>
    <button type="button" class="btn btn-default center-block" onclick="addRowBefore()">添加</button>
</div>
<script type="text/javascript">
    //初始执行
    document.getElementById("modelRuleName").innerText = ruleName;
    document.getElementById("modelField").innerText = field;

    function addRowBefore() {
        //ruleType = "01";
        fieldSource = "I";
        calValueType = "n";
        prizeOverlay = "Y";
        status = "0";
        calType = getSelectById("modelLimitType");
        // extension = "{\"dimension\":\"jdPin|uuid|phone|idNo|bankCardNo|customerId\"}";
        calValue = document.getElementById("modelCalValue").value;
        changeDimension();
        //调用create页新增行
        addRow();
    }


</script>