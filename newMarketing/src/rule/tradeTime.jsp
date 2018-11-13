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
        <label class="control-label" id="modelDesc">限制一天内某个时间段活动生效，多用于抢券，秒杀类活动</label>

    </div>
    <div class="control-group" style="margin-top: 10px">
        <span>时间周期：</span>
        <input type="text" id="beginTime" style="height: 25px;width: 130px" placeholder="00:00:00"/>
        <span>至</span>
        <input type="text" id="endTime" style="height: 25px;width: 130px" placeholder="23:59:59"/>
    </div>
    <button type="button" class="btn btn-default center-block" onclick="addRowBefore()">添加</button>
</div>
<script type="text/javascript">
    //初始执行
    document.getElementById("modelRuleName").innerText = ruleName;
    document.getElementById("modelField").innerText = field;

    function addRowBefore() {
        //ruleType = "01";
        fieldSource = "O";
        calValueType = "c";
        prizeOverlay = "Y";
        status = "0";
        extension = "";

        //插入开始时间规则
        calType = ">=";
        calValue = document.getElementById("beginTime").value;
        addRow();
        //插入结束时间规则
        calType = "<=";
        calValue = document.getElementById("endTime").value;
        addRow();
    }


</script>