var url="http://192.168.3.29:8082";

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

// AJAX请求统一封装（POST）
function postAjax(url, data, async) {
	var p = new promise.Promise();
	$.ajax(url, {
		data: data,
		dataType: 'json', // 服务器返回json格式数据
		type: 'post', // HTTP请求类型
		timeout: 10000, // 超时时间设置为10秒；
		async: async,
		success: function(result) {
			if ("00000" == result.code) {
				result.success = true;
			} else {
				alert(result.msg);
				window.location.href = "Login.html";
				return;
			}
			p.done(result);
		},
		error:function(xhr,type,errorThrown) {
			// 异常处理
			if(url.indexOf("login") >0){
				alert("账号或密码错误！");	
			}else{
				alert('网络异常！');
			}
		}
	});
	return p;
}


function isEmpty(value) {
	if (value == null || value == undefined || value == '' || value == 'null' || value == 'undefined') {
		return true;
	}
	return false;
}

function getPagerData(data, i) {
	// 获取当前页大小
	data.row = $("#row").val();
	// 获取当前页
	if (i == 0) {
		data.page = 1;
		$("#page").val(1);
	} else if (i == 1) {
		data.page = parseInt($("#page").val()) - 1;
	} else if (i == 2) {
		data.page = parseInt($("#page").val()) + 1;
	} else if (i == 3) {
		data.page = $("#currentpage").val();
	} else if (i == 4) {
		if ($("#page").val() != 0) {
			data.page = $("#page").val();
		}
	}
}

/*获取url的参数*/
function getUrlParam(id) {
      var reg = new RegExp("(^|&)" + id + "=([^&]*)(&|$)"); //构造一个含有目标参数的正则表达式对象
      var r = window.location.search.substr(1).match(reg); //匹配目标参数
     
      if (r != null){
      	return unescape(r[2]);
      }else{
      	return null; //返回参数值
      }  
}

/*给下拉菜单传值方法*/
function select(dom,data){
	$(dom).children().each(function(i,n){
		if(n.value==data){
			$(n).attr("selected","selected");
		}
	});
}
/*毫秒值转成日期 */
 function getMyDate(str){
 			var arr=new Array();
            var oDate = new Date(str);
            oYear = oDate.getFullYear();  
            oMonth = oDate.getMonth()+1;  
            oDay = oDate.getDate();
            arr[0]=oYear+'';
            arr[1]=oMonth+'';
            arr[2]=oDay+'';
            return arr;  
}

function emptyPager(listName) {
	$(".nav-paging").html(null);
	$("." + listName).html("<tr><td colspan='12' style='padding: 10px;'>暂无数据！</td></tr>");
}

function setPagerData(result) {
	$("#row").val(result.body.size);
	$("#page").val(result.body.page);
	$(".nav-paging").html(template("nav-paging", result));
}

/*创建图片并放入div*/
function creatPic(dom,data){
	if(!isEmpty(data)){
		$(dom).append("<img src="+data +">");
	}
}    