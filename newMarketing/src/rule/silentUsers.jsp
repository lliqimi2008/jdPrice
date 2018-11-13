<%@ page language="java" pageEncoding="UTF-8" %>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix="fn" uri="http://java.sun.com/jsp/jstl/functions" %>
<%@ taglib prefix="fmt" uri="http://java.sun.com/jsp/jstl/fmt" %>
<%@ taglib prefix="form" uri="http://www.springframework.org/tags/form" %>
<div id="modelDiv" class="jumbotron col-md-4">

    <div class="control-group">
        <span>规则名称：</span><label class="control-label" id="modelRuleName"></label>
    </div>

    <div class="control-group">
        <span>后端字段：</span><label class="control-label" id="modelField"></label>
    </div>

    <div class="control-group">
        <span>规则说明：</span><label class="control-label" id="modelRuleDesc">判断用户是否实名的规则</label>
    </div>
    <div class="control-group">

        <div class="controls" id="calValueDiv">
            选择限制方式：
            <input type="radio" name="calValue" value="1" onclick="modelCalValue(this)"/> 沉默用户 &nbsp;&nbsp;
            <input type="radio" name="calValue" value="0" onclick="modelCalValue(this)"/> 非沉默用户
        </div>
    </div>
    <div class="control-group" style="margin-top: 10px">
        商户号：<textarea rows="3" cols="20" id="modelMerchantNo" placeholder="商户号，用竖线分割，全部为ALL"/>
    </div>
    <div class="control-group">
        沉默天数：<input type="text" id="modelSilentTime" style="height: 20px;width: 80px"/>
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
        calType = "==";
        calValueType = "n";
        prizeOverlay = "Y";
        status = "0";
        setExtension();
        //调用create页新增行
        addRow();
    }

    function modelCalValue(obj) {
        calValue = obj.value;
    }

    function setExtension() {
        var compareDate = "{\"compareDate\":\"NOW\",";
        var jdPayDimensionMerchant = "\"jdPayDimensionMerchant\":";
        var silentTimeBase = ",\"silentTime\":";
        var MerchantNo = document.getElementById("modelMerchantNo").value;
        var silentTime = document.getElementById("modelSilentTime").value;
        if (MerchantNo == "" || MerchantNo == undefined) {
            jdPayDimensionMerchant = jdPayDimensionMerchant + "\"\"";
        } else {
            jdPayDimensionMerchant = jdPayDimensionMerchant + "\"" + MerchantNo + "\"";
        }

        if (silentTime == "" || silentTime == undefined) {
            silentTimeBase = silentTimeBase + "\"\"}";
        } else {
            silentTimeBase = silentTimeBase + "\"" + silentTime + "\"}";
        }
        extension = compareDate + jdPayDimensionMerchant + silentTimeBase;

    }
</script>