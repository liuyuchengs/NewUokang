app.controller("interactionCtrl",["$scope","$http","Tool","Ajax",function($scope,$http,Tool,Ajax){
	$scope.loading = false;
	$scope.noProductText = "";
	$scope.noProduct = false;
	$scope.hasInteractionMenu = true;
	$scope.queryParams = {
		flag:1,
		pageRows:10,
		currentPage:1
	}
	$scope.navParams = {
		kanya:{has:true,val:1},
		shumei:{has:false,val:2},
		yunsheng:{has:false,val:3}
	}
	$scope.posts = [];

	$scope.init = function(){
		Ajax.loadHost($scope,function(){
			$scope.queryPost();
		})
	}

	/*
	** 加载帖子数据
	*/
	$scope.queryPost = function(){
		$scope.loading =true;
		var url = $scope.host+"/wx/post/postList";
		var params = Tool.convertParams($scope.queryParams);
		$http.post(url,params,{
			headers:{
				'Content-type':'application/x-www-form-urlencoded;charset=UTF-8',
			}
		}).success(function(data){
			if(data.data.length<1){
				if($scope.posts.length<1){
					$scope.noProductText = "没有项目信息,请选择其他区域或者时间!";
				}else{
					$scope.noProductText = "已经没有项目了!";
				}
				$scope.noProduct = true;
			}else{
				$scope.mergePost(data.data);
				$scope.posts = $scope.posts.concat(data.data);
			}
			$scope.loading = false;
		}).error(function(){
			$scope.loading = false;
			Tool.alert($scope,"获取帖子信息失败!");
		})
	}

	/*
	** 处理帖子数据
	*/
	$scope.mergePost = function(items){
		items.forEach(function(item){
			if(item.faceImage==""||item.faceImage==null){
				item.faceImage = "../contents/temp/head-img.png";
			}
			if(item.visitNum==null||item.visitNum==""){
				item.visitNum=0;
			}
			if(item.commentNum==""||item.commentNum==null){
				item.commentNum = 0;
			}
			for(var index in item.list2){
				if(item.list2[index]==""||item.list2[index]==null){
					item.list2.splice(index,1);
				}
			}
		})
	}

	/*
	** 加载下一页数据
	*/
	$scope.loadNext = function(){
		$scope.queryParams.currentPage++;
		$scope.queryPost();
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
	** 切换帖子类型
	*/
	$scope.switchNav = function(item){
		$scope.queryParams.flag = $scope.navParams[item].val;
		Tool.select(item,$scope.navParams);
		$scope.queryParams.currentPage = 1;
		$scope.noProduct = false;
		$scope.noProductText = "";
		$scope.posts = [];
		$scope.queryPost();
	}

	/*
	** 跳转到详细页面,并添加浏览次数
	*/
	$scope.detail = function(id){
		var url = "/new/htmls/interaction-detail.html#?id="+id;
		Tool.goPage(url);
	}



	/*
	** 底部按钮事件
	*/
	$scope.menuClick = function(value){
		Tool.menuClick($scope,value);
	}

}])
