<%@ page language="java" pageEncoding="UTF-8" %>
<%@ page import="com.jdpay.market.bpm.api.dto.FormPropertyDto" %>
<%@ page import="com.jdpay.market.bpm.api.dto.FormTypeDto" %>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix="fn" uri="http://java.sun.com/jsp/jstl/functions" %>
<%@ taglib prefix="fmt" uri="http://java.sun.com/jsp/jstl/fmt" %>
123123
<c:if test="${not empty comments}">
    <div class="control-group">
        <label class="control-label">历史审核意见:</label>
        <div class="controls">
            <dl>
                <c:forEach items="${comments}" var="comment">
                    <dt id="task-${comment.taskId}">${taskMap[comment.taskId].name}</dt>
                    <dd><b>　操作人:　</b>${userMap[comment.userId].firstName}</dd>
                    <dd><b>操作时间:　</b><fmt:formatDate value="${comment.time}" pattern="yyyy-MM-dd HH:mm:ss"/> </dd>
                    <dd><b>备注内容:　</b><pre width="100px">${comment.fullMessage}</pre></dd>
                </c:forEach>
            </dl>
        </div>
    </div>
    <hr/>
</c:if>
