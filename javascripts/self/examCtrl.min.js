app.controller("examCtrl",["$scope","$http","Tool",function($scope,$http,Tool){
	$scope.proSelect = true;
	$scope.selectValue = "product";

	$scope.switch = function(item){
		if(item!=$scope.selectValue){
			if(item=="product"){
				$scope.proSelect = true;
				$scope.selectValue = "product";
			}else{
				$scope.proSelect = false;
				$scope.selectValue = "hospital";
			}
		}
	}
}])

app.controller("examProductCtrl",["$scope","$http","Tool",function($scope,$http,Tool){
	$scope.loading = false;
	$scope.noProduct = false;
	$scope.hasBg = false;
	$scope.noProductText="";
	$scope.products = [];

	$scope.queryParams = {
		city:"深圳",
		area:"",
		professionId:5,
		itemId:"",
		order:"",
		specialty:"",
		currentPage:0,
		pageRows:10,
	}

	//菜单切换变量
	$scope.hasOrder = false;
	$scope.hasArea = false;
	$scope.hasClass = false;
	$scope.hasSex = false;
	//菜单项变量
	$scope.menuParams = {
		area:false,
		order:false,
		classes:false,
		sex:false,
	}

	$scope.orderParams = {
		default:{has:true,val:""},
		price:{has:false,val:"prefer_price asc"},
		priceDesc:{has:false,val:"prefer_price desc"},
		scoreDesc:{has:false,val:"hospital_score asc"},
		countDesc:{has:false,val:"sales desc"}
	}
	$scope.areaParams = {
		default:{has:true,val:""},
		futian:{has:false,val:"福田区"},
		nanshan:{has:false,val:"南山区"},
		luohu:{has:false,val:"罗湖区"},
		baoan:{has:false,val:"宝安区"},
		longhua:{has:false,val:"龙华新区"},
		longgang:{has:false,val:"龙岗区"},
		yantian:{has:false,val:"盐田"},
	}
	$scope.classParams = {
		default:{has:true,val:""},
		shangye:{has:false,val:75},
		changgui:{has:false,val:67},
		zhongnian:{has:false,val:69},
		laonian:{has:false,val:70},
		ruzhi:{has:false,val:71},
		yunqian:{has:false,val:72},
		qingnian:{has:false,val:68},
		ertong:{has:false,val:74},
		manbing:{has:false,val:73},
	}
	$scope.sexParams = {
		default:{has:true,val:"通用"},
		men:{has:false,val:"男"},
		women:{has:false,val:"女"},
	}

	/*
	** 下拉菜单切换
	*/
	$scope.switchMenu =function(menu){
		switch(menu){
			case "area":
				if($scope.hasOrder){
					$scope.hasOrder = false;
					$scope.menuParams.order = false;
				};
				if($scope.hasClass){
					$scope.hasClass = false;
					$scope.menuParams.classes = false;
				};
				if($scope.hasSex){
					$scope.hasSex = false;
					$scope.menuParams.sex = false;
				}
				$scope.hasArea = !$scope.hasArea;
				if($scope.hasArea){
					$scope.menuParams.area = true;
				}else{
					$scope.menuParams.area = false;
				}
				break;
			case "order":
				if($scope.hasArea){
					$scope.hasArea = false;
					$scope.menuParams.area = false;
				};
				if($scope.hasClass){
					$scope.hasClass = false;
					$scope.menuParams.classes = false;
				};
				if($scope.hasSex){
					$scope.hasSex = false;
					$scope.menuParams.sex = false;
				}
				$scope.hasOrder = !$scope.hasOrder;
				if($scope.hasOrder){
					$scope.menuParams.order = true;
				}else{
					$scope.menuParams.order = false;
				}
				break;
			case "class":
				if($scope.hasOrder){
					$scope.hasOrder = false;
					$scope.menuParams.order = false;
				};
				if($scope.hasArea){
					$scope.hasArea = false;
					$scope.menuParams.area = false;
				};
				if($scope.hasSex){
					$scope.hasSex = false;
					$scope.menuParams.sex = false;
				}
				$scope.hasClass = !$scope.hasClass;
				if($scope.hasClass){
					$scope.menuParams.classes = true;
				}else{
					$scope.menuParams.classes = false;
				}
				break;
			case "sex":
				if($scope.hasOrder){
					$scope.hasOrder = false;
					$scope.menuParams.order = false;
				};
				if($scope.hasArea){
					$scope.hasArea = false;
					$scope.menuParams.area = false;
				};
				if($scope.hasClass){
					$scope.hasClass = false;
					$scope.menuParams.classes = false;
				};
				$scope.hasSex = !$scope.hasSex;
				if($scope.hasSex){
					$scope.menuParams.sex = true;
				}else{
					$scope.menuParams.sex = false;
				}
		}
		if($scope.hasOrder||$scope.hasArea||$scope.hasClass||$scope.hasSex){
			$scope.hasBg = true;
		}else{
			$scope.hasBg = false;
		}
	}

	/*
	** 区域下拉菜单项点击
	*/
	$scope.areaSelect =function(params){
		Tool.select(params,$scope.areaParams);
		$scope.queryParams.area = $scope.areaParams[params].val;
		$scope.queryParams.currentPage = 0;
		$scope.products = [];
		$scope.noProduct = false;
		$scope.loadProduct();
		$scope.switchMenu("area");
	}

	/*
	** 排序下拉菜单项点击
	*/
	$scope.orderSelect = function(params){
		Tool.select(params,$scope.orderParams);
		$scope.queryParams.order = $scope.orderParams[params].val;
		$scope.queryParams.currentPage = 0;
		$scope.products = [];
		$scope.noProduct = false;
		$scope.loadProduct();
		$scope.switchMenu("order");
	}

	/*
	** 类别下拉菜单项点击
	*/
	$scope.classSelect = function(params){
		Tool.select(params,$scope.classParams);
		$scope.queryParams.itemId = $scope.classParams[params].val;
		$scope.queryParams.currentPage = 0;
		$scope.products = [];
		$scope.noProduct = false;
		$scope.loadProduct();
		$scope.switchMenu("class");
	}

	/*
	** 性别下拉菜单项点击
	*/
	$scope.sexSelect = function(params){
		Tool.select(params,$scope.sexParams);
		$scope.queryParams.specialty = $scope.sexParams[params].val;
		$scope.queryParams.currentPage = 0;
		$scope.products = [];
		$scope.noProduct = false;
		$scope.loadProduct();
		$scope.switchMenu("sex");
	}


	/*
	** 初始化
	*/
	$scope.load = function(){
		$scope.loadProduct();
	}

	/*
	** 滚动监听
	*/
	window.onscroll = function(){
		if($scope.loading||$scope.noProduct){
			return;
		}
		var body = document.body;
	    var html = document.documentElement;
		var height = Math.max( body.scrollHeight, body.offsetHeight,html.clientHeight, html.scrollHeight, html.offsetHeight );
		if(height>window.innerHeight){
			if (height - window.scrollY - window.innerHeight < 100) {
				$scope.loadNext();
			}
		}
	}

	/*
	** 加载体检项目
	*/
	$scope.loadProduct = function(){
		$scope.loading = true;
		var url = Tool.getSession("host")+"/wx/product/querylist";
		var params = Tool.convertParams($scope.queryParams);
		$http.post(url,params,{
			headers:{
				'Content-type':'application/x-www-form-urlencoded;charset=UTF-8',
			}
		}).success(function(data){
			if(data.length<1){
				if($scope.products.length<1){
					$scope.noProductText = "没有项目信息,请选择其他区域或者时间!";
				}else{
					$scope.noProductText = "已经没有项目了!";
				}
				$scope.noProduct = true;
			}else{
				$scope.mergeProdcut(data);
				$scope.products = $scope.products.concat(data);
			}
			$scope.loading=false;
		}).error(function(){
			$scope.loading=false;
			$scope.noProduct = true;
			Tool.alert($scope,"查询数据失败，请稍后再试！");
		})
	}

	/*
	** 合并价格单位,如：元/次
	*/
	$scope.mergeProdcut = function(items){
		items.forEach(function(item){
			if(item.priceunit!=null&&item.priceunit!=""){
				item.preferPriceType = item.pricetype+"/"+item.priceunit;
			}else{
				item.preferPriceType = item.pricetype;
			}
		})
	}

	/*
	** 跳转到套餐详细页面
	*/
	$scope.detail = function(proId,hosId){
		Tool.goPage("/new/htmls/exam-detail.html#?productId="+proId+"&hospitalId="+hosId);
	}

	/*
	** 加载下一页数据
	*/
	$scope.loadNext = function(){
		$scope.queryParams.currentPage++;
		$scope.loadProduct();
	}

}])

