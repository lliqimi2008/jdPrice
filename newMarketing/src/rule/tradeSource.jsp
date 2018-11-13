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
        <label class="control-label" id="modelDesc">限制能参加活动的交易订单使用京东支付的来源端</label>
    </div>
    <table style="border-collapse:separate; border-spacing:0px 10px;">
        <tr>
            <td style="width: 80px"><span>交易来源：</span></td>
            <td>
                <div id="calValue">
                    <input type="checkbox" name="vehicle" value="JDPAY_PC"/>京东支付PC端
                    <input type="checkbox" name="vehicle" value="JDPAY_APP"/>京东支付APP端
                    <input type="checkbox" name="vehicle" value="JDPAY_H5"/>京东支付H5端
                    <input type="checkbox" name="vehicle" value="JDPAY_JD_APP"/>京东APP端
                    <input type="checkbox" name="vehicle" value="JDPAY_JR_APP"/>金融APP端
                    <input type="checkbox" name="vehicle" value="JDPAY_QB_APP"/>京东钱包APP端
                    <input type="checkbox" name="vehicle" value="JDPAY_JD_H5"/>京东H5端
                    <input type="checkbox" name="vehicle" value="JDPAY_JR_H5"/>金融H5端
                    <input type="checkbox" name="vehicle" value="JDPAY_QB_H5"/>京东钱包H5端
                    <input type="checkbox" name="vehicle" value="JDPAY_WX"/>微信
                    <input type="checkbox" name="vehicle" value="JDPAY_FT"/>金融科技
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
        //ruleType = "01";
        fieldSource = "I";
        calType = "IN";
        calValueType = "c";
        prizeOverlay = "Y";
        status = "0";
        extension = "";
        setCalValue();
        addRow();
    }

    function setCalValue() {
        var length = document.getElementById("calValue").children.length;
        calValue = "";
        for (var i = 0; i < length; i++) {
            var isChecked = document.getElementById("calValue").children[i].checked;
            if (isChecked) {
                var value = document.getElementById("calValue").children[i].value;
                calValue = calValue + value + "|";
            }
        }
        calValue = calValue.substr(0, calValue.length - 1);
    }


</script>