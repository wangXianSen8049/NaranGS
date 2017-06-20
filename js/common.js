/**
 * 公共的方法 
 * produce_add() 产品的增加
 * product_reduce() 产品的减少
 * up() 图片的上传方法
 * upfile() 文件的上传方法
 * zong() 数据的提交
 * add_other()添加其他资料方法
 * add_falv()添加法律意见书
 * add_yijian()添加推荐意见书
 * getUrlParam()获取url的参数
 * select()给下拉菜单传值方法
 * getMyDate()毫秒值转成日期
 * creat_tu()创建图片并放入div
 *



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
			$(n).attr("selected",true);
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
}     
 
 
 /*  增加,删除操作  产品列表提交 */
var index2 = 1;//用于区分
function produce_add(){ 
		var b = "b"+index2;
		var upfile="upfile"+b;
		var dian="dian"+b;
		var path="path"+b;
		var name="name"+b;
		var spec="spec"+b;
		var shangbiao="shangbiao"+b;
		var out_shangbiao="out_shangbiao"+b;
		var form_shangbiao="form_shangbiao"+b;
		var yin_shangbiao="yin_shangbiao"+b;
		
		var specyin="specyin"+b;
		var preview="preview"+b;
		var previewtudian="previewtudian"+b;
		var qualityReport="qualityReport"+b;
		var estimatedYield="estimatedYield"+b;
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
							"<input type='text'id="+name+" class='name_'>"+
							"<span>产品名称：</span>"+
							"<i>*</i>"+
						"</div>"+
						"<div class='li comm4'>"+
				  			"<div id="+out_shangbiao+" onclick='"+shangbiao+".click()' class='shangbiaotu'></div>"+
							"<input type='hidden' id="+yin_shangbiao+" class='shangbiao'  name="+yin_shangbiao+" value='' />"+
				  			"<span>商标：</span>"+
					  		"<i>*</i>"+
					  	"</div>"+
				  		"<div class='li comm4'>"+
							"<div id="+preview+" class='guige' onclick='"+previewtudian+".click()'></div>"+
							"<input type='hidden' id="+specyin+" name="+specyin+" class='spec' value='' />"+
							"<span>产品规格：</span>"+
							"<i>*</i>"+
						"</div>"+
						"<div class='li comm4'>"+
								"<input type='text' id="+estimatedYield+" class='estimatedYield'>"+
								"<span>产品预估产量：</span>"+
								"<i>*</i>"+
						"</div>"+
						"<div class='li comm5'>"+
							"<a  size='20' name='upfile' id="+upfile+" class='upfile'>未选择任何文件</a>"+
							"<input type='button' id="+dian+" class='dian' value='浏览' onclick='"+path+".click()'>"+
							"<input type='hidden' id="+qualityReport+" name="+qualityReport+" class='qualityReport' value=''/>"+
							"<span>环境检测报告：</span>"+
							"<i>*</i>"+
						"</div>"+
						"<div class='li comm4'>"+
				  			"<div id="+out_zs1+" onclick='"+dian_zs1+".click()' class='zhengs1'></div>"+
							"<input type='hidden' id="+yin_zs1+"  name="+yin_zs1+" class='tutu_zs' value='' />"+
				  			"<div id="+out_zs2+" onclick='"+dian_zs2+".click()' class='zhengs2'></div>"+
							"<input type='hidden' id="+yin_zs2+"  name="+yin_zs2+" class='tutu_zs' value='' />"+
				  			"<span>所取得的证书：</span>"+
				  		"</div>"+
				  		"<div class='li comm1'>"+
				  			"<div id="+out_zs3+" onclick='"+dian_zs3+".click()' class='zhengs3'></div>"+
							"<input type='hidden' id="+yin_zs3+"  name="+yin_zs3+" value='' class='tutu_zs' />"+
				  			"<div id="+out_zs4+" onclick='"+dian_zs4+".click()' class='zhengs4'></div>"+
							"<input type='hidden' id="+yin_zs4+"  name="+yin_zs4+"  value='' class='tutu_zs' />"+
				  		"</div>"+
						"<div class='li comm2'>"+
							"<div id="+pics1view+" class='xiang3' onclick='"+pics1tudian+".click()'></div>"+
							"<input type='hidden' id="+pics1yin+" name="+pics1yin+" class='tutu'  value='' />"+
							"<div id="+pics2view+" class='xiang2' onclick='"+pics2tudian+".click()'></div>"+
							"<input type='hidden' id="+pics2yin+" name="+pics2yin+" class='tutu' value='' />"+
							"<span>产品详情图片：</span>"+
							"<i>*</i>"+
						"</div>"+
						"<div class='li comm3'>"+
							"<div id="+pics3view+" class='xiang3' onclick='"+pics3tudian+".click()'></div>"+
							"<input type='hidden' id="+pics3yin+" name="+pics3yin+" class='tutu' value='' />"+
							"<div id="+pics4view+" class='xiang4' onclick='"+pics4tudian+".click()'></div>"+
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
		
		var out_shangbiao_=out_shangbiao;
		var form_shangbiao_="#"+form_shangbiao;
		var yin_shangbiao_="#"+yin_shangbiao;
		
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
		/*产品规格隐藏表单*/
		var $guige_tu=$("<form id="+formone+" action='javascript:up_1' method= 'post' enctype ='multipart/form-data' style='display: none;'>"+ 
							"<input type='file' accept='image/*' id="+previewtudian+" name="+previewtudian+" onchange=\"up(this,\'"+preview_+"\',\'"+formone_+"\',\'"+specyin_+"\')\" type='hidden'/>"+
						"</form>");
		/*产品质量报告隐藏表单*/
		var $c_baogao_file=$("<form id="+form+" action='javascript:up_1' method= 'post' enctype ='multipart/form-data' style='display: none;'>"+
				   				"<input type='file' accept='.doc,.pdf' id="+path+" name="+path+" class='path' onchange=\"upfile(\'"+form_+"\',\'"+upfile_+"\',\'"+path_+"\',\'"+qualityReport_+"\')\"/>"+
				   			"</form>");
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
						
						
				   			
		/*产品详情图片1~4隐藏表单*/
		var $pics1_tu=$("<form id="+pics1form+" action='javascript:up_1' method= 'post' enctype ='multipart/form-data' style='display: none;'>"+ 
							"<input type='file' accept='image/*' id="+pics1tudian+" name="+pics1tudian+" onchange=\"up(this,\'"+pics1view_+"\',\'"+pics1form_+"\',\'"+pics1yin_+"\')\" type='hidden'/>"+
						"</form>");
		var $pics2_tu=$("<form id="+pics2form+" action='javascript:up_1' method= 'post' enctype ='multipart/form-data' style='display: none;'>"+ 
							"<input type='file' accept='image/*' id="+pics2tudian+" name="+pics2tudian+" onchange=\"up(this,\'"+pics2view_+"\',\'"+pics2form_+"\',\'"+pics2yin_+"\')\" type='hidden'/>"+
						"</form>");
		var $pics3_tu=$("<form id="+pics3form+" action='javascript:up_1' method= 'post' enctype ='multipart/form-data' style='display: none;'>"+ 
							"<input type='file' accept='image/*' id="+pics3tudian+" name="+pics3tudian+" onchange=\"up(this,\'"+pics3view_+"\',\'"+pics3form_+"\',\'"+pics3yin_+"\')\" type='hidden'/>"+
						"</form>");
		var $pics4_tu=$("<form id="+pics4form+" action='javascript:up_1' method= 'post' enctype ='multipart/form-data' style='display: none;'>"+ 
							"<input type='file' accept='image/*' id="+pics4tudian+" name="+pics4tudian+" onchange=\"up(this,\'"+pics4view_+"\',\'"+pics4form_+"\',\'"+pics4yin_+"\')\" type='hidden'/>"+
						"</form>");
		var $body = $("body");
		$body.append($shangbiao_tu);
		$body.append($c_baogao_file);
		$body.append($guige_tu);
		$body.append($zs1_tu);
		$body.append($zs2_tu);
		$body.append($zs3_tu);
		$body.append($zs4_tu);
		
		$body.append($pics1_tu);
		$body.append($pics2_tu);
		$body.append($pics3_tu);
		$body.append($pics4_tu);
		index2++;
	};
	function product_reduce(){
		if($(".product").children().length>2){
			$(".product").children("div.out:last").remove();
		}
		
	};
	


