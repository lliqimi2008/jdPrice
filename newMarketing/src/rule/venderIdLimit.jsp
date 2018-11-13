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
        <label class="control-label" id="modelDesc">满足商家ID的商品的金额总和</label>

    </div>
    <table style="border-collapse:separate; border-spacing:0px 10px;">
        <tr>
            <td><span>指定商品金额限制：</span></td>
            <td>
                <select id="modelLimitType" style="height: 25px;width: 172px">
                    <option value=">=">大于等于</option>
                    <option value=">">大于</option>
                    <option value="==">等于</option>
                    <option value="<">小于</option>
                    <option value="<=">小于等于</option>
                </select>
            </td>
            <td>
                <input type="text" id="modelCalValue" style="height: 25px;width: 130px" placeholder="数值(元)"/>
            </td>
        </tr>
        <tr>
            <td><span>导入商家ID类型：：</span></td>
            <td>
                <select id="merchantType" style="height: 25px;width: 174px">
                    <option value="shopIdIn">属于</option>
                    <option value="shopIdAllIn">全都属于</option>
                    <option value="shopIdNotIn">不属于</option>
                    <option value="shopIdAllNotIn">全不属于</option>
                </select>
            </td>
        </tr>
    </table>
    <div class="control-group">
        <span>限制具体商品范围：</span>
        <textarea rows="3" cols="20" id="productLimit" placeholder="输入商家id编码，用竖线分割"/>
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
        calValueType = "n";
        prizeOverlay = "Y";
        status = "0";
        calType = getSelectById("modelLimitType");
        calValue = document.getElementById("modelCalValue").value;
        noPassDesc = "";
        setExtension();
        //调用create页新增行
        addRow();
    }

    function setExtension() {
        extension = "{\"" + getSelectById("merchantType") + "\":\"" + document.getElementById("productLimit").value + "\"}";

    }
</script>