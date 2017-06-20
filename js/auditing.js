
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
}
/*获取url的参数*/
function getUrlParam(farmId) {
      var reg = new RegExp("(^|&)" + farmId + "=([^&]*)(&|$)"); //构造一个含有目标参数的正则表达式对象
      var r = window.location.search.substr(1).match(reg); //匹配目标参数
     
      if (r != null){
      	return unescape(r[2]);
      }else{
      	return null; //返回参数值
      }  
};
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
        }; 
/*创建图片并放入div*/
function creat_tu(dom,data){
	$(dom).append("<img src="+data +">");
	$(dom).next().attr("href",data);//a标签的下载路径
}     
/*会填数据*/
$(function(){
	var url="http://192.168.3.29:8082/web/third/platform/farm/details/"+getUrlParam("farmId");
	$.ajax({
        type: "post",
        dataType: "json",
        url: url,
        success: function (data) {
			console.log(data);
			var detail=data.body;
			if(detail==null){
				return;
			}else{
				/*基本信息*/
				$("#name").val(detail.farmName);//公司名称
				select("#hangye",detail.farmProduct);//所属行业(dom，数据)；
				select("#selProvince",detail.farmProvince);//省份
				select("#selCity",detail.farmCity);//城市
				$("#charger").val(detail.charger);//法人
				select("#year",getMyDate(detail.establishmentDate)[0]);//年
				select("#month0",getMyDate(detail.establishmentDate)[1]);//月
				select("#days0",getMyDate(detail.establishmentDate)[2]);//日	
				$("#hotline").val(detail.farmHotline);//热线电话
				$("#location").val(detail.farmLocation);//公司地址
				creat_tu("#preview",detail.cover.pictureUrl);//公司logo
				
				$("#textarea").val(detail.farmIntroduce);//公司介绍
				/* 资质证明*/
				creat_tu("#preview_1",detail.businessLicense);//经营许可证
				creat_tu("#preview_2",detail.license);//营业执照
				creat_tu("#preview_3",detail.hygieneLicense);//卫生许可证
				creat_tu("#preview_3_2",detail.leaseCertificate);//土地／房屋
				var otherLicenses = detail.otherLicenses.split(",")||detail.otherLicenses;
	        	$(".otherLi").each(function(i,dom){//其他资质证明
	        		creat_tu($(this),otherLicenses[i]);
	        	})
	        	/*意见书*/
	        	$("#upfilee").text(detail.recommendation);//推荐意见书
	        	$("#upfilee").attr("href",detail.recommendation);//推荐意见书
				$.each(detail.otherRecommendations,function(n,value){//推荐意见书列表
					otherRecommendations(value);
			 	});
	        	$("#upfile2").text(detail.legalOpinion);
	        	$("#upfile2").attr("href",detail.legalOpinion);
	        	$.each(detail.otherLegalOpinions,function(n,value){//法律意见书列表
					otherLegalOpinions(value);
			 	});
	        	
	        	/*其他资料*/
	          	$(".envAssessmentReport").text(detail.envAssessmentReport);
	          	$(".envAssessmentReport").attr("href",detail.envAssessmentReport);
	          	$(".envQualityReport").text(detail.envQualityReport);
	          	$(".envQualityReport").attr("href",detail.envQualityReport);
	          	$(".envImpactReport").text(detail.envImpactReport);
	          	$(".envImpactReport").attr("href",detail.envImpactReport);
	          	
	          	
	          	$.each(detail.products,function(n,value){
					product_dom(value);//添加dom
					add_pics(value.pics,n);
					zhengshu(value.certificates,n);
				});
				/*其他报告书*/
				$.each(detail.otherReports,function(n,value){
					other_dom(value);
			 	});
			}
			yan()//用于控制！颜色
			$("input[type='text']").attr("disabled","disabled");	
          
        }
    });
});
/*回填法律意见书方法 边创建dom边回填数据*/
var shu=1;
function otherLegalOpinions(val){
	var shu1="e"+shu;
	var index4="_falv"+shu1;
	var dian="dian"+index4;//下载按钮
	var hidden="hidden"+index4;//隐藏的input标签
	var form="form"+index4;//隐藏的表单
	var upfile="upfile"+index4;//a标签的地址内容
	var $list=$(
		"<div class='li fa'>"+
  			"<a  size='20' id="+upfile+" href="+val.reportUrl+" class='upf' >"+val.reportUrl+"</a> "+
  			"<input type='button'  value='下载'  onclick='"+upfile+".click()'>"+ 
			"<input type='text' placeholder='法律意见书推荐' value="+val.reportName+ ">"+
			"<i>!</i>"+
		"</div>"+
		"<p class='ping other_falv' contenteditable='true' style='color: #999999;'>此项无误</p>");
	$(".falv").after($list);
	shu++;
}
/*推荐意见书推荐 边创建dom边回填数据*/
var ind=1;
function otherRecommendations(val){
	var index3="d"+ind;
	var dian="dian_yijian"+index3;//下载按钮
	var hidden="hidden_yijian"+index3;//隐藏的input标签
	var upfile="upfile_yijian"+index3;//a标签的地址内容
	var $list=$(
		"<div class='li yij'>"+
  			"<a  size='20' id="+upfile+" href="+val.reportUrl+" class='upf' >"+val.reportUrl+"</a> "+
  			"<input type='button'  value='下载'  onclick='"+upfile+".click()'>"+ 
			"<input type='text' placeholder='推荐意见书推荐' value="+val.reportName+" />"+
			"<i>!</i>"+
		"</div>"+
		"<p class='ping other_tuijian' contenteditable='true' style='color: #999999;'>此项无误</p>");
	$(".tuijian").after($list);
	ind++;
}


