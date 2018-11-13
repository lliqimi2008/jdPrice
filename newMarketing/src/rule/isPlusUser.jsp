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
        <span>规则说明：</span><label class="control-label" id="modelRuleDesc">限制获取奖品的京东用户为京东plus会员</label>
    </div>
    <div class="control-group">
        <div class="controls" id="calValueDiv">
            <input type="radio" name="calValue" value="Y" onclick="modelCalValue(this)"/> 京东plus会员 &nbsp;&nbsp;
            <input type="radio" name="calValue" value="N" onclick="modelCalValue(this)"/> 非京东plus会员
        </div>
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
        extension = "";
        //调用create页新增行
        addRow();
    }

    function modelCalValue(obj) {
        calValue = obj.value;
    }

</script>