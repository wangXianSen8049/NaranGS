function login(){
	var data={}
	data.username=$("#username").val();
	data.password=hex_md5($("#password").val());
	/*postAjax(url+"/web/third/platform/login", data,true).then(function(result) {
		if (result.success) {
			console.log(result);
			user(result.body);
			window.location.href = 'Producer_list.html';
		} else {
			alert("账号密码错误！");
		}
	});*/
	if(data.username&&data.password){
		window.location.href = 'Producer_list.html';
	}
}
function user(value){
	var obj={};
	obj.accessToken=value.accessToken;
	obj.userId=value.userId;
	var data=JSON.stringify(obj);
	$.cookie("usermsg",data,{expires:7,path: '/' });
	
}
$(function(){ 
	$(document).keydown(function(event){ 
		if(event.keyCode==13){ 
			login();
		}
	})
}); 

