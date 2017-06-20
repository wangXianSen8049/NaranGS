window.onload=function(){
	//通过window.screen.width获取屏幕的宽度
	var width=$(document.body).outerWidth(true);
    var offWidth =width /1920*100; 
    $("html").css("font-size",offWidth);//把rem的值复制给顶级标签html的font-size
        
	/*屏幕改变事件— 修改html font-size大小*/
	window.onresize = function(){
		var width=$(document.body).outerWidth(true);
        var offWidth =width /1920*100;
         $("html").css("font-size",offWidth);
  	}


}

function del(ben,farmId){
	if(confirm("您好，您确定要删除？")){
		
		var url="http://192.168.3.29:8082/web/third/platform/farm/del/"+farmId;
		$.ajax({
	        type: "post",
	        dataType:"json",
	        url: url,
	        data:{farmId:farmId},
	        success: function (data) {
	        	window.location.reload()
	        },
	        error: function(){
				alert("提交失败！");
			}
	    });
	}
	//实现序号顺序排列
    var len = $('table tr').length;
    for(var i = 1;i<len;i++){
        $('table tr:eq('+i+') td:first').text(i);
    }	
            
	
}

/*分页实现*/
var page_num=1;
$(function(){
	  $('.pagingUl').children("li").each(function(index){
		$(this).on('click',function(){
			page_num=$(this).text();
			$(".pagingUl li").css({"background-color":"#FFFFFF","color":"black"});
			$(".pagingUl li").eq($(this).index()).css({"background-color":"#00a780","color":"#fff"});
			$("tr").nextAll().remove();
			data(page_num);
		})
	  })
	 data(page_num);
	})

/*ajax请求数据*/
function data(page_num){
	var url="http://192.168.3.29:8082/web/third/platform/farm/list";
	$.ajax({
        type: "post",
        dataType: "json",
        url: url,
        data:{page:page_num,row:10},
        success: function (data) {
        	console.log(data);
           creat(data);
        }
    });
};
/**
 * 
 * @param 创建表格 回填数据
 */
function creat(data){
	$.each(data.body.list, function(id, obj) {
		var auditStatus=tai(obj);
		var colo=color(obj);
	    var $dom=$(
	    	"<tr>"+
	  			"<td></td>"+
	  			"<td>"+obj.farmName+"</td>"+
	  			"<td style=color:"+colo+">"+auditStatus+"</td>"+
	  			"<td>"+
	  				"<a href='Auditing.html?farmId="+obj.farmId+"'>审核</a>"+
	  			"</td>"+
  			"</tr>"); 
		$("table").append($dom);
		
	});
	xuhao();//实现初始序号顺序排列
}
function color(obj){
	if(obj.auditStatus==0){
		return '#5699E8;'
	}else if(obj.auditStatus==1){
		return '#00A780;'
	}else{
		return '#999999;'
	}
}
function tai(obj){
	if(obj.auditStatus==0){
		return "审核中";
	}else if(obj.auditStatus==1){
		return "审核通过";
	}else{
		return "审核失败";
	}
}
//实现初始序号顺序排列
function xuhao(){
    var len = $('table tr').length;
    for(var i = 1;i<len;i++){
        $('table tr:eq('+i+') td:first').text(i);
    }
            
};
