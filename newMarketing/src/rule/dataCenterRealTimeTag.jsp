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
        <span>规则说明：</span><label class="control-label" id="modelRuleDesc">数据部申请实时标签，配置该规则。</label>
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
            <td><span>标签格式:</span></td>
            <td>
                <select id="tagFormat" style="height: 25px;width: 174px">
                    <option value="1">实时标签</option>
                    <option value="0">离线标签</option>
                </select>
            </td>
        </tr>
        <tr>
            <td><span>标签编码：</span></td>
            <td>
                <input type="text" id="tagCode"/>
            </td>
        </tr>
    </table>
    <div class="control-group">
        <span>标签码值：</span>
        <textarea rows="3" cols="20" id="calValue" placeholder="如有多值，用竖线分割"/>
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
        calType = getSelectById("calType")
        calValue = document.getElementById("calValue").value;
        calValueType = "c";
        prizeOverlay = "Y";
        status = "0";
        noPassDesc = "";
        setExtension();
        //调用create页新增行
        addRow();
    }

    function setExtension() {
        var tagFormat = getSelectById("tagFormat");
        var tagCode = document.getElementById("tagCode").value;
        //{"ruleType":"1","ruleId":"112121"}
        extension = "{\"ruleType\":\"" + tagFormat + "\",\"ruleId\":\"" + tagCode + "\"}";

    }
</script>