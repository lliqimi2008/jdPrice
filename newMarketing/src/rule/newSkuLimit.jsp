<%@ page language="java" pageEncoding="UTF-8" %>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix="fn" uri="http://java.sun.com/jsp/jstl/functions" %>
<%@ taglib prefix="fmt" uri="http://java.sun.com/jsp/jstl/fmt" %>
<%@ taglib prefix="form" uri="http://www.springframework.org/tags/form" %>
<script type="text/javascript" src="${ctx }/lib/jquery.form.js"></script>
<div id="modelDiv" class="jumbotron" style="width:800px;">

    <div class="control-group">
        <span>规则名称：</span><label class="control-label" id="modelRuleName"></label>
    </div>

    <div class="control-group">
        <span>后端字段：</span><label class="control-label" id="modelField"></label>
    </div>

    <div class="control-group">
        <span>规则说明：</span>
        <label class="control-label" id="modelDesc">满足活动要求的sku的商品的金额总和</label>

    </div>
    <table style="border-collapse:separate; border-spacing:0px 10px;">
        <tr>
            <td> <span>自营限制:</span></td>
            <td>
                <input type="text" id="dataType" style="height: 25px;width: 130px"/>
            </td>

        </tr>

        <tr>
            <td> <span>屏蔽类型：</span></td>
            <td>
                <select id="filterType" style="height: 25px;width: 130px">
                    <option value="IN">属于</option>
                    <option value="NOT IN">不属于</option>
                </select>
            </td>
        </tr>

        <tr id="skuAmount">
            <td><span>制定商品金额限制：</span></td>
            <td>
                <select id="calType" style="height: 25px;width: 130px">
                    <option value=">=">大于等于</option>
                    <option value=">">大于</option>
                    <option value="==">等于</option>
                    <option value="<">小于</option>
                    <option value="<=">小于等于</option>
                </select>
                <input type="text" id="calValue" style="height: 25px;width: 130px"/>
            </td>
        </tr>

        <tr>
            <td> <span>导入商品类型：</span></td>
            <td>
                <select id="GoodsType" style="height: 25px;width: 130px">
                    <option value="cid">三级品类</option>
                    <option value="skuId">skuId</option>
                    <option value="secondCid">二级品类</option>
                </select>
            </td>
        </tr>

        <tr>
            <td> <span>限制具体商品范围：</span></td>
            <td>
                <textarea rows="3" cols="20" id = "extentionContent" placeholder="输入商品编码，用|分割"/>
            </td>
        </tr>

    </table>
    <form id = "fileupload" class="form-group fileupload" enctype="multipart/form-data" action="/activity/rule/getFileContent" method="post">
        <label class="col-md-4 control-label">导入文件：</label>
        <div class="col-md-3">
            <input type="file" name="file"  class="form-control">
        </div>
        <div class="col-md-3">
            <button type="submit" id="fileuploadsubmit">上传</button>
        </div>
    </form>
    <button type="button" class="btn btn-model center-block" onclick="addRowBefore1()">添加</button>
</div>
<script type="text/javascript">
    //初始执行
    document.getElementById("modelRuleName").innerText = ruleName;
    document.getElementById("modelField").innerText = field;

    function addRowBefore1() {
        fieldSource="I";
        calType=getSelectById("calType");
        calValue=document.getElementById("calValue").value;
        calValueType="n";
        prizeOverlay = "Y";
        status = "0";
        setExtension();
        addRow();
    }
    function setExtension() {
        var extensionTemp = {};
        var goodsType=getSelectById("GoodsType");
        var filterType=getSelectById("filterType");
        var skuType = '';
        if(filterType=="IN"){
            if(goodsType=="cid"){
                skuType='skuTypeAllIn';
            }
            if(goodsType=='skuId'){
                skuType='skuIdAllIn';
            }
            if(goodsType=='secondCid'){
                skuType='skuType2AllIn';
            }
        }else{
            if(goodsType=="cid"){
                skuType='skuTypeAllNotIn';
            }
            if(goodsType=='skuId'){
                skuType='skuIdAllNotIn';
            }
            if(goodsType=='secondCid'){
                skuType='skuType2AllNotIn';
            }
        }
        extensionTemp[skuType] = document.getElementById("extentionContent").value;
        if($('#skuAmount').is(':hidden')){
            calValue="1";
            calType=">=";
        }else{
            calValue=document.getElementById("calValue").value*100;
        }

        var dataType =document.getElementById("dataType").value;
        if (dataType != null && dataType != 'undefine' && dataType.trim() != '') {
            extensionTemp['dataType'] = dataType;
            extensionTemp['skuFilterType'] = "1";
        }
        extension=JSON.stringify(extensionTemp);
    }

    $(function () {
        $('select#filterType').on('change',function () {
            var filterTypeSku = $(this).val();
            if (filterTypeSku == 'NOT IN') {
                $('#skuAmount').hide();
            } else {
                $('#skuAmount').show();
            }
        });
    });
    $(function () {
        $('#fileupload').on('submit', function (e) {
            $("#fileuploadsubmit").attr("disabled",true);
            e.preventDefault(); // prevent native submit
            var form = $(this).ajaxSubmit({
                dataType: 'json'
            })
            var xhr = form.data('jqxhr');

            xhr.done(function (date) {
                var resp = JSON.parse(date);
                if (resp.resultCode == '00000') {
                    document.getElementById("extentionContent").value = resp.fileContent;
                }
            });
            $("#fileuploadsubmit").attr("disabled",false);
        });
    });
</script>