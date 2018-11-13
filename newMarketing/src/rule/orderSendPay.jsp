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
        <span>规则说明：</span><label class="control-label" id="modelRuleDesc">指定活动屏蔽或者要求的订单类型</label>
    </div>
    <table style="border-collapse:separate; border-spacing:0px 10px;">
        <tr>
            <td><span>屏蔽类型：</span></td>
            <td>
                <select id="calType" style="height: 25px;width: 174px">
                    <option value="IN">属于</option>
                    <option value="NOT IN">不属于</option>
                </select>
            </td>
        </tr>
        <tr>
            <td><span>订单类型：</span></td>
            <td>
                <select id="calValue" style="height: 25px;width: 174px">
                    <option value="8|6">全球购订单</option>
                    <option value="92|1">节能减排订单</option>
                    <option value="101|1">开普勒订单</option>
                    <option value="103|1">SDK开普勒订单</option>
                    <option value="103|2">m站开普勒订单</option>
                </select>
            </td>
        </tr>
    </table>
    <button type="button" class="btn btn-default center-block" onclick="addRowBefore()">添加</button>
</div>
<script type="text/javascript">
    //初始执行
    document.getElementById("modelRuleName").innerText = ruleName;
    document.getElementById("modelField").innerText = field;

    function addRowBefore() {
        ruleType = "01";
        fieldSource = "I";
        calType = getSelectById("calType")
        calValueType = "n";
        prizeOverlay = "Y";
        status = "0";
        noPassDesc = "";
        setCalValueAndExtension();
        //调用create页新增行
        addRow();
    }

    function setCalValueAndExtension() {
        var calValueAndExtension = getSelectById("calValue");
        var calValueAndExtensionArray = calValueAndExtension.split("|");
        calValue = calValueAndExtensionArray[1];
        //{"sendPayIndex":"101"}
        extension = "{\"sendPayIndex\":\"" + calValueAndExtensionArray[0] + "\"}"

    }
</script>