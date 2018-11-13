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
        <label class="control-label" id="modelDesc">指定参加活动的产品分类码</label>
    </div>
    <table style="border-collapse:separate; border-spacing:0px 10px;">
        <tr>
            <td><span>指定类型：</span></td>
            <td>
                <select id="modelLimitType" style="height: 25px;width: 174px">
                    <option value="IN">可参加活动</option>
                    <option value="NOT IN">不可参加活动</option>
                </select>
            </td>
        </tr>
        <tr>
            <td><span>产品分类码：</span></td>
            <td>
                <div id="modelCalValue">
                    <input type="checkbox" name="vehicle" value="JDPAY02" checked="checked"/>京东支付2.0在线支付
                    <input type="checkbox" name="vehicle" value="JDPAY02SYS" checked="checked"/>自营扫一扫
                    <input type="checkbox" name="vehicle" value="JDPAY02FKM" checked="checked"/>自营付款码
                    <input type="checkbox" name="vehicle" value="UNPQRSCAN" checked="checked"/>银联扫一扫
                    <input type="checkbox" name="vehicle" value="UNPQRPAY" checked="checked"/>银联付款码
                    <input type="checkbox" name="vehicle" value="JDPAY02QP" checked="checked"/>京东闪付
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
        calType = getSelectById("modelLimitType");
        noPassDesc = "";
        extension = "";
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
</script>