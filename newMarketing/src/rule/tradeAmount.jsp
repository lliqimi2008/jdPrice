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
        <label class="control-label" id="modelDesc">指定可以参加活动的订单交易金额</label>

    </div>
    <div class="control-group">
        <span>限制类型：</span>
        <select id="modelLimitType" style="height: 25px;width: 130px">
            <option value=">=">大于等于</option>
            <option value=">">大于</option>
            <option value="==">等于</option>
            <option value="<">小于</option>
            <option value="<=">小于等于</option>
        </select>
        <input type="text" id="modelCalValue" style="height: 25px;width: 130px" placeholder="数值(元)"/>
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
        calValueType = "n";
        prizeOverlay = "Y";
        status = "0";
        calType = getSelectById("modelLimitType");
        calValue = document.getElementById("modelCalValue").value;
        extension = "";
        noPassDesc = "";
        //调用create页新增行
        addRow();
    }
</script>