/*onload之外*/
/*图片上传方法*/
var img_base="";
var img_base_url="";
var url ="http://192.168.3.29:8082/web/file/upload";
function up(file,preview_1,up_1,businessLicenseImg){
	var prevDiv = document.getElementById(preview_1);
	if (file.files && file.files[0]){
		var reader = new FileReader();  
		reader.onload = function(evt){
		 	prevDiv.innerHTML = '<img src="' + evt.target.result + '" />';
		 	img_base='<img src="' + evt.target.result + '" />';
		}    
		reader.readAsDataURL(file.files[0]);  
	}else{  
		 prevDiv.innerHTML = img_base;  
	}
	
	/*$(up_1).ajaxSubmit({	  
		type : "post",
		url : url,
		data : $(up_1).serialize(),
		dataType : "json",
		success : function(result) {
			if(result.body.fileUrl){
				$(businessLicenseImg).val(result.body.fileUrl);
				img_base_url=result.body.fileUrl;
			}else{
				$(businessLicenseImg).val(img_base_url);
			}
			
		},
		error : function() {
			alert("提交失败！");
		}
	});*/
}

/*文件上传方法*/
/*up:form表单 id
upfile:选择的文件 id
inp:input=file的路径 id 
yin:隐藏之后要提交的 id*/
var up_file="";
var up_file_url="";
function upfile(up,upfile,inp,yin){
	if($(inp).val()){
		$(upfile).html($(inp).val());
		up_file=$(inp).val();
	}else{
		$(upfile).html(up_file);
	}
	/*$(up).ajaxSubmit({	  
		type : "post",
		url : url,
		data : $(up).serialize(),
		dataType : "json",
		success : function(result){
			if(result.body.fileUrl){
				$(yin).val(result.body.fileUrl);
				up_file_url=result.body.fileUrl;
			}else{
				$(yin).val(up_file_url);
			}
		},
		error : function(){
			alert("提交失败！");
		}
	});*/
}



