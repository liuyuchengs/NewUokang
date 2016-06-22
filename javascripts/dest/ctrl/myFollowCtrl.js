/**
 * 关注页面外层控制器
 */
app.controller("myFollowCtrl",["$scope","$http","Tool","Ajax",function($scope,$http,Tool,Ajax){
    //导航条变量
    $scope.params = {
        doctor:false,
        user:true,
        product:false
    }

    //切换导航条
    $scope.switch = function(item){
        for(var proto in $scope.params){
            if(proto==item){
                $scope.params[proto] = true;
            }else{
                $scope.params[proto] = false;
            }
        }
    }

    
}])

/**
 * 关注用户控制器
 */
app.controller("followUserCtrl",["$scope","$http","Tool","Ajax",function($scope,$http,Tool,Ajax){
    $scope.queryParams = {
		pageRows:10,
		currentPage:1,
        flag:1
	}
    $scope.follows = [];
    $scope.noProduct = false;
    $scope.noProductText = "";
    $scope.loading = false;
    $scope.init = function(){
        Ajax.loadHost($scope,function(){
            Tool.loadUserinfo($scope);
            $scope.queryUser();
        })
    }

    // 查询关注的数据,flag：1-》关注的人,flag:2->关注医生,flag:3->关注项目
    $scope.queryUser = function(){
        var url = $scope.host+"/wx/focus/focusUserMan";
        var params = Tool.convertParams($scope.queryParams);
        $scope.loading = true;
        $http.post(url,params,{
            headers:{
				'Content-type':'application/x-www-form-urlencoded;charset=UTF-8',
                'accessToken':$scope.userInfo.accessToken,
			}
        }).success(function(data){
            if(data.code===0){
                if(data.data.length<1){
                    if($scope.follows.length<1){
                        $scope.noProductText = "您还没有关注其他人!";
                    }else{
                        $scope.noProductText = "已经没有了!";
                    }
                    $scope.noProduct = true;
                }else{
                    data.data.forEach(function(item){
                        item.hasFollow = true;
                        item.followText = "已关注";
                    });
                    $scope.follows = $scope.follows.concat(data.data);
                }
            }else{
                Tool.alert($scope,"数据连接失败，请稍后再试!");
            }
            $scope.loading = false;
        }).error(function(){
            $scope.loading = true;
            Tool.alert($scope,"数据连接失败，请稍后再试!");
        })
    }

    // 关注按钮处理函数
	$scope.switchFollow = function(id){
		if(!Tool.isLogin()){
			Tool.comfirm($scope,"请先登录!",function(){
				Tool.goPage("/new/htmls/login.html");
			})
		}else{
			Tool.loadUserinfo($scope);
            if($scope.selectFollow(id)){
                var follow = $scope.selectFollow(id);
                if(follow.hasFollow){
                    $scope.cacelFollow(id);
                }else{
                    $scope.tofollow(id);
                }
            }
		}
	}

	// 关注用户
	$scope.tofollow = function(id){
		var url = $scope.host+"/wx/post/focus";
		var params = "flag=1&userId="+id;
		$http.post(url,params,{
			headers:{
				'Content-type':'application/x-www-form-urlencoded;charset=UTF-8',
				'accessToken':$scope.userInfo.accessToken,
			}
		}).success(function(data){
			if(data.code==0){
				if($scope.selectFollow(id)){
                    var follow = $scope.selectFollow(id);
                    follow.hasFollow = true;
                    follow.followText = "已关注";
                }
			}else{
				Tool.alert($scope,"关注失败，稍后再试!");
			}
		}).error(function(){
			Tool.alert($scope,"连接数据失败，请稍后再试!");
		})
	}

	// 取消关注用户
	$scope.cacelFollow = function(id){
		var url = $scope.host+"/wx/post/cacelFocus";
		var params = "flag=1&userId="+id;
		$http.post(url,params,{
			headers:{
				'Content-type':'application/x-www-form-urlencoded;charset=UTF-8',
				'accessToken':$scope.userInfo.accessToken,
			}
		}).success(function(data){
			if(data.code==0){
				if($scope.selectFollow(id)){
                    var follow = $scope.selectFollow(id);
                    follow.hasFollow = false;
                    follow.followText = "关注";
                }
			}else{
				Tool.alert($scope,"取消关注失败，稍后再试!");
			}
		}).error(function(){
			Tool.alert($scope,"连接数据失败，稍后再试!");
		})
	}

    //定位具体的关注元素
    $scope.selectFollow = function(id){
        for(var proto in $scope.follows){
            var follow = $scope.follows[proto];
            if(follow.id == id){
                return follow;
            }
        }
    }

    // 加载下一页数据
	$scope.loadNext = function(){
		$scope.queryParams.currentPage++;
		$scope.queryMessage();
	}

	// 滚动监听
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
}])

