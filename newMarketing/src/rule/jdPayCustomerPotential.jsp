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
        <span>规则说明：</span><label class="control-label" id="modelRuleDesc">潜在用户规则</label>
    </div>
    <div class="control-group">
        <div class="controls" id="calValueDiv">
            <input type="radio" name="calValue" value="1" onclick="modelCalValue(this)"/> 潜在用户（新用户） &nbsp;&nbsp;
            <input type="radio" name="calValue" value="0" onclick="modelCalValue(this)"/>非潜在用户（老用户）
        </div>
    </div>
    <div class="control-group">
        商户号：<textarea rows="3" cols="20" id="merchantNo" placeholder="商户号，用|隔开，全部为ALL"/>
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
        if (document.getElementById("merchantNo").value == "" || document.getElementById("merchantNo").value == undefined) {
            extension = "";
        } else {
            extension = "{\"jdPayDimensionMerchant\":\"" + document.getElementById("merchantNo").value + "\"}";

        }
        //调用create页新增行
        addRow();
    }

    //设置计算值
    function modelCalValue(obj) {
        calValue = obj.value;
    }

</script>