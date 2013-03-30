$().ready(function(){
	// 省市县 三级联动
	function getCityData(proviceId,areaId,cityId){
		$.each(Area['data']['province'],function(key,val){
			$('#'+proviceId).append("<option value="+key+">"+val+"</option>");
		});	
		$('#'+proviceId).change(function(){
			$('#'+areaId).html("<option value=>选择城市</option>");
			$('#'+cityId).html("<option value=>选择区县</option>");
			if($(this).val()!=0){
				var areaObj = Area['data']['city'][$(this).val()];				
				$.each(areaObj,function(key1,val1){
					$('#'+areaId).append("<option value="+key1+">"+val1+"</option>");
				})
			}
		});
		$('#'+areaId).change(function(){
			var ajaxUrl = "http://profile.blog.sohu.com/service/county.htm?cid="+$(this).val()+"vn=countyList";
			//http://profile.blog.sohu.com/service/county.htm?cid=21&vn=countyList
			$.getJSON(ajaxUrl, function(data){
				if(data!=null){
					if(data['status'] == 0){
						$.each(data['data'],function(key2,val2){
							$.each(val2,function(k3,v3){
								$('#'+cityId).append("<option value="+k3+">"+v3+"</option>");
							});
						});
					}else{
						alert("服务器链接超时，请稍后重试。");
					}
				}else{
					alert("服务器链接超时，请稍后重试。");
				}
			});
			
		});
	}
	//  年月日 选择
	function getDateData(yearId,monthId,dayId){
		var monarr =[31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
		for(var i=2011;i>1900;i--){
			$('#'+yearId).append("<option value="+i+">"+i+"</option>");
		}
		$('#'+yearId).change(function(){
			$('#'+monthId).html("<option value=>选择月份</option>");
			$('#'+dayId).html("<option value=>选择日期</option>");
			for(var i=1;i<13;i++){
				$('#'+monthId).append("<option value="+i+">"+i+"</option>");
			}
		});
		
		$('#'+monthId).change(function(){
			var year = $('#'+yearId).val();
			if (((year % 4 == 0) && (year % 100 != 0)) || (year % 400 == 0)) monarr[1] = "29";
			for(i=1;i<=monarr[$('#'+monthId).val()-1];i++){
				$('#'+dayId).append("<option value="+i+">"+i+"</option>");
			}
		});
	}
	//  出生地  市区县
	getCityData("birthProvinceId","birthCityId","birthCountyId");
	//  居住地  市区县
	getCityData("provinceId","cityId","countyId");
	// 出生日期 年月日
	getDateData("year","month","day");
	
});

