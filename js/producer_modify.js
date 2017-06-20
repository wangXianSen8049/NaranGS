
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
	
/*  增加,删除操作 文件提交 */
		var index = 2;//用于区分
		$(".add_1").click(function(){
			var b = "a"+index;
			var upfile="upfile"+b;
			var dian="dian"+b;
			var path="path"+b;
			var form="form"+b;
			var text="text"+b;
			var otherReport="otherReport"+b;
			var $li = $("<div class='li'><a  size='20' name='upfile' id="+upfile+" class='upfile'>未选择任何文件</a><input type='button' id="+dian+" class='dian' value='浏览' onclick='"+path+".click()'><input type='hidden' id="+otherReport+" name="+otherReport+" value=''/><input type='text' id="+text+"></div>");
			var $parent = $(".other");
			$parent.append($li);
			var form_ ="#"+form; 
			var upfile_ ="#"+upfile; 
			var path_ ="#"+path; 
			var otherReport_="#"+otherReport
			var $form=$("<form id="+form+" action='javascript:up_1' method= 'post' enctype ='multipart/form-data' style='display: none;'><input type='file' accept='.doc,.pdf' id="+path+" name="+path+" class='path' onchange=\"upfile(\'"+form_+"\',\'"+upfile_+"\',\'"+path_+"\',\'"+otherReport_+"\')\"/></form>");
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
/*其他报告书
产品信息 id */
var other_id=[];
var produce_id=[];
var farmId=true;
/*会填数据 内容*/
$(function(){
	var url="http://192.168.3.29:8082/web/third/platform/farm/details/"+getUrlParam("farmId");
	$.ajax({
        type: "post",
        dataType: "json",
        url: url,
        success: function (data){
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
				if(detail.businessLicense){
					creat_tu("#preview_1",detail.businessLicense);//经营许可证
				}
				if(detail.license){
					creat_tu("#preview_2",detail.license);//营业执照
				}
				if(detail.hygieneLicense){
					creat_tu("#preview_3",detail.hygieneLicense);//卫生许可证
				}
				if(detail.leaseCertificate){
					creat_tu("#preview_3_1",detail.leaseCertificate);//土地／房屋
				}
				
				if(!isEmpty(detail.otherLicenses)){
					var otherLicenses = detail.otherLicenses.split(",");
					$(".otherLi").each(function(i,dom){//其他资质证明
	        			creat_tu($(this),otherLicenses[i]);
	        			$("#otherLicenses_"+(i+1)).val(otherLicenses[i].replace("http://on7ih6qzl.bkt.clouddn.com/",""));
	        		});
				}
				
	        	/*意见书*/
	        	$("#upfile").text(detail.recommendation);//推荐意见书
				$.each(detail.otherRecommendations,function(n,value){//推荐意见书列表
					otherRecommendations(value);
			 	});
	        	$("#upfile2").text(detail.legalOpinion);
	        	$.each(detail.otherLegalOpinions,function(n,value){//法律意见书列表
					otherLegalOpinions(value);
			 	});
	        	
	        	/*环境条件*/
	          	$(".envAssessmentReport").text(detail.envAssessmentReport);
	          	$(".envQualityReport").text(detail.envQualityReport);
	          	$(".envImpactReport").text(detail.envImpactReport);
	          	
	          	
	          	$.each(detail.products,function(n,value){
					product_dom(value);//添加dom
					add_pics(value.pics,n);
					zhengshu(value.certificates,n);
					if(isEmpty(value.trademark)){
						$(".shangb").css("display","none");
					}
				});
				/*其他报告书*/
				$.each(detail.otherReports,function(n,value){
					other_dom(value);
			 	});
			}
        }
    });
});

/*回填法律意见书方法 边创建dom边回填数据*/
var shu=1;
var other_falv_id=[];
function otherLegalOpinions(val){
	other_falv_id.push(val.reportId);
	var shu1="e"+shu;
	var index4="_falv"+shu1;
	var dian="dian"+index4;//浏览按钮
	var hidden="hidden"+index4;//隐藏的input标签
	var form="form"+index4;//隐藏的表单
	var upfile="upfile"+index4;//a标签的地址内容
	var $list=$(
		"<div class='li fa'>"+
  			"<img src='img/shanchu_xiao.png' onclick='reduce_falv(this)' />"+
  			"<a  size='20' id="+upfile+">"+val.reportUrl+"</a> "+
  			"<input type='button'  value='浏览'  onclick='"+dian+".click()'>"+ 
  			"<input type='hidden' id="+hidden+" value="+val.reportUrl+" />"+
			"<input type='text' placeholder='法律意见书推荐' value="+val.reportName+ ">"+
		"</div>");
	$("#falv").after($list);
	var form_="#"+form;
	var upfile_="#"+upfile;
	var dian_="#"+dian;
	var hidden_="#"+hidden;
	var $form=$("<form id="+form+" action='javascript:up_1' method= 'post' enctype ='multipart/form-data' style='display: none;'>"+
	   				"<input type='file' accept='.doc,.pdf' id="+dian+" name="+path+" class='path' onchange=\"upfile(\'"+form_+"\',\'"+upfile_+"\',\'"+dian_+"\',\'"+hidden_+"\')\"/>"+
	   			"</form>");
	$("body").append($form);
	shu++;
}
/*推荐意见书推荐 边创建dom边回填数据*/
var ind=1;
var other_tuijian_id=[];
function otherRecommendations(val){
	other_tuijian_id.push(val.reportId);
	var index3="d"+ind;
	var dian="dian_yijian"+index3;//浏览按钮
	var hidden="hidden_yijian"+index3;//隐藏的input标签
	var form="form_yijian"+index3;//隐藏的表单
	var upfile="upfile_yijian"+index3;//a标签的地址内容
	var $list=$(
		"<div class='li yij'>"+
  			"<img src='img/shanchu_xiao.png' onclick='reduce_yijian(this)' />"+
  			"<a  size='20' id="+upfile+">"+val.reportUrl+"</a> "+
  			"<input type='button'  value='浏览'  onclick='"+dian+".click()'>"+ 
  			"<input type='hidden' id="+hidden+" value="+val.reportUrl+"  />"+
			"<input type='text' placeholder='推荐意见书推荐' value="+val.reportName+" />"+
		"</div>");
	$("#tuijian").after($list);
	var form_="#"+form;
	var upfile_="#"+upfile;
	var dian_="#"+dian;
	var hidden_="#"+hidden;
	var $form=$("<form id="+form+" action='javascript:up_1' method= 'post' enctype ='multipart/form-data' style='display: none;'>"+
	   				"<input type='file' accept='.doc,.pdf' id="+dian+" name="+path+" class='path' onchange=\"upfile(\'"+form_+"\',\'"+upfile_+"\',\'"+dian_+"\',\'"+hidden_+"\')\"/>"+
	   			"</form>");
	$("body").append($form);
	ind++;
}
/*回填数据使用*/
function add_pics(value,n){
	if(value){
		var pics = value.split(",");
		$(".out").eq(n).find(".pics").each(function(i,dom){
			if(pics[i].replace("http://on7ih6qzl.bkt.clouddn.com/","")){
				$(this).attr("src",pics[i]);
				$(this).parent().next("input[type='hidden']").val(pics[i].replace("http://on7ih6qzl.bkt.clouddn.com/",""));
			}
			
		})
	}
}
function zhengshu(value,n){
	if(value){
		var pics = value.split(",");
		$(".out").eq(n).find(".zheng").each(function(i,dom){
			if(pics[i].replace("http://on7ih6qzl.bkt.clouddn.com/","")){
				$(this).attr("src",pics[i]);
				$(this).parent().next("input[type='hidden']").val(pics[i].replace("http://on7ih6qzl.bkt.clouddn.com/",""));
			}
			
		})
	}else{
		$(".zheng").css("display","none");
	}
}
/* 回填数据创建other的dom*/
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
						"<input type='text' id="+name+" class='name_' value="+value.productTitle+">"+
						"<span>产品名称：</span>"+
						"<i>*</i>"+
					"</div>"+
					"<div class='li comm4'>"+
			  			"<div id="+out_shangbiao+" onclick='"+shangbiao+".click()' class='shangbiaotu'>"+
			  				"<img src="+value.trademark+" class='shangb' >"+
			  			"</div>"+
						"<input type='hidden' id="+yin_shangbiao+" class='shangbiao'  name="+yin_shangbiao+" value="+value.trademark+" />"+
			  			"<span>商标：</span>"+
				  	"</div>"+
			  		"<div class='li comm4'>"+
						"<div id="+preview+" class='guige' onclick='"+previewtudian+".click()'>"+
							"<img src="+value.specifications+"  />"+
						"</div>"+
						"<input type='hidden' id="+specyin+" name="+specyin+" class='spec' value="+value.specifications+" />"+
						"<span>产品规格：</span>"+
						"<i>*</i>"+
					"</div>"+
					"<div class='li comm'>"+
						"<input type='text' id="+estimatedYield+" class='estimatedYield' value="+value.estimatedYield+">"+
						"<span>产品预估产量：</span>"+
						"<i>*</i>"+
					"</div>"+
					"<div class='li'>"+
						"<a size='20' name='upfile' id="+upfile+" class='upfile'>"+value.qualityReport+"</a>"+
						"<input type='button' id="+dian+" class='dian' value='浏览' onclick='"+path+".click()'>"+
						"<input type='hidden' id="+qualityReport+" name="+qualityReport+" class='qualityReport' value="+value.qualityReport+"  />"+
						"<span>环境质量报告：</span>"+
						"<i>*</i>"+
					"</div>"+
					"<div class='li comm4'>"+
				  			"<div id="+out_zs1+" onclick='"+dian_zs1+".click()' class='zhengs1'>"+
				  				"<img src='' class='zheng' />"+
				  			"</div>"+
							"<input type='hidden' id="+yin_zs1+"  name="+yin_zs1+" class='tutu_zs' value='' />"+
				  			"<div id="+out_zs2+" onclick='"+dian_zs2+".click()' class='zhengs2'>"+
				  				"<img src='' class='zheng' />"+
				  			"</div>"+
							"<input type='hidden' id="+yin_zs2+"  name="+yin_zs2+" class='tutu_zs' value='' />"+
				  			"<span>所取得的证书：</span>"+
				  		"</div>"+
				  		"<div class='li comm1'>"+
				  			"<div id="+out_zs3+" onclick='"+dian_zs3+".click()' class='zhengs3'>"+
				  				"<img src='' class='zheng' />"+
				  			"</div>"+
							"<input type='hidden' id="+yin_zs3+"  name="+yin_zs3+" value='' class='tutu_zs' />"+
				  			"<div id="+out_zs4+" onclick='"+dian_zs4+".click()' class='zhengs4'>"+
				  				"<img src='' class='zheng' />"+
				  			"</div>"+
							"<input type='hidden' id="+yin_zs4+"  name="+yin_zs4+"  value='' class='tutu_zs' />"+
				  		"</div>"+
					"<div class='li comm2'>"+
						"<div id="+pics1view+" class='xiang3' onclick='"+pics1tudian+".click()'>"+
							"<img src='' class=' pics' />"+
						"</div>"+
						"<input type='hidden' id="+pics1yin+" name="+pics1yin+" class='tutu'  value='' />"+
						"<div id="+pics2view+" class='xiang2' onclick='"+pics2tudian+".click()'>"+
							"<img src='' class=' pics' />"+
						"</div>"+
						"<input type='hidden' id="+pics2yin+" name="+pics2yin+" class='tutu' value='' />"+
						"<span>产品详情图片：</span>"+
						"<i>*</i>"+
					"</div>"+
					"<div class='li comm3'>"+
						"<div id="+pics3view+" class='xiang3' onclick='"+pics3tudian+".click()'>"+
							"<img src='' class=' pics' />"+
						"</div>"+
						"<input type='hidden' id="+pics3yin+" name="+pics3yin+" class='tutu' value='' />"+
						"<div id="+pics4view+" class='xiang4' onclick='"+pics4tudian+".click()'>"+
							"<img src='' class=' pics' />"+
						"</div>"+
						"<input type='hidden' id="+pics4yin+" name="+pics4yin+" class='tutu' value='' />"+
					"</div>"+
				"</div>");
	var $parent = $(".product");
	$parent.append($li);
	var formone="formone"+b;
	var formone_="#"+formone;
	var form="form"+b;
	var form_ ="#"+form; 
	var upfile_ ="#"+upfile; 
	var path_ ="#"+path; 
	var specyin_="#"+specyin;
	var qualityReport_="#"+qualityReport;
	var preview_= preview;
	
	var out_shangbiao_=out_shangbiao;
	var form_shangbiao_="#"+form_shangbiao;
	var yin_shangbiao_="#"+yin_shangbiao;
	
	var pics1view_=pics1view;
	var pics1form="pics1from"+b;
	var pics1form_="#"+pics1form;
	var pics1yin_="#"+pics1yin;
	
	var pics2view_=pics2view;
	var pics2form="pics2from"+b;
	var pics2form_="#"+pics2form;
	var pics2yin_="#"+pics2yin;
	
	var pics3view_=pics3view;
	var pics3form="pics3from"+b;
	var pics3form_="#"+pics3form;
	var pics3yin_="#"+pics3yin;
	
	var pics4view_=pics4view;
	var pics4form="pics4from"+b;
	var pics4form_="#"+pics4form;
	var pics4yin_="#"+pics4yin;
	
	var out_zs1_=out_zs1;
	var form_zs1_="#"+form_zs1;
	var yin_zs1_="#"+yin_zs1;
	
	var out_zs2_=out_zs2;
	var form_zs2_="#"+form_zs2;
	var yin_zs2_="#"+yin_zs2;
	
	var out_zs3_=out_zs3;
	var form_zs3_="#"+form_zs3;
	var yin_zs3_="#"+yin_zs3;
	
	var out_zs4_=out_zs4;
	var form_zs4_="#"+form_zs4;
	var yin_zs4_="#"+yin_zs4;
		
	
	var $shangbiao_tu=$("<form id="+form_shangbiao+" action='javascript:up_2' method= 'post' enctype ='multipart/form-data'  style='display: none;'>"+ 
							"<input type='file' id="+shangbiao+" accept='image/*' name="+shangbiao+" onchange=\"up(this,\'"+out_shangbiao_+"\',\'"+form_shangbiao_+"\',\'"+yin_shangbiao_+"\')\" type='hidden'/>"+
						"</form>");
	var $form=$("<form id="+form+" action='javascript:up_1' method= 'post' enctype ='multipart/form-data' style='display: none;'>"+
	   				"<input type='file'  accept='.doc,.pdf' id="+path+" name="+path+" class='path' onchange=\"upfile(\'"+form_+"\',\'"+upfile_+"\',\'"+path_+"\',\'"+qualityReport_+"\')\"/>"+
	   			"</form>");
	var $one_tu=$("<form id="+formone+" action='javascript:up_1' method= 'post' enctype ='multipart/form-data' style='display: none;'>"+
						"<input type='file' accept='image/*' id="+previewtudian+" name="+previewtudian+" onchange=\"up(this,\'"+preview_+"\',\'"+formone_+"\',\'"+specyin_+"\')\" type='hidden'/>"+
					"</form>");
					
					
	var $pics1_tu=$("<form id="+pics1form+" action='javascript:up_1' method= 'post' enctype ='multipart/form-data' style='display: none;'>"+ 
		"<input type='file' accept='image/*' id="+pics1tudian+" name="+pics1tudian+" onchange=\"up(this,\'"+pics1view_+"\',\'"+pics1form_+"\',\'"+pics1yin_+"\')\" type='hidden'/></form>");
	var $pics2_tu=$("<form id="+pics2form+" action='javascript:up_1' method= 'post' enctype ='multipart/form-data' style='display: none;'>"+ 
		"<input type='file' accept='image/*' id="+pics2tudian+" name="+pics2tudian+" onchange=\"up(this,\'"+pics2view_+"\',\'"+pics2form_+"\',\'"+pics2yin_+"\')\" type='hidden'/></form>");
	var $pics3_tu=$("<form id="+pics3form+" action='javascript:up_1' method= 'post' enctype ='multipart/form-data' style='display: none;'>"+ 
		"<input type='file' accept='image/*' id="+pics3tudian+" name="+pics3tudian+" onchange=\"up(this,\'"+pics3view_+"\',\'"+pics3form_+"\',\'"+pics3yin_+"\')\" type='hidden'/></form>");
	var $pics4_tu=$("<form id="+pics4form+" action='javascript:up_1' method= 'post' enctype ='multipart/form-data' style='display: none;'>"+ 
		"<input type='file' accept='image/*' id="+pics4tudian+" name="+pics4tudian+" onchange=\"up(this,\'"+pics4view_+"\',\'"+pics4form_+"\',\'"+pics4yin_+"\')\" type='hidden'/></form>");
	
	/*证书1~4隐藏表单*/
	var $zs1_tu=$("<form id="+form_zs1+" action='javascript:up_1' method= 'post' enctype ='multipart/form-data' style='display: none;'>"+ 
						"<input type='file' accept='image/*' id="+dian_zs1+" name="+dian_zs1+" onchange=\"up(this,\'"+out_zs1_+"\',\'"+form_zs1_+"\',\'"+yin_zs1_+"\')\" type='hidden'/>"+
					"</form>");
	var $zs2_tu=$("<form id="+form_zs2+" action='javascript:up_1' method= 'post' enctype ='multipart/form-data' style='display: none;'>"+ 
						"<input type='file' accept='image/*' id="+dian_zs2+" name="+dian_zs2+" onchange=\"up(this,\'"+out_zs2_+"\',\'"+form_zs2_+"\',\'"+yin_zs2_+"\')\" type='hidden'/>"+
					"</form>");
	var $zs3_tu=$("<form id="+form_zs3+" action='javascript:up_1' method= 'post' enctype ='multipart/form-data' style='display: none;'>"+ 
						"<input type='file' accept='image/*' id="+dian_zs3+" name="+dian_zs3+" onchange=\"up(this,\'"+out_zs3_+"\',\'"+form_zs3_+"\',\'"+yin_zs3_+"\')\" type='hidden'/>"+
					"</form>");
	var $zs4_tu=$("<form id="+form_zs4+" action='javascript:up_1' method= 'post' enctype ='multipart/form-data' style='display: none;'>"+ 
						"<input type='file' accept='image/*' id="+dian_zs4+" name="+dian_zs4+" onchange=\"up(this,\'"+out_zs4_+"\',\'"+form_zs4_+"\',\'"+yin_zs4_+"\')\" type='hidden'/>"+
					"</form>");
					
					
				   			
	var $body = $("body");
	$body.append($shangbiao_tu);
	$body.append($zs1_tu);
	$body.append($zs2_tu);
	$body.append($zs3_tu);
	$body.append($zs4_tu);
	
	
	$body.append($form);
	$body.append($one_tu);
	$body.append($pics1_tu);
	$body.append($pics2_tu);
	$body.append($pics3_tu);
	$body.append($pics4_tu);
	index2++;
}
/*回填数据使用*/
var index_other = 1;//用于区分
function other_dom(value){
	other_id.push(value.reportId);
	var b = "e"+index_other;
	var upfile="upfile"+b;
	var dian="dian"+b;
	var path="path"+b;
	var form="form"+b;
	var text="text"+b;
	var otherReport="otherReport"+b;
	var $li = $("<div class='li huanj'>"+
					"<img src='img/shanchu_xiao.png' onclick='reduce_other(this)' />"+
					"<a  name='upfile' id="+upfile+" >"+value.reportUrl+"</a>"+
					"<input type='button' id="+dian+" class='dian' value='浏览' onclick='"+path+".click()'>"+
					"<input type='hidden' id="+otherReport+" name="+otherReport+" value="+value.reportUrl+" />"+
					"<input type='text' id="+text+" value="+value.reportName+">"+
				"</div>");
	var $parent = $(".huanjing");
	var form_ ="#"+form; 
	var upfile_ ="#"+upfile; 
	var path_ ="#"+path; 
	var otherReport_="#"+otherReport
	var $form=$("<form id="+form+" action='javascript:up_1' method= 'post' enctype ='multipart/form-data' style='display: none;'>"+
						"<input type='file' accept='.doc,.pdf' id="+path+" name="+path+" class='path' onchange=\"upfile(\'"+form_+"\',\'"+upfile_+"\',\'"+path_+"\',\'"+otherReport_+"\')\"/>"+
				"</form>");
	var $body = $("body");
	$body.append($form);
	$parent.append($li);
	index_other++;
}

function fanhui(){
	window.location.href = "Producer_list.html";
}
	

