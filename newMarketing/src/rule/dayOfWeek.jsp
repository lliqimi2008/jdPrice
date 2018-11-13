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
        <label class="control-label" id="modelDesc">限制一个自然周中的某一天或几天活动生效</label>

    </div>
    <div class="control-group" id="modelCheckbox">
        选择周期：
        <input type="checkbox" name="vehicle" value="1" checked="checked"/>周一
        <input type="checkbox" name="vehicle" value="2" checked="checked"/>周二
        <input type="checkbox" name="vehicle" value="3" checked="checked"/>周三
        <input type="checkbox" name="vehicle" value="4" checked="checked"/>周四
        <input type="checkbox" name="vehicle" value="5" checked="checked"/>周五
        <input type="checkbox" name="vehicle" value="6" checked="checked"/>周六
        <input type="checkbox" name="vehicle" value="7" checked="checked"/>周日

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
        changeLevel();
        //调用create页新增行
        addRow();
    }

    /**
     * 获取维度
     */
    function changeLevel() {
        var length = document.getElementById("modelCheckbox").children.length;
        calValue = "";
        for (var i = 0; i < length; i++) {
            var isChecked = document.getElementById("modelCheckbox").children[i].checked;
            if (isChecked) {
                var value = document.getElementById("modelCheckbox").children[i].value;
                calValue = calValue + value + "|";
            }
        }
        calValue = calValue.substr(0, calValue.length - 1);
    }
</script>