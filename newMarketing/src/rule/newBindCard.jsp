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
        <span>规则说明：</span><label class="control-label" id="modelRuleDesc">指定绑卡用户领取，如果用户没有绑卡引导用户绑卡再领券</label>
    </div>
    <table style="border-collapse:separate; border-spacing:0px 10px;">
        <tr>
            <td><span>指定最早绑卡时间：</span></td>
            <td>
                <input type="text" id="bindTime" placeholder="yyyy-mm-dd HH:MM:SS"/>
            </td>
        </tr>
        <tr>
            <td><span>银行编码：</span></td>
            <td>
                <input type="text" id="bankCode"/>
            </td>
        </tr>
        <tr>
            <td><span>卡类型：</span></td>
            <td>
                <select id="cardType" style="height: 25px;width: 174px">
                    <option value="2">信用卡</option>
                    <option value="1">借记卡</option>
                </select>
            </td>
        </tr>
        <tr>
            <td><span>h5跳转链接source：</span></td>
            <td>
                <input type="text" id="h5Source"/>
            </td>
        </tr>
        <tr>
            <td><span>h5跳转链接RezType：</span></td>
            <td>
                <input type="text" id="h5RezType"/>
            </td>
        </tr>
        <tr>
            <td><span>h5跳转链接from：</span></td>
            <td>
                <input type="text" id="h5From"/>
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
        calType = "==";
        calValue = "1";
        calValueType = "c";
        prizeOverlay = "Y";
        status = "0";
        noPassDesc = document.getElementById("noPassDesc").value;
        setExtension();
        //调用create页新增行
        addRow();
    }

    function setExtension() {
        var h5Source = document.getElementById("h5Source").value;
        var h5RezType = document.getElementById("h5RezType").value;
        var h5From = document.getElementById("h5From").value;
        var cardType = getSelectById("cardType");
        var bankCode = document.getElementById("bankCode").value;
        var bindTime = document.getElementById("bindTime").value;
        //{"h5Source":"1","h5RezType":"2","h5From":"3","cardType":"1","bankCode":"4332233","bindTime":">2018-04-18 00:00:00"}
        extension = "{\"h5Source\":\"" + h5Source + "\",\"h5RezType\":\"" + h5RezType +
            "\",\"h5From\":\"" + h5From + "\",\"cardType\":\"" + cardType +
            "\",\"bankCode\":\"" + bankCode + "\",\"bindTime\":\">" + bindTime + "\"}";

    }
</script>