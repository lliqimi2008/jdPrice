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
        <label class="control-label" id="modelDesc">限制此张优惠券使用的业务，目前支持的业务如下：</label>
    </div>
    <table style="border-collapse:separate; border-spacing:0px 10px;">
        <tr>
            <td><span>业务限制：</span></td>
            <td>
                <select id="modelLimitType" style="height: 25px;width: 174px" onchange="changeModelCalValue()">
                    <option value="merchantId" onclick="changeModelCalValue(1)">生活业务</option>
                    <option value="outOrderType" onclick="changeModelCalValue(2)">手机充值业务</option>
                    <option value="productType" onclick="changeModelCalValue(3)">扫码付业务</option>
                </select>
            </td>
        </tr>
        <tr>
            <td></td>
            <td>
                <div id="modelCalValue">
                    <input type="checkbox" name="vehicle" value="23050417|110617365001" checked="checked"/>信用卡还款
                    <input type="checkbox" name="vehicle" value="110179364001|110048914003|110204544001"
                           checked="checked"/>惠加油
                </div>
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
        //ruleType = "03";
        fieldSource = "O";
        calValueType = "c";
        prizeOverlay = "Y";
        status = "0";
        calType = "IN";
        noPassDesc = "";
        extension = "";
        field = getSelectById("modelLimitType");
        setCalValue();
        //调用create页新增行
        addRow();
    }

    function setCalValue() {
        var length = document.getElementById("modelCalValue").children.length;
        calValue = "";
        for (var i = 0; i < length; i++) {
            var isChecked = document.getElementById("modelCalValue").children[i].checked;
            if (isChecked) {
                var value = document.getElementById("modelCalValue").children[i].value;
                calValue = calValue + value + "|";
            }
        }
        calValue = calValue.substr(0, calValue.length - 1);
    }

    function changeModelCalValue() {
        document.getElementById('modelCalValue').innerHTML = "";
        if ("merchantId" == getSelectById("modelLimitType")) {
            document.getElementById('modelCalValue').innerHTML = " <input type=\"checkbox\" name=\"vehicle\" value=\"23050417|110617365001\" checked=\"checked\" />信用卡还款\n" +
                "                    <input type=\"checkbox\" name=\"vehicle\" value=\"110179364001|110048914003|110204544001\" checked=\"checked\" />惠加油";
        }
        if ("outOrderType" == getSelectById("modelLimitType")) {
            document.getElementById('modelCalValue').innerHTML = " <input type=\"checkbox\" name=\"vehicle\" value=\"37\" checked=\"checked\" />话费充值\n" +
                "                    <input type=\"checkbox\" name=\"vehicle\" value=\"87\" checked=\"checked\" />流量充值";
        }
        if ("productType" == getSelectById("modelLimitType")) {
            document.getElementById('modelCalValue').innerHTML = " <input type=\"checkbox\" name=\"vehicle\" value=\"JDPAY02FKM\" checked=\"checked\" />付款码\n" +
                "                    <input type=\"checkbox\" name=\"vehicle\" value=\"JDPAY02SYS\" checked=\"checked\" />扫一扫";
        }

    }
</script>