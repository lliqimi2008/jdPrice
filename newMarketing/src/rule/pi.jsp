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
        <label class="control-label" id="modelDesc">限制参加活动的支付pi类型</label>
    </div>
    <table style="border-collapse:separate; border-spacing:0px 10px;">
        <tr>
            <td><span>pi类型：</span></td>
            <td>
                <div id="modelCalValue">
                    <input type="checkbox" name="vehicle" value="ExpressCardPI"/>快捷银行卡支付
                    <input type="checkbox" name="vehicle" value="XjkPI"/>小金库支付
                    <input type="checkbox" name="vehicle" value="JCaiPI"/>金采
                    <input type="checkbox" name="vehicle" value="JIOUPI"/>打白条(白条不分期+白条分期)
                    <input type="checkbox" name="vehicle" value="JIOU2PI"/>白条不分期
                    <input type="checkbox" name="vehicle" value="JIOU3PI"/>白条分期
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