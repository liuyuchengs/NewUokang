/// <reference path="../../../typing/angular.d.ts" />
//外层控制器
app.controller("myPostCtrl",["$scope","$http","$location","Ajax","Tool",function($scope,$http,$location,Ajax,Tool){

    $scope.params = {
        hasPublish:true,
        hasReply:false,
    }

    $scope.switch = function(p){
        if(p==="publish"){
            if(!$scope.params.hasPublish){
                $scope.params.hasPublish = true;
            }
            if($scope.params.hasReply){
                $scope.params.hasReply = false;
            }
        }
        if(p==="reply"){  
            if(!$scope.params.hasReply){
                $scope.params.hasReply = true;
            }
            if($scope.params.hasPublish){
                $scope.params.hasPublish = false;
            }
        }
    }
}])

//我帖子子页面控制器
app.controller("myPostPublishCtrl",["$scope","$http","Tool","Ajax",function($scope,$http,Tool,Ajax){
    $scope.noProduct = false;
    $scope.posts = [];
	$scope.user = {};
    $scope.queryParams = {
		pageRows:10,
		currentPage:1
	}

    $scope.init = function(){
		Ajax.loadHost($scope,function(){
            Tool.loadUserinfo($scope);
			$scope.user = Tool.getLocal("user");
            $scope.queryPost();
		})
	}

    /*
	** 加载我的帖子数据
	*/
	$scope.queryPost = function(){
		$scope.loading =true;
		var url = $scope.host+"/wx/post/myPost";
		var params = Tool.convertParams($scope.queryParams);
		$http.post(url,params,{
			headers:{
				'Content-type':'application/x-www-form-urlencoded;charset=UTF-8',
                'accessToken':$scope.userInfo.accessToken,
			}
		}).success(function(data){
			if(data.data.length<1){
				if($scope.posts.length<1){
					$scope.noProductText = "您还没有发布帖子!";
				}else{
					$scope.noProductText = "已经没有了!";
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
				if($scope.user.sex==="男"||$scope.user.sex===""||$scope.user.sex===null){
					item.faceImage = "../contents/img/men-head.png";
				}else{
					item.faceImage = "../contents/img/women-head.png";
				}
			}
			if(item.visitNum==null||item.visitNum==""){
				item.visitNum=0;
			}
			if(item.commentNum==""||item.commentNum==null){
				item.commentNum = 0;
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

    /**
     * 跳转到帖子页面
     */
    $scope.detail = function(id){
        Tool.goPage("/new/htmls/interaction-detail.html#?id="+id);
    }
}])

//我的回复子页面控制器
app.controller("myPostReplyCtrl",["$scope","$http","$q","Tool","Ajax",function($scope,$http,$q,Tool,Ajax){
    $scope.noProduct = false;
    $scope.replys = [];
	$scope.user = {};
    $scope.queryParams = {
		pageRows:10,
		currentPage:1
	}

    $scope.init = function(){
		Ajax.loadHost($scope,function(){
            Tool.loadUserinfo($scope);
			$scope.user = Tool.getLocal("user");
            $scope.queryReply();
		})
	}

    $scope.queryReply = function(){
        $scope.loading =true;
		var url = $scope.host+"/wx/repliesMessage/myReply";
		var params = Tool.convertParams($scope.queryParams);
		$http.post(url,params,{
			headers:{
				'Content-type':'application/x-www-form-urlencoded;charset=UTF-8',
                'accessToken':$scope.userInfo.accessToken,
			}
		}).success(function(data){
            if(data.code===0){
                if(data.data.length<1){
                    if($scope.replys.length<1){
                        $scope.noProductText = "您还没有评论哦!";
                    }else{
                        $scope.noProductText = "已经没有评论了!";
                    }
                    $scope.noProduct = true;
                }else{
                    $scope.mergeReply(data.data);
                    $scope.replys = $scope.replys.concat(data.data);
                }
            }else{
                Tool.alert($scope,"获取评论信息失败!");
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
	$scope.mergeReply = function(items){
		items.forEach(function(item){
			if(item.userImage==""||item.userImage==null){
				if($scope.user.sex==="男"||$scope.user.sex===""|$scope.user.sex===null){
					item.userImage = "../contents/img/men-head.png";
				}else{
					item.userImage = "../contents/img/women-head.png";
				}
			}
            item.dataStr = item.createDateStr.slice(5,10);
		})
	}

    /*
	** 加载下一页数据
	*/
	$scope.loadNext = function(){
		$scope.queryParams.currentPage++;
		$scope.queryReply();
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

    /**
     * 跳转到帖子页面
     */
    $scope.goPost = function(id){
        Tool.goPage("/new/htmls/interaction-detail.html#?id="+id);
    }
}])