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
        <label class="control-label" id="modelDesc">限制获取奖品的京东用户的会员等级</label>

    </div>
    <div class="control-group" id="modelCheckbox">
        用户等级：
        <input type="checkbox" name="vehicle" value="-1" checked="checked"/>非京东会员
        <input type="checkbox" name="vehicle" value="50" checked="checked"/>注册会员
        <input type="checkbox" name="vehicle" value="56" checked="checked"/>铜牌会员
        <input type="checkbox" name="vehicle" value="61" checked="checked"/>银牌会员
        <input type="checkbox" name="vehicle" value="62" checked="checked"/>金牌会员
        <input type="checkbox" name="vehicle" value="105" checked="checked"/>钻石用户
        <input type="checkbox" name="vehicle" value="110" checked="checked"/>VIP用户

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