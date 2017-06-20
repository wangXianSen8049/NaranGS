window.onload=function(){
	/*首屏的锚点链接动画*/
	$('#a').click(function () {
		$('html, body').animate({
		scrollTop: $($.attr(this, 'href')).offset().top
		}, 500);
		return false;
	});
	$('#six').click(function () {
		window.location.href = 'Login.html';
	});
	window.onresize = function(){
		//通过window.screen.width获取屏幕的宽度
		var width=$(document.body).outerWidth(true);
        var offWidth =width /1920*100; 
        $("html").css("font-size",offWidth);//把rem的值复制给顶级标签html的font-size
		/*屏幕高度适配*/
		var height=$(window).height();
		var img_1= height*24.25/100;
		var header_span= height*9.27/100;
		var header_p= height*6.72/100;
		var img_2 = height*7.07/100;
		$(".img_1").css("margin-top",img_1);
		$(".header_span").css("margin-top",header_span);
		$(".header_p").css("margin-top",header_p);
		$(".header_p").css("margin-top",header_p);
		$(".img_2").css("bottom",img_2);
	}
	//通过window.screen.width获取屏幕的宽度
		var width=$(document.body).outerWidth(true);
        var offWidth =width /1920*100; 
        $("html").css("font-size",offWidth);//把rem的值复制给顶级标签html的font-size
		/*屏幕高度适配*/
		var height=$(window).height();
		var img_1= height*24.25/100;
		var header_span= height*9.27/100;
		var header_p= height*6.72/100;
		var img_2 = height*7.07/100;
		$(".img_1").css("margin-top",img_1);
		$(".header_span").css("margin-top",header_span);
		$(".header_p").css("margin-top",header_p);
		$(".header_p").css("margin-top",header_p);
		$(".img_2").css("bottom",img_2);
}
