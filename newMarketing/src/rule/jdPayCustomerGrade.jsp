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
        <span>规则说明：</span><label class="control-label" id="modelRuleDesc">京东支付用户等级规则</label>
    </div>
    <div class="control-group" style="margin-top: 10px">
        屏蔽类型：
        <select id="modelCalType" style="height: 20px;width: 80px">
            <option value="IN">属于</option>
            <option value="NOT IN">不属于</option>
        </select>
    </div>
    <div class="control-group" style="margin-top: 10px">
        限制具体用户等级范围：<textarea rows="3" cols="20" id="modelCalValue" placeholder="输入用户等级，用竖线分割"/>
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
        calType = getSelectById("modelCalType");
        calValueType = "c";
        prizeOverlay = "Y";
        status = "0";
        extension = "";
        calValue = document.getElementById("modelCalValue").value;
        //调用create页新增行
        addRow();
    }

</script>