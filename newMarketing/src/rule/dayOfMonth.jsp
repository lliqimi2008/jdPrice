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
        <label class="control-label" id="modelDesc">限制每个月的第几日活动生效</label>

    </div>
    <span>输入字段：</span>
    <div class="control-group" style="margin-top: 10px">
        <textarea rows="3" cols="20" id="jdPayCustomerGradeCalValue" placeholder="多个日期，可用|隔开"/>
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
        calValueType = "c";
        prizeOverlay = "Y";
        status = "0";
        calType = "IN";
        extension = "";
        calValue = document.getElementById("jdPayCustomerGradeCalValue").value;
        //调用create页新增行
        addRow();
    }

</script>