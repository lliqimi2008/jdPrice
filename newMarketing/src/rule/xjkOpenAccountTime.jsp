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
        <label class="control-label" id="modelDesc">校园白条限制规则</label>

    </div>
    <table style="border-collapse:separate; border-spacing:0px 10px;">
        <tr>
            <td><span>开通小金库：</span></td>
            <td>
                <select id="modelCalType" style="height: 25px;width: 180px">
                    <option value=">=">大于等于</option>
                    <option value="<=">小于等于</option>
                </select>
            </td>
        </tr>
        <tr>
            <td><span>开户开始时间：</span></td>
            <td>
                <input type="text" id="modelCalValue" style="height: 25px;width: 180px"
                       placeholder="yyyy-mm-dd HH:MM:SS"/>
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
        calType = getSelectById("modelCalType");
        calValue = document.getElementById("modelCalValue").value;
        extension = "";
        //调用create页新增行
        addRow();
    }


</script>