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
        <span>规则说明：</span><label class="control-label" id="modelRuleDesc">设定指定时间内首次登录的用户能否参加活动</label>
    </div>
    <div class="control-group" style="margin-top: 10px">

        <div class="controls" id="calValueDiv">
            <span> 选择限制方式：</span>
            <input type="radio" name="calValue" value="1" onclick="modelCalValue(this)"/> 指定时间内首次登录 &nbsp;&nbsp;
            <input type="radio" name="calValue" value="0" onclick="modelCalValue(this)"/> 指定时间内非首次登录
        </div>
    </div>
    <div class="control-group" style="margin-top: 10px">
        指定时间开始时间：<input type="text" id="modelSilentBeginTime" style="height: 25px;width: 130px"
                        placeholder="格式：yyyymmdd"/>
    </div>
    <div class="control-group" style="margin-top: 10px">
        指定时间结束时间：<input type="text" id="modelSilentEndTime" style="height: 25px;width: 130px"
                        placeholder="格式：yyyymmdd"/>
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
        var beginBase = "{\"begin\":";
        var endBase = ",\"end\":";
        var begin = document.getElementById("modelSilentBeginTime").value;
        var end = document.getElementById("modelSilentEndTime").value;
        if (begin == "" || begin == undefined) {
            beginBase = beginBase + "\"\"";
        } else {
            beginBase = beginBase + "\"" + begin + "\"";
        }

        if (end == "" || end == undefined) {
            endBase = endBase + "\"\"}";
        } else {
            endBase = endBase + "\"" + end + "\"}";
        }
        extension = beginBase + endBase;

    }
</script>