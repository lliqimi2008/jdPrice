<%@ page language="java" pageEncoding="UTF-8" %>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix="fn" uri="http://java.sun.com/jsp/jstl/functions" %>
<%@ taglib prefix="fmt" uri="http://java.sun.com/jsp/jstl/fmt" %>
<%@ taglib prefix="form" uri="http://www.springframework.org/tags/form" %>
<div id="modelDiv" class="jumbotron" style="width:800px;">

    <div class="control-group">
        <span>规则名称：</span><label class="control-label" id="modelRuleName"></label>
    </div>

    <div class="control-group">
        <span>后端字段：</span><label class="control-label" id="modelField"></label>
    </div>

    <div class="control-group">
        <span>规则说明：</span>
        <label class="control-label" id="modelDesc">无</label>

    </div>
    <div class="control-group">
        规则类型：
        <select id="modelRuleType" style="height: 25px;width: 130px" >
            <option value="01">01</option>
            <option value="02">02</option>
            <option value="03">03</option>
        </select>


        字段来源：
        <select id="modelFieldSource" style="height: 25px;width: 130px">
            <option value="I">内部</option>
            <option value="O">外部</option>
        </select>
    </div>
    <div class="control-group" style="margin-top: 10px">
        计算类型：
        <select id="modelCalType" style="height: 25px;width: 130px">
            <option value=">=">>=</option>
            <option value=">">></option>
            <option value="==">==</option>
            <option value="<"><</option>
            <option value="<="><=</option>
            <option value="c">c</option>
            <option value="n">n</option>
            <option value="IN">IN</option>
            <option value="NOT IN">NOT IN</option>
        </select>
        &nbsp;&nbsp;计算值：&nbsp;&nbsp;&nbsp;<input type="text" id="modelCalValue" style="height: 25px;width: 130px"/>
        计算值类型：
        <select id="modelCalValueType" style="height: 25px;width: 130px">
            <option value="1">1</option>
            <option value="c">c</option>
            <option value="n">n</option>
        </select>
    </div>
    <div class="control-group" style="margin-top: 10px">
        扩展：
    </div>
    <div class="control-group" style="margin-top: 10px">
        <textarea rows="3" cols="20" id = "modelExtension" placeholder="按需填写"/>
    </div>
    <button type="button" class="btn btn-model center-block" onclick="addRowBefore()">添加</button>
</div>
<script type="text/javascript">
    //初始执行
    document.getElementById("modelRuleName").innerText = ruleName;
    document.getElementById("modelField").innerText = field;

    function addRowBefore() {
        ruleType=getSelectById("modelRuleType");
        fieldSource=getSelectById("modelFieldSource");
        calType=getSelectById("modelCalType");
        calValue=document.getElementById("modelCalValue").value;
        calValueType=getSelectById("modelCalValueType");
        prizeOverlay = "Y";
        status = "0";
        extension=document.getElementById("modelExtension").value;
        addRow();
    }


</script>