/*其他报告书
产品信息 id */
var other_id=[];
var produce_id=[];
var index2 = 1;//用于区分
function product_dom(value){
	produce_id.push(value.productId);
	var b = "c"+index2;
	var upfile="upfile"+b;
	var dian="dian"+b;
	var path="path"+b;
	var name="name"+b;
	var spec="spec"+b;
	var specyin="specyin"+b;
	var preview="preview"+b;
	var previewtudian="previewtudian"+b;
	var qualityReport="qualityReport"+b;
	var estimatedYield="estimatedYield"+b;
	var shangbiao="shangbiao"+b;
	var out_shangbiao="out_shangbiao"+b;
	var form_shangbiao="form_shangbiao"+b;
	var yin_shangbiao="yin_shangbiao"+b;
		
	var pics1="pics1"+b;
	var pics1yin="pics1yin"+b;
	var pics1view="pics1view"+b;
	var pics1tudian="pics1tudian"+b;
	var pics2="pics2"+b;
	var pics2yin="pics2yin"+b;
	var pics2view="pics2view"+b;
	var pics2tudian="pics2tudian"+b;
	
	var pics3="pics3"+b;
	var pics3yin="pics3yin"+b;
	var pics3view="pics3view"+b;
	var pics3tudian="pics3tudian"+b;
	var pics4="pics4"+b;
	var pics4yin="pics4yin"+b;
	var pics4view="pics4view"+b;
	var pics4tudian="pics4tudian"+b;
	var yin_zs1="yin_zs1"+b;
		var out_zs1="out_zs1"+b;
		var form_zs1="form_zs1"+b;
		var dian_zs1="dian_zs1"+b;
		var form_zs1="form_zs1"+b;
		
		var yin_zs2="yin_zs2"+b;
		var out_zs2="out_zs2"+b;
		var form_zs2="form_zs2"+b;
		var dian_zs2="dian_zs2"+b;
		var form_zs2="form_zs2"+b;
		
		var yin_zs3="yin_zs3"+b;
		var out_zs3="out_zs3"+b;
		var form_zs3="form_zs3"+b;
		var dian_zs3="dian_zs3"+b;
		var form_zs3="form_zs3"+b;
		
		var yin_zs4="yin_zs4"+b;
		var out_zs4="out_zs4"+b;
		var form_zs4="form_zs4"+b;
		var dian_zs4="dian_zs4"+b;
		var form_zs4="form_zs4"+b;
	var $li = $("<div class='out pro'>"+
					"<div class='li'>"+
						"<input type='text'id="+name+" class='name_' value="+value.productTitle+">"+
						"<span>产品名称：</span>"+
						"<i>!</i>"+
					"</div>"+
					"<p class='ping c_mingcheng' contenteditable='true' style='color: #999999;'>此项无误</p>"+
					"<div class='li comm4'>"+
			  			"<div id="+out_shangbiao+" onclick='"+shangbiao+".click()' class='shangbiaotu'>"+
			  				"<img src="+value.trademark+">"+
			  			"</div>"+
			  			"<a download='img' id="+shangbiao+" href="+value.trademark+" style='display: none;'></a>"+
			  			"<span>商标：</span>"+
				  		"<i>!</i>"+
				  	"</div>"+
				  	"<p class='ping c_shangbiao' contenteditable='true' style='color: #999999;'>此项无误</p>"+
			  		"<div class='li comm4'>"+
						"<div id="+preview+" class='guige' onclick='"+previewtudian+".click()'>"+
							"<img src="+value.specifications+"  />"+
						"</div>"+
						"<a download='img' id="+previewtudian+" href="+value.specifications+" style='display: none;'></a>"+
						"<span>产品规格：</span>"+
						"<i>!</i>"+
					"</div>"+
					"<p class='ping c_guige' contenteditable='true' style='color: #999999;'>此项无误</p>"+
					"<div class='li comm'>"+
						"<input type='text' id="+estimatedYield+" class='estimatedYield' value="+value.estimatedYield+">"+
						"<span>产品预估产量：</span>"+
						"<i>!</i>"+
					"</div>"+
					"<p class='ping c_chanliang' contenteditable='true' style='color: #999999;'>此项无误</p>"+
					"<div class='li'>"+
						"<a size='20' name='upfile' id="+upfile+" class='upfile' href="+value.qualityReport+" >"+value.qualityReport+"</a>"+
						"<input type='button' id="+dian+" class='dian' value='下载' onclick='"+upfile+".click()'>"+
						"<input type='hidden' id="+qualityReport+" name="+qualityReport+" class='qualityReport' value=''/>"+
						"<span>环境质量报告：</span>"+
						"<i>!</i>"+
					"</div>"+
					"<p class='ping c_baogao' contenteditable='true' style='color: #999999;'>此项无误</p>"+
					"<div class='li comm4'>"+
				  			"<div id="+out_zs1+" onclick='"+dian_zs1+".click()' class='zhengs1'>"+
				  				"<img src='' class='zheng' />"+
				  			"</div>"+
							"<a download='img' id="+dian_zs1+"  style='display: none;'></a>"+
				  			"<div id="+out_zs2+" onclick='"+dian_zs2+".click()' class='zhengs2'>"+
				  				"<img src='' class='zheng' />"+
				  			"</div>"+
							"<a download='img' id="+dian_zs2+"  style='display: none;'></a>"+
				  			"<span>所取得的证书：</span>"+
				  			"<i>!</i>"+
				  	"</div>"+
				  	"<div class='li comm1'>"+
				  			"<div id="+out_zs3+" onclick='"+dian_zs3+".click()' class='zhengs3'>"+
				  				"<img src='' class='zheng' />"+
				  			"</div>"+
							"<a download='img' id="+dian_zs3+"  style='display: none;'></a>"+
				  			"<div id="+out_zs4+" onclick='"+dian_zs4+".click()' class='zhengs4'>"+
				  				"<img src='' class='zheng' />"+
				  			"</div>"+
							"<a download='img' id="+dian_zs4+"  style='display: none;'></a>"+
				  	"</div>"+
				  	"<p class='ping c_zhengshu' contenteditable='true' style='color: #999999;'>此项无误</p>"+
					"<div class='li comm4'>"+
						"<div id="+pics1view+" class='xiang3' onclick='"+pics1tudian+".click()'>"+
							"<img src='' class=' pics' />"+
						"</div>"+
						"<a download='img' id="+pics1tudian+"  style='display: none;'></a>"+
						"<div id="+pics2view+" class='xiang2' onclick='"+pics2tudian+".click()'>"+
							"<img src='' class=' pics' />"+
						"</div>"+
						"<a download='img' id="+pics2tudian+"  style='display: none;'></a>"+
						"<span>产品详情图片：</span>"+
						"<i>!</i>"+
					"</div>"+
					"<div class='li comm3'>"+
						"<div id="+pics3view+" class='xiang3' onclick='"+pics3tudian+".click()'>"+
							"<img src='' class=' pics' />"+
						"</div>"+
						"<a download='img' id="+pics3tudian+"  style='display: none;'></a>"+
						"<div id="+pics4view+" class='xiang4' onclick='"+pics4tudian+".click()'>"+
							"<img src='' class=' pics' />"+
						"</div>"+
						"<a download='img' id="+pics4tudian+"  style='display: none;'></a>"+
					"</div>"+
					"<p class='ping c_xiangqing' contenteditable='true' style='color: #999999;'>此项无误</p>"+
				"</div>");
	var $parent = $(".product");
	$parent.append($li);
	index2++;
}
/*回填数据使用*/
function add_pics(value,n){
	if(value){
		var pics = value.split(",");
		$(".out").eq(n).find(".pics").each(function(i,dom){
			$(this).attr("src",pics[i]);
			$(this).parent().next().attr("href",pics[i]);
		})
	}
}
function zhengshu(value,n){
	if(value){
		var pics = value.split(",");
		$(".out").eq(n).find(".zheng").each(function(i,dom){
			$(this).attr("src",pics[i]);
			$(this).parent().next().attr("href",pics[i]);
			
		})
	}
}

