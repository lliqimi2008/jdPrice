<%@ page language="java" pageEncoding="UTF-8" %>
<%@ page import="com.jdpay.market.bpm.api.dto.FormPropertyDto" %>
<%@ page import="com.jdpay.market.bpm.api.dto.FormTypeDto" %>
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
        <span>规则说明：</span><label class="control-label" id="ruleDesc">节能订单是否能参加活动</label>
    </div>

    <div class="control-group">
        <label class="control-label">选择参加活动的订单</label>
        <div class="controls" id="calValueDiv">
            <input type="radio" name="calValue" value="0" onclick="modelChangeCalValue(this)"/> 非节能订单参加活动 &nbsp;&nbsp;
            <input type="radio" name="calValue" value="1" onclick="modelChangeCalValue(this)"/> 节能订单参加活动
        </div>
    </div>

    <input type="text" name="tempCalValue" id="tempCalValue" hidden="hidden"/>


    <button type="button" class="btn btn-default center-block" onclick="addRowBefore()">添加</button>
</div>
<script type="text/javascript">
    //初始执行
    document.getElementById("modelRuleName").innerText = ruleName;
    document.getElementById("modelFieldName").innerText = field;

    function addRowBefore() {
        //ruleType = "02";
        fieldSource = "I";
        calType = "==";
        calValueType = "n";
        prizeOverlay = "Y";
        status = "0";
        addRow();
    }

    function modelChangeCalValue(obj) {
        calValue = obj.value;
    }
</script>