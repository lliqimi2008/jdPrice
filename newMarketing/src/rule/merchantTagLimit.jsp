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
        <span>规则说明：</span><label class="control-label" id="modelRuleDesc">商户标签规则</label>
    </div>
    <div class="control-group" style="margin-top: 10px">
        是否全部：
        <select id="modelCalType" style="height: 20px;width: 80px">
            <option value="0">否</option>
            <option value="1">是</option>
        </select>
    </div>
    <div class="control-group" style="margin-top: 10px">
        标签：<textarea rows="3" cols="20" id="modelCalValue" placeholder="如有多值，用竖线分割"/>
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
        calValueType = "c";
        prizeOverlay = "Y";
        status = "0";
        setExtension();
        calValue = getSelectById("modelCalType");
        //调用create页新增行
        addRow();
    }

    function setExtension() {
        var value = document.getElementById("modelCalValue").value;
        extension = "{\"tag\":\"" + value + "\",\"type\":\"ALL\"}";

    }
</script>