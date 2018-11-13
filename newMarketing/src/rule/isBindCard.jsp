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
        <label class="control-label" id="modelDesc">指定绑卡用户领取，不会引导绑卡。新老用户的区分是由首次绑卡时间决定，
            首次绑卡时间在指定最早绑卡时间之前为老用户</label>


    </div>
    <div class="control-group">
        <label class="control-label" id="modelDesc2">,之后的为新用户</label>
    </div>
    <table style="border-collapse:separate; border-spacing:0px 10px;">
        <tr>
            <td><span>屏蔽类型：</span></td>
            <td>
                <select id="modelLimitType" style="height: 25px;width: 174px">
                    <option value="IN">属于</option>
                    <option value="NOT IN">不属于</option>
                </select>
            </td>
        </tr>
        <tr>
            <td><span>选择用户类型：</span></td>
            <td>
                <div id="userType">
                    <input type="checkbox" name="vehicle" value="NO_CARD" checked="checked"/>没有绑过卡
                    <input type="checkbox" name="vehicle" value="NEW" checked="checked"/>新用户有绑卡
                    <input type="checkbox" name="vehicle" value="NEW_NO_CARD" checked="checked"/>新用户已解绑
                    <input type="checkbox" name="vehicle" value="OLD" checked="checked"/>老用户有绑卡
                    <input type="checkbox" name="vehicle" value="OLD_NO_CARD" checked="checked"/>老用户已解绑
                </div>
            </td>
        </tr>
        <tr>
            <td><span>最早绑卡时间：</span></td>
            <td>
                <input type="text" id="checkTime" placeholder="yyyy-mm-dd HH:MM:SS"/>
            </td>
        </tr>
        <tr>
            <td><span>银行编码：</span></td>
            <td>
                <input type="text" id="bankCode"/>
            </td>
        </tr>
        <tr>
            <td><span>卡bin：</span></td>
            <td>
                <input type="text" id="cardBins"/>
            </td>
        </tr>
        <tr>
            <td><span>卡类型：</span></td>
            <td>
                <select id="cardType" style="height: 25px;width: 174px">
                    <option value="">不限制</option>
                    <option value="2">信用卡</option>
                    <option value="1">借记卡</option>
                </select>
            </td>
        </tr>
        <tr>
            <td><span>规则不通过提示文案：</span></td>
            <td>
                <input type="text" id="noPassDesc"/>
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
        //ruleType = "01";
        fieldSource = "I";
        calValueType = "c";
        prizeOverlay = "Y";
        status = "0";
        calType = getSelectById("modelLimitType");
        noPassDesc = document.getElementById("noPassDesc").value;
        // extension = "{\"dimension\":\"jdPin|uuid|phone|idNo|bankCardNo|customerId\"}";
        setCalValue();
        setExtension();
        //调用create页新增行
        addRow();
    }

    function setCalValue() {
        var length = document.getElementById("userType").children.length;
        calValue = "";
        for (var i = 0; i < length; i++) {
            var isChecked = document.getElementById("userType").children[i].checked;
            if (isChecked) {
                var value = document.getElementById("userType").children[i].value;
                calValue = calValue + value + "|";
            }
        }
        calValue = calValue.substr(0, calValue.length - 1);
    }

    function setExtension() {
        //{"checkTime":"2018-04-28 00:00:00","cardType":"1","bankCode":"6","cardBins":"7"}
        var checkTime = document.getElementById("checkTime").value;
        var cardType = getSelectById("cardType");
        var bankCode = document.getElementById("bankCode").value;
        var cardBins = document.getElementById("cardBins").value;
        extension = "{\"checkTime\":\"" + checkTime;
        if (cardType == "" || cardType == undefined) {
            extension = extension + "\",\"bankCode\":\"" + bankCode + "\",\"cardBins\":\"" + cardBins + "\"}";
        } else {
            extension = extension + "\",\"cardType\":\"" + cardType + "\",\"bankCode\":\"" + bankCode + "\",\"cardBins\":\"" + cardBins + "\"}";
        }

    }

</script>