/*创建other的dom*/
var index = 1;//用于区分
function other_dom(value){
	var b = "a"+index;
	var upfile="upfile"+b;
	var dian="dian"+b;
	var path="path"+b;
	var form="form"+b;
	var text="text"+b;
	var otherReport="otherReport"+b;
	var $li = $("<div class='lii'>"+
					"<a download='img' size='20' href="+value.reportUrl+" name='upfile' id="+upfile+" class='upfile'>"+value.reportUrl+"</a>"+
					"<input type='button' id="+dian+" class='dian' value='下载' onclick='"+upfile+".click()'>"+
					"<input type='hidden' id="+otherReport+" name="+otherReport+" value=''/>"+
					"<input type='text' id="+text+" value="+value.reportName+">"+
					"<i>!</i>"+
				"</div>"+
				"<p class='ping q_baogao' contenteditable='true' style='color: #999999;'>此项无误</p>");
	var $parent = $(".h_yingxiang");
	$parent.after($li);
	index++;
}

/**
 * 评语颜色改变
 * 利用的 prevent（）；方法
 * dom 节点的先后位置不能发生变化
 */
$(function(){
	$("p[contenteditable='true']").bind("focus", function(e) {
		$(e.target).text("");
		$(e.target).css("color","red");
		$(e.target).prev().find("i").css("display","inline-block");
		
		if($(e.target).attr('class')=='ping yingye'){
			$(e.target).parent().prev().find("i:eq(1)").css("display","inline-block");
		}
		if($(e.target).attr('class')=='ping jingying'){
			$(e.target).parent().prev().find("i:eq(0)").css("display","inline-block");
		}
		if($(e.target).attr('class')=='ping weisheng'){
			$(e.target).parent().prev().find("i:eq(1)").css("display","inline-block");
		}
		if($(e.target).attr('class')=='ping fangwu'){
			$(e.target).parent().prev().find("i:eq(0)").css("display","inline-block");
		}
		if($(e.target).attr('class')=='ping qita'||'ping c_zhengshu'||'ping c_xiangqing'){
			$(e.target).prev().prev().find("i").css("display","inline-block");
		}
		
	});
});

