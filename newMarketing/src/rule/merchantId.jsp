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
        <span>规则说明：</span><label class="control-label" id="modelRuleDesc">限制此张优惠券使用的商户号，如京东商城常用商户号：<br>
        JD_PC_00（商城pc端实物）<br>
        JD_PC_01（商城pc端虚拟）<br>
        JD_APP_00（商城APP端实物）<br>
        JD_APP_01（商城APP端虚拟）</label>
    </div>
    <table style="border-collapse:separate; border-spacing:0px 10px;">
        <tr>
            <td><span>验证类型：</span></td>
            <td>
                <select id="calType" style="height: 25px;width: 174px">
                    <option value="IN">属于</option>
                    <option value="NOT IN">不属于</option>
                </select>
            </td>
        </tr>

    </table>
    <div class="control-group">
        <span>验证对象：</span>
        <textarea rows="3" cols="20" id="calValue" placeholder="如有多值，用竖线分割"/>
    </div>

    <button type="button" class="btn btn-default center-block" onclick="addRowBefore()">添加</button>
</div>
<script type="text/javascript">
    //初始执行
    document.getElementById("modelRuleName").innerText = ruleName;
    document.getElementById("modelField").innerText = field;

    function addRowBefore() {
        //ruleType = "03";
        fieldSource = "O";
        calType = getSelectById("calType")
        calValue = document.getElementById("calValue").value;
        calValueType = "c";
        prizeOverlay = "Y";
        status = "0";
        noPassDesc = "";
        extension = "";
        //调用create页新增行
        addRow();
    }

</script>