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
        <label class="control-label" id="modelDesc">闪付新激活用户</label>

    </div>
    <div class="control-group" style="margin-top: 10px">
        限制类型：
        <select id="modelLimitType" style="height: 25px;width: 130px">
            <option value=">=">大于等于</option>
            <option value=">">大于</option>
            <option value="==">等于</option>
            <option value="<">小于</option>
            <option value="<=">小于等于</option>
        </select>
        <input type="text" id="modelCalValue" style="height: 25px;width: 130px" placeholder="-数值-"/>
    </div>
    <div class="control-group" style="margin-top: 10px">
        时间精度：
        <input type="text" id="modelTime" style="height: 25px;width: 130px" placeholder="-数值-"/>
        <select id="modelTimeUnit" style="height: 25px;width: 130px">
            <option value="minute">分钟</option>
            <option value="second">秒</option>
        </select>
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
        calValue = document.getElementById("modelCalValue").value;
        setExtension();
        //调用create页新增行
        addRow();

    }

    function setExtension() {
        var timeInaccuracyBase = "{\"timeInaccuracy\":";
        var timeUnitBase = ",\"timeUnit\":";
        var timeInaccuracy = document.getElementById("modelTime").value;
        var timeUnit = getSelectById("modelTimeUnit");
        if (timeInaccuracy == "" || timeInaccuracy == undefined) {
            timeInaccuracyBase = timeInaccuracyBase + "\"\"";
        } else {
            timeInaccuracyBase = timeInaccuracyBase + "\"" + timeInaccuracy + "\"";
        }

        extension = timeInaccuracyBase + timeUnitBase + "\"" + timeUnit + "\"}";

    }


</script>