/*添加其他资料方法*/
var ind=1;
function add_other(){
	var index5="_other"+ind;
	var dian="dian"+index5;//浏览按钮
	var hidden="hidden"+index5;//隐藏的input标签
	var form="form"+index5;//隐藏的表单
	var upfile="upfile"+index5;//a标签的地址内容
	var $list=$(
		"<div class='li huanj'>"+
  			"<img src='img/shanchu_xiao.png' onclick='reduce_other(this)' />"+
  			"<a  size='20' id="+upfile+">未选择任何文件</a> "+
  			"<input type='button'  value='浏览'  onclick='"+dian+".click()'>"+ 
  			"<input type='hidden' id="+hidden+" />"+
			"<input type='text' placeholder='其他资料'/>"+
		"</div>");
	$("#huanj").after($list);
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
function reduce_other(dom){
	$(dom).parent(".huanj").remove();
	
}

/*添加法律意见书方法*/
var inde=1;
function add_falv(){
	var index4="_falv"+inde;
	var dian="dian"+index4;//浏览按钮
	var hidden="hidden"+index4;//隐藏的input标签
	var form="form"+index4;//隐藏的表单
	var upfile="upfile"+index4;//a标签的地址内容
	var $list=$(
		"<div class='li fa'>"+
  			"<img src='img/shanchu_xiao.png' onclick='reduce_falv(this)' />"+
  			"<a  size='20' id="+upfile+">未选择任何文件</a> "+
  			"<input type='button'  value='浏览'  onclick='"+dian+".click()'>"+ 
  			"<input type='hidden' id="+hidden+" class='falv_hidden' />"+
			"<input type='text' placeholder='法律意见书' class='falv_hidden' />"+
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
	inde++;
}
function reduce_falv(dom){
	$(dom).parent(".fa").remove();
	
}

/*推荐意见书推荐添加按钮事件*/
var index3=1;
function add_yijian(){
	var dian="dian_yijian"+index3;//浏览按钮
	var hidden="hidden_yijian"+index3;//隐藏的input标签
	var form="form_yijian"+index3;//隐藏的表单
	var upfile="upfile_yijian"+index3;//a标签的地址内容
	var $list=$(
		"<div class='li yij'>"+
  			"<img src='img/shanchu_xiao.png' onclick='reduce_yijian(this)' />"+
  			"<a  size='20' id="+upfile+">未选择任何文件</a> "+
  			"<input type='button'  value='浏览'  onclick='"+dian+".click()'>"+ 
  			"<input type='hidden' id="+hidden+" class='tj_hidden' />"+
			"<input type='text' placeholder='推荐意见书附件' class='tj_hidden'  />"+
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
	index3++;
}
/*推荐意见书推荐减少按钮事件*/
function reduce_yijian(dom){
	$(dom).parent(".yij").remove();
}

/*总提交*/
function zong(){
		alert("数据已经提交了！");
		var data= {};
		if(farmId){
			data.farmId=getUrlParam("farmId");
		}
	    data.name= $("#name").val();//名字
		data.industry=$("#hangye").val();//行业
		data.province=$("#selProvince").val();//所属区域  ---省份
		data.city=$("#selCity").val();//所属区域  ---城市
		data.charger= $("#charger").val();//法人代表
		data.establishmentDate= $("#year").val()+"-"+$("#month0").val()+"-"+$("#days0").val();//成立时间
		data.hotline= $("#hotline").val();//热线电话
		data.location= $("#location").val();//公司地址
		data.logo= $("#logo").val();//公司logo
		data.introduce= $("#textarea").val();//公司介绍
		
		data.license= $("#license").val();//营业执照
		data.businessLicense= $("#businessLicense").val();//经营许可证
		data.hygieneLicense= $("#hygieneLicense").val();//卫生许可证
		data.leaseCertificate= $("#fangzi").val();//土地房屋
		data.otherLicenses= otherLicenses();//其他资质证明
		function otherLicenses(){
			var other_lic= new Array();
			if($("#otherLicenses_1").val()){
				other_lic.push($("#otherLicenses_1").val());
			}
			if($("#otherLicenses_2").val()){
				other_lic.push($("#otherLicenses_2").val());
			}
			if($("#otherLicenses_3").val()){
				other_lic.push($("#otherLicenses_3").val());
			}
			if($("#otherLicenses_4").val()){
				other_lic.push($("#otherLicenses_4").val());
			}
			if(other_lic.length==0){
				return null;
			}else{
				return other_lic.join(",");
			}
			
		}
		
		data.envAssessmentReport= $("#envAssessmentReport").val();
		data.envQualityReport= $("#envQualityReport").val();
		data.envImpactReport= $("#envImpactReport").val();
		data.otherReport= otherReport();//其他报告书
		function otherReport(){
			var otherRe=new Array();
			$(".huanjing").find(".huanj").each(function(i,n){
				if($(n).find("input[type='text']").val()&&$(n).find("input[type='hidden']").val()){
					var a={};
					if(other_id){
						a.reportId=other_id[i];
					}
					a.name=jQuery(this).find("[type='text']").val();
					a.url=jQuery(this).find("[type='hidden']").val();
					otherRe.push(a);
				}
				
			});
			if(otherRe.length==0){
				return null;
			}else{
				
				return otherRe;
			}
		}
		data.recommendation= $("#recommendation").val();//推荐意见书
		data.otherRecommendations=otherRecommendations();//其他推荐意见书
		function otherRecommendations(){
			var otherRecommend= new Array();
			$(".yijian").find(".yij").each(function(i,n){
				var a={};
				if(other_tuijian_id){
					a.reportId=other_tuijian_id[i];
				}
				a.name=jQuery(this).find("[type='text']").val();
				a.url=jQuery(this).find("[type='hidden']").val();
				otherRecommend.push(a);
			});
			if(otherRecommend.length==0){
				return null;
			}else{
				return otherRecommend;
			}
		}
		data.legalOpinion= $("#legalOpinion").val();//法律意见书
		data.otherLegalOpinions=otherLegalOpinions();//其他法律推荐意见书
		function otherLegalOpinions(){
			var otherLega=new Array();
			$(".yijian").find(".fa").each(function(i,n){
				var a={};
				if(other_falv_id){
					a.reportId=other_falv_id[i];
				}
				a.name=jQuery(this).find("[type='text']").val();
				a.url=jQuery(this).find("[type='hidden']").val();
				otherLega.push(a);
			});
			if(otherLega.length==0){
				return null;
			}else{
				return otherLega;
			}
		}
		
		data.products= new Array();
		products();
		function products(){
			$(".product").find(".out").each(function(i,n){
				var a={};
				if(produce_id){
					a.productId=produce_id[i];
				}
				a.name=jQuery(this).find(".name_").val();//产品名称
				a.trademark=jQuery(this).find(".shangbiao").val();//产品名称
				a.spec=jQuery(this).find(".spec").val();//规格
				a.estimatedYield=jQuery(this).find(".estimatedYield").val();//产品预计估量
				a.qualityReport=jQuery(this).find(".qualityReport").val();//产品质量报告
				var product =new Array();//图片详情
				jQuery(this).find(".tutu").each(function(i,n){
					product.push(n.value);
				})
				if(product.length>0){
					a.pics= product.join(",");
				}
				
				var cer = new Array();//所取得的证书
				jQuery(this).find(".tutu_zs").each(function(i,n){
					if(n.value){
						cer.push(n.value);
					}
				})
				if(cer.length==0){
					a.certificates= null;
				}else{
					a.certificates= cer.join(",");
				}
				data.products.push(a);
			});
			
		}
		/*以上数组转换为字符串格式*/
		if(isEmpty(data.otherReport)){
			data.otherReport=null;
		}else{
			data.otherReport=JSON.stringify(data.otherReport);
		}
		
		if (isEmpty(data.otherRecommendations)) {
			data.otherRecommendations=null;
		} else{
			data.otherRecommendations=JSON.stringify(data.otherRecommendations);
		}
		
		if (isEmpty(data.otherLegalOpinions)) {
			data.otherLegalOpinions=null;
		} else{
			data.otherLegalOpinions=JSON.stringify(data.otherLegalOpinions);
		}
		
		data.products=JSON.stringify(data.products);
		var url="http://192.168.3.29:8082/web/third/platform/farm/add";
		/*var url="http://192.168.3.21:8081/web/third/platform/farm/add";*/
		console.log(data);
		$.ajax({ 	  
			type : "post",
			url: url,
			data: data,
			dataType : "json",
			success : function(result){
				console.log(result);
				window.location.href = "Producer_list.html";
			},
			error: function(){
				console.log("提交失败");
			}
		});
}

