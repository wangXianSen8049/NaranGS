/**html 页面（jquery）
 * <select name="year0" id="year" ></select>
 <select name="month" id="month0" > </select>
 <select name="days" id="days0"></select>
 */



var year = ["1970","1971","1972","1973","1974","1975","1976","1977","1978","1979","1980","1981","1982","1983","1984"
   ,"1985","1986","1987","1988","1989","1990","1991","1992","1993","1994","1995","1996","1997","1998","1999",
   "2000","2001","2002","2003","2004","2005","2006","2007","2008","2009","2010","2011","2012","2013","2014","2015","2016","2017"];
    //设置省份数据
    var month=["1","2","3","4","5","6","7","8","9","10","11","12"];
   
        function setYear() {    
            //给省份下拉列表赋值    
            var option, modelVal;    
            var $sel = $("#year");
            //获取对应省份城市    
            for (var i = 0, len = year.length; i < len; i++) {    
                modelVal = year[i];    
                option = "<option value='" + modelVal + "'>" + modelVal + "</option>"; 
                //添加到 select 元素中    
                $sel.append(option);    
            }    
        } 
        function setMonth() {    
            //给省份下拉列表赋值    
            var option, modelVal;    
            var $sel = $("#month0");
            //获取对应省份城市    
            for (var i = 0, len = month.length; i < len; i++) {    
                modelVal = month[i];    
                option = "<option value='" + modelVal + "'>" + modelVal + "</option>"; 
                //添加到 select 元素中    
                $sel.append(option);    
            }    
        }  
   $(document).ready(function(){
   		setYear();
    	setMonth();
        var str="";   
        for(var i=1;i<32;i++){  
                str+="<option value=" + i + "> " + i + "</option>";  
            }  
            $(str).appendTo("#days0");  
    $("#month0").change(function(){  
        var yearstr=$("#year option:selected").val();  
        var monthstr=$("#month0 option:selected").text();  
        var str="";  
      
        if(monthstr=='1' || monthstr=='3' || monthstr=='5' || monthstr=='7' || monthstr=='8' || monthstr=='10' || monthstr=='12'){  
            $("#days0").empty();  
            for(var i=1;i<32;i++){  
                str+="<option value=" + i + "> " + i + "</option>";  
            }  
            $(str).appendTo("#days0");  
        }else if(monthstr==2){  
            $("#days0").empty();  
            if(yearstr%100!=0 && yearstr%4==0 || yearstr%100==0 && yearstr%400==0){  
                for(var i=1;i<30;i++){  
                    str+="<option value=" + i + "> " + i + "</option>";  
                }  
            }else{  
                for(var i=1;i<29;i++){  
                    str+="<option value=" + i + "> " + i + "</option>";  
                }  
            }  
            $(str).appendTo("#days0");  
        }else{  
            $("#days0").empty();  
            for(var i=1;i<31;i++){  
                str+="<option value=" + i + "> " + i + "</option>";  
            }  
            $(str).appendTo("#days0");  
            }  
});  
$("#year").change(function(){  
        var yearstr=$("#year option:selected").val();  
        var monthstr=$("#month0 option:selected").text();  
        var str="";  
         if(monthstr==2){  
            $("#days0").empty();  
            if(yearstr%100!=0 && yearstr%4==0 || yearstr%100==0 && yearstr%400==0){  
                for(var i=1;i<30;i++){  
                    str+="<option value=" + i + "> " + i + "</option>";  
                }  
            }else{  
                for(var i=1;i<29;i++){  
                    str+="<option value=" + i + "> " + i + "</option>";  
                }  
            }  
            $(str).appendTo("#days0");  
        }  
    });  
}); 