/**
 * 关注医生控制器
 */
app.controller("followDoctorCtrl",["$scope","$http","Tool","Ajax",function($scope,$http,Tool,Ajax){
    $scope.queryParams = {
		pageRows:10,
		currentPage:1
	}
    $scope.follows = [];
    $scope.noProduct = false;
    $scope.noProductText = "";
    $scope.loading = false;
    $scope.init = function(){
        Ajax.loadHost($scope,function(){
            Tool.loadUserinfo($scope);
            $scope.queryDoctor();
        })
    }

    // 查询关注的数据,flag：1-》关注的人,flag:2->关注医生,flag:3->关注项目
    $scope.queryDoctor = function(){
        $scope.loading = true;
        var url = $scope.host+"/wx/focus/focusDoctorMan";
        var params = Tool.convertParams($scope.queryParams);
        params += "&flag=2";
        $http.post(url,params,{
            headers:{
				'Content-type':'application/x-www-form-urlencoded;charset=UTF-8',
                'accessToken':$scope.userInfo.accessToken,
			}
        }).success(function(data){
            if(data.code===0){
                if(data.data.length<1){
                    if($scope.follows.length<1){
                        $scope.noProductText = "您还没有关注医生!";
                    }else{
                        $scope.noProductText = "已经没有了!";
                    }
                    $scope.noProduct = true;
                }else{
                    data.data.forEach(function(item){
                        item.hasFollow = true;
                        item.followText = "已关注";
                        if(item.face===null||item.face===""){
                            item.face = "../contents/img/doc-head.png";
                        }
                    })
                    $scope.follows = $scope.follows.concat(data.data);
                }
            }else{
                Tool.alert($scope,"数据连接失败，请稍后再试!");
            }
            $scope.loading = false;
        }).error(function(){
            $scope.loading = false;
            Tool.alert($scope,"连接数据失败,请稍后再试!");
        })
    }

    // 关注按钮处理函数
	$scope.switchFollow = function(id){
		if(!Tool.isLogin()){
			Tool.comfirm($scope,"请先登录!",function(){
				Tool.goPage("/new/htmls/login.html");
			})
		}else{
			Tool.loadUserinfo($scope);
            if($scope.selectFollow(id)){
                var follow = $scope.selectFollow(id);
                if(follow.hasFollow){
                    $scope.cacelFollow(id);
                }else{
                    $scope.tofollow(id);
                }
            }
		}
	}

	// 关注医生
	$scope.tofollow = function(id){
        $scope.loading = true;
		var url = $scope.host+"/wx/post/focus";
		var params = "flag=2&userId="+id;
		$http.post(url,params,{
			headers:{
				'Content-type':'application/x-www-form-urlencoded;charset=UTF-8',
				'accessToken':$scope.userInfo.accessToken,
			}
		}).success(function(data){
			if(data.code==0){
				if($scope.selectFollow(id)){
                    var follow = $scope.selectFollow(id);
                    follow.hasFollow = true;
                    follow.followText = "已关注";
                }
			}else{
				Tool.alert($scope,"关注失败，稍后再试!");
			}
            $scope.loading = false;
		}).error(function(){
            $scope.loading = false;
			Tool.alert($scope,"连接数据失败，请稍后再试!");
		})
	}

	// 取消关注医生
	$scope.cacelFollow = function(id){
        $scope.loading = true;
		var url = $scope.host+"/wx/post/cacelFocus";
		var params = "flag=2&userId="+id;
		$http.post(url,params,{
			headers:{
				'Content-type':'application/x-www-form-urlencoded;charset=UTF-8',
				'accessToken':$scope.userInfo.accessToken,
			}
		}).success(function(data){
			if(data.code==0){
				if($scope.selectFollow(id)){
                    var follow = $scope.selectFollow(id);
                    follow.hasFollow = false;
                    follow.followText = "关注";
                }
			}else{
				Tool.alert($scope,"取消关注失败，稍后再试!");
			}
            $scope.loading = false;
		}).error(function(){
            $scope.loading = false;
			Tool.alert($scope,"连接数据失败，稍后再试!");
		})
	}

    // 定位到具体的关注元素
    $scope.selectFollow = function(id){
        for(var proto in $scope.follows){
            var follow = $scope.follows[proto];
            if(follow.id == id){
                return follow;
            }
        }
    }

    // 加载下一页数据
	$scope.loadNext = function(){
		$scope.queryParams.currentPage++;
		$scope.queryDoctor();
	}

	// 滚动监听
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

}])