function yan(){
	$("p[contenteditable='true']").bind("focus", function(e) {
		$(e.target).text("");
		$(e.target).css("color","red");
		$(e.target).prev().find("i").css("display","inline-block");
		
		if($(e.target).attr('class')=='ping yingye'){
			$(e.target).parent().prev().find("i:eq(1)").css("display","inline-block");
		}
		if($(e.target).attr('class')=='ping jingying'){
			$(e.target).parent().prev().find("i:eq(0)").css("display","inline-block");
		}
		if($(e.target).attr('class')=='ping weisheng'){
			$(e.target).parent().prev().find("i:eq(1)").css("display","inline-block");
		}
		if($(e.target).attr('class')=='ping fangwu'){
			$(e.target).parent().prev().find("i:eq(0)").css("display","inline-block");
		}
		if($(e.target).attr('class')=='ping qita'||'ping c_zhengshu'||'ping c_xiangqing'){
			$(e.target).prev().prev().find("i").css("display","inline-block");
		}
	});
};



function str(dom){
	var arr=[];
	$("."+dom).each(function(i,n){
		arr.push($(n).text());
	});
	return arr.join(",");
}
function zong(num){
	var Data={}
	Data.farmId=getUrlParam("farmId");
	Data.auditStatus=num;
	Data.checks= new Array();
	Data.checks[0]={}
	Data.checks[0].desc=$(".mingcheng").text();
	Data.checks[0].type="mingcheng";
	
	Data.checks[1]={}
	Data.checks[1].desc=$(".hangy").text();
	Data.checks[1].type="hangy";
	
	Data.checks[2]={}
	Data.checks[2].desc=$(".quyu").text();
	Data.checks[2].type="quyu";
	
	Data.checks[3]={}
	Data.checks[3].desc=$(".faren").text();
	Data.checks[3].type="faren";
	
	Data.checks[4]={}
	Data.checks[4].desc=$(".riqi").text();
	Data.checks[4].type="riqi";
	
	Data.checks[5]={}
	Data.checks[5].desc=$(".dianhua").text();
	Data.checks[5].type="dianhua";
	
	Data.checks[6]={}
	Data.checks[6].desc=$(".dizhi").text();
	Data.checks[6].type="dizhi";
	
	Data.checks[7]={}
	Data.checks[7].desc=$(".logotu").text();
	Data.checks[7].type="logotu";
	
	Data.checks[8]={}
	Data.checks[8].desc=$(".yingye").text();
	Data.checks[8].type="yingye";
	
	Data.checks[9]={}
	Data.checks[9].desc=$(".jingying").text();
	Data.checks[9].type="jingying";
	
	Data.checks[11]={}
	Data.checks[11].desc=$(".weisheng").text();
	Data.checks[11].type="weisheng";
	
	Data.checks[12]={}
	Data.checks[12].desc=$(".fangwu").text();
	Data.checks[12].type="fangwu";
	
	Data.checks[13]={}
	Data.checks[13].desc=$(".qita").text();
	Data.checks[13].type="qita";
	
	Data.checks[14]={}
	Data.checks[14].desc=$(".qita").text();
	Data.checks[14].type="qita";
	
	Data.checks[15]={}
	Data.checks[15].desc=$(".tuijian").text();
	Data.checks[15].type="tuijian";
	
	Data.checks[16]={}
	Data.checks[16].desc=$(".falv").text();
	Data.checks[16].type="falv";
	
	Data.checks[17]={}
	Data.checks[17].desc=$(".h_pingjia").text();
	Data.checks[17].type="h_pingjia";
	
	Data.checks[18]={}
	Data.checks[18].desc=$(".h_jiance").text();
	Data.checks[18].type="h_jiance";
	
	Data.checks[19]={}
	Data.checks[19].desc=$(".h_yingxiang").text();
	Data.checks[19].type="h_yingxiang";
	
	Data.checks[20]={}
	Data.checks[20].desc=str("c_mingcheng");
	Data.checks[20].type="c_mingcheng";
	
	Data.checks[21]={}
	Data.checks[21].desc=str("c_shangbiao");
	Data.checks[21].type="c_shangbiao";
	
	Data.checks[22]={}
	Data.checks[22].desc=str("c_guige");
	Data.checks[22].type="c_guige";
	
	Data.checks[23]={}
	Data.checks[23].desc=str("c_chanliang");
	Data.checks[23].type="c_chanliang";
	
	Data.checks[24]={}
	Data.checks[24].desc=str("c_baogao");
	Data.checks[24].type="c_baogao";
	
	Data.checks[25]={}
	Data.checks[25].desc=str("c_zhengshu");
	Data.checks[25].type="c_zhengshu";
	
	Data.checks[26]={}
	Data.checks[26].desc=str("c_xiangqing");
	Data.checks[26].type="c_xiangqing";
	
	Data.checks[27]={}
	Data.checks[27].desc=str("other_tuijian");
	Data.checks[27].type="other_tuijian";
	
	Data.checks[28]={}
	Data.checks[28].desc=str("other_falv");
	Data.checks[28].type="other_falv";
	
	Data.checks[29]={}
	Data.checks[29].desc=str("jieshao");
	Data.checks[29].type="jieshao";
	
	Data.checks[10]={}
	Data.checks[10].desc=str("q_baogao");
	Data.checks[10].type="q_baogao";
	
	
	Data.checks=JSON.stringify(Data.checks);
	
	var url="http://192.168.3.29:8082/web/third/platform/farm/audit";
	console.log(Data);
	$("#zong").ajaxSubmit({	  
		type : "post",
		url:url,
		data:Data,
		dataType : "json",
		success:function(result){
			alert("提交成功！");
			console.log(result);
			window.location.href = "Auditing_list.html";
		},
		error: function(e){
			console.log("提交失败");
		}
	});
   
}
	  	

	