app.controller("examHospitalCtrl",["$scope","$http","Tool",function($scope,$http,Tool){
	$scope.queryParams = {
		city:"深圳",
		area:null,
		professionId:5,
		order:null,
		currentPage:0,
		pageRows:10,
	}
	$scope.loading = false;
	$scope.noProduct = false;
	$scope.noProductText = "";
	$scope.hospitals = [];

	/*
	** 初始化页面
	*/
	$scope.load = function(){
		$scope.loadHospital();
	}

	$scope.loadHospital = function(){
		$scope.loading = true;
		var url = Tool.getSession("host")+"/wx/hospital/querylist";
		var params = Tool.convertParams($scope.queryParams);
		$http.post(url,params,{
			headers:{
				'Content-type':'application/x-www-form-urlencoded;charset=UTF-8',
			}
		}).success(function(data){
			if(data.list.length>0){
				$scope.merge(data.list);
				$scope.hospitals = $scope.hospitals.concat(data.list);
			}else{
				if($scope.hospitals.length<1){
					$scope.noProductText = "没有项目信息,请选择其他区域或者时间!";
				}else{
					$scope.noProductText = "已经没有项目了!";
				}
				$scope.noProduct = true;
			}
			$scope.loading = false;
		}).error(function(){
			$scope.loading = false;
			Tool.alert("加载数据失败，请稍后再试!");
		})
	}

	/*
	** 得分为空是显示字符串
	*/
	$scope.merge = function(items){
		items.forEach(function(item){
			if(item.score==""||item.score==null){
				item.score = "暂无评分";
			}
			if(item.logo==""||item.logo==null){
				item.logo = "../../contents/img/p_default.png"
			}
		})
	}

	/*
	** 加载下一页数据
	*/
	$scope.loadNext = function(){
		$scope.queryParams.currentPage++;
		$scope.loadProduct();
	}
}])
