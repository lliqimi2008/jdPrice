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
        <span>规则说明：</span><label class="control-label" id="modelRuleDesc">用户能获得的最大数量</label>
    </div>
    <div class="control-group">
        &nbsp;&nbsp;数&nbsp;&nbsp;量：&nbsp;&nbsp;&nbsp;&nbsp;<input type="text" id="modelCalValue"/>
    </div>
    <button type="button" class="btn btn-default center-block" onclick="addRowBefore()">添加</button>
</div>
<script type="text/javascript">
    //初始执行
    document.getElementById("modelRuleName").innerText = ruleName;
    document.getElementById("modelField").innerText = field;

    function addRowBefore() {
        //ruleType = "02";
        fieldSource = "I";
        calType = "<";
        calValueType = "n";
        prizeOverlay = "Y";
        status = "0";
        extension = "{\"dimension\":\"jdPin|uuid|phone|idNo|bankCardNo|customerId\"}";
        calValue = document.getElementById("modelCalValue").value;
        //调用create页新增行
        addRow();
    }

</script>