/**
 * 关注项目页面
 */
app.controller("followProductCtrl",["$scope","$http","Tool","Ajax",function($scope,$http,Tool,Ajax){
    $scope.queryParams = {
		pageRows:10,
		currentPage:1
	}
    $scope.follows = [];
    $scope.noProduct = false;
    $scope.noProductText = "";
    $scope.loading = false;
    $scope.init = function(){
        Ajax.loadHost($scope,function(){
            Tool.loadUserinfo($scope);
            $scope.queryProduct();
        })
    }

    // 查询关注的数据,flag：1-》关注的人,flag:2->关注医生,flag:3->关注项目
    $scope.queryProduct = function(){
        $scope.loading = true;
        var url = $scope.host+"/wx/focus/focusProductMan";
        var params = Tool.convertParams($scope.queryParams);
        params += "&flag=3";
        $http.post(url,params,{
            headers:{
				'Content-type':'application/x-www-form-urlencoded;charset=UTF-8',
                'accessToken':$scope.userInfo.accessToken,
			}
        }).success(function(data){
            if(data.code===0){
                if(data.data.length<1){
                    if($scope.follows.length<1){
                        $scope.noProductText = "您还没有关注项目!";
                    }else{
                        $scope.noProductText = "已经没有了!";
                    }
                    $scope.noProduct = true;
                }else{
                    data.data.forEach(function(item){
                        item.hasFollow = true;
                        item.followText = "已关注";
                    });
                    $scope.follows = $scope.follows.concat(data.data);
                }
            }else{
                Tool.alert($scope,"数据连接失败，请稍后再试!");
            }
            $scope.loading = false;
        }).error(function(){
            $scope.loading = false;
            Tool.alert($scope,"连接数据失败,请稍后再试!");
        })
    }
    
    // 关注按钮处理函数
	$scope.switchFollow = function(id){
		if(!Tool.isLogin()){
			Tool.comfirm($scope,"请先登录!",function(){
				Tool.goPage("/new/htmls/login.html");
			})
		}else{
			Tool.loadUserinfo($scope);
            if($scope.selectFollow(id)){
                var follow = $scope.selectFollow(id);
                if(follow.hasFollow){
                    $scope.cacelFollow(id);
                }else{
                    $scope.tofollow(id);
                }
            }
		}
	}

	// 关注项目
	$scope.tofollow = function(id){
        $scope.loading = true;
		var url = $scope.host+"/wx/post/focus";
		var params = "flag=3&userId="+id;
		$http.post(url,params,{
			headers:{
				'Content-type':'application/x-www-form-urlencoded;charset=UTF-8',
				'accessToken':$scope.userInfo.accessToken,
			}
		}).success(function(data){
			if(data.code==0){
				if($scope.selectFollow(id)){
                    var follow = $scope.selectFollow(id);
                    follow.hasFollow = true;
                    follow.followText = "已关注";
                }
			}else{
				Tool.alert($scope,"关注失败，稍后再试!");
			}
            $scope.loading = false;
		}).error(function(){
            $scope.loading = false;
			Tool.alert($scope,"连接数据失败，请稍后再试!");
		})
	}

	// 取消关注项目
	$scope.cacelFollow = function(id){
        $scope.loading = true;
		var url = $scope.host+"/wx/post/cacelFocus";
		var params = "flag=3&userId="+id;
		$http.post(url,params,{
			headers:{
				'Content-type':'application/x-www-form-urlencoded;charset=UTF-8',
				'accessToken':$scope.userInfo.accessToken,
			}
		}).success(function(data){
			if(data.code==0){
				if($scope.selectFollow(id)){
                    var follow = $scope.selectFollow(id);
                    follow.hasFollow = false;
                    follow.followText = "关注";
                }
			}else{
				Tool.alert($scope,"取消关注失败，稍后再试!");
			}
            $scope.loading = false;
		}).error(function(){
            $scope.loading = false;
			Tool.alert($scope,"连接数据失败，稍后再试!");
		})
	}

    //定位具体的关注元素
    $scope.selectFollow = function(id){
        for(var proto in $scope.follows){
            var follow = $scope.follows[proto];
            if(follow.id == id){
                return follow;
            }
        }
    }

    // 加载下一页数据
	$scope.loadNext = function(){
		$scope.queryParams.currentPage++;
		$scope.queryProduct();
	}

	// 滚动监听
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
}])