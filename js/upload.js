
window.onload=function(){
	/*屏幕改变事件— 修改html font-size大小*/
	window.onresize = function(){
		var width=$(document.body).outerWidth(true);
        var offWidth =width /1920*100;
         $("html").css("font-size",offWidth);
   }
	//通过window.screen.width获取屏幕的宽度
		var width=$(document.body).outerWidth(true);
        var offWidth =width /1920*100; 
        $("html").css("font-size",offWidth);//把rem的值复制给顶级标签html的font-size
    //分页实现
	
	$(".button_1").click(function(){
		if(true){
			$(".message").css("display","none");
	       	$(".yijian").css("display","none");
	       	$(".foot1").css("display","none");
	       	
	       	$(".prove").css("display","block");
	       	$(".product").css("display","block");
	       	$(".foot2").css("display","block");
	       	$('body').prop('scrollTop','0');
		}else{
			alert("请您完善信息")
		}
       
    }); 
    $(".button_2").click(function(){
    	
    		$(".message").css("display","block");
	       	$(".yijian").css("display","block");
	       	$(".foot1").css("display","block");
	       	
	       	$(".prove").css("display","none");
	       	$(".product").css("display","none");
	       	$(".foot2").css("display","none");
	       	$('body').prop('scrollTop','0');
    });
    $(".button_3").click(function(){ 
    	if(true){
    		$(".huanjing").css("display","block");
	       	$(".foot3").css("display","block");
	       
	       
	       	$(".prove").css("display","none");
	      	$(".product").css("display","none");
	      	$(".foot2").css("display","none");
	      	$('body').prop('scrollTop','0');
	    }else{
	    	alert("请您完善信息")
	    }
	    	
    });
    $(".button_4").click(function(){ 
       $(".prove").css("display","block");
       $(".product").css("display","block");
       $(".foot2").css("display","block");
       
       $(".huanjing").css("display","none");
       $(".foot3").css("display","none");
       $('body').prop('scrollTop','0');
    });
	/*  增加,删除操作 文件提交 */
	var index = 1;//用于区分
	$(".add_1").click(function(){ 
		var b = "a"+index;
		var upfile="upfile"+b;
		var dian="dian"+b;
		var path="path"+b;
		var form="form"+b;
		var text="text"+b;
		var otherReport="otherReport"+b;
		var $li = $("<div class='li'>"+
						"<a  size='20' name='upfile' id="+upfile+" class='upfile'>未选择任何文件</a><input type='button' id="+dian+" class='dian' value='浏览' onclick='"+path+".click()'>"+
						"<input type='hidden' id="+otherReport+" name="+otherReport+" value=''/><input type='text' id="+text+">"+
					"</div>");
		var $parent = $(".other");
		$parent.append($li);
		var form_ ="#"+form; 
		var upfile_ ="#"+upfile; 
		var path_ ="#"+path; 
		var otherReport_="#"+otherReport
		var $form=$("<form id="+form+" action='javascript:up_1' method= 'post' enctype ='multipart/form-data' style='display: none;'>"+
						"<input type='file' accept='.doc,.pdf' id="+path+" name="+path+" class='path' onchange=\"upfile(\'"+form_+"\',\'"+upfile_+"\',\'"+path_+"\',\'"+otherReport_+"\')\"/>"+
					"</form>");
		var $body = $("body");
		$body.append($form);
		index++;
	});
	$(".reduce_1").click(function(){ 
		if($(".other").children().length>2){
			$(".other").children("div.li:last").remove();
		}
	});

}

//用于后面的提交区分
var other_id;
var other_tuijian_id;
var other_falv_id;
var produce_id;
var farmId;
function upload_zong(){
	if(true){
		zong();
   	}else{
   		alert("请您完善信息");
   	}
  
}
	  	
/*$(function(){
	var data=JSON.parse($.cookie('usermsg'));
	if(data){
		console.log(data.userId);
	}else{
		window.location.href = 'Login.html';
	}
})
	*/

