app.controller("myMessageCtrl",["$scope","$http","Tool","Ajax",function($scope,$http,Tool,Ajax){
    $scope.params = {
        user:true,
        doctor:false,
        system:false
    }
    
    $scope.init = function(){
    }

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

app.controller("messageUserCtrl",["$scope","$http","Tool","Ajax",function($scope,$http,Tool,Ajax){
    $scope.queryParams = {
		pageRows:10,
		currentPage:1
	}
    $scope.messages = [];
    $scope.noProduct = false;
    $scope.noProductText = "";
    $scope.loading = false;
    $scope.init = function(){
        Ajax.loadHost($scope,function(){
            Tool.loadUserinfo($scope);
            $scope.queryMessage();
        })
    }
    /**
     * 查询消息
     */
    $scope.queryMessage = function(){
        var url = $scope.host+"/wx/repliesMessage/myMessage";
        var params = Tool.convertParams($scope.queryParams);
        $scope.loading = true;
        $http.post(url,params,{
            headers:{
				'Content-type':'application/x-www-form-urlencoded;charset=UTF-8',
                'accessToken':$scope.userInfo.accessToken,
			}
        }).success(function(data){
            if(data.code==0){
                if(data.data.length<1){
                    if($scope.messages.length<1){
                        $scope.noProductText = "您还没有消息!";
                    }else{
                        $scope.noProductText = "已经没有了!";
                    }
                    $scope.noProduct = true;
                }else{
                    $scope.mergeMessage(data.data);
                    $scope.messages = $scope.messages.concat(data.data);
                }
            }else{
                Tool.alert($scope,"获取消息失败，请稍后再试!");
            }
            $scope.loading = false;
        }).error(function(){
            $scope.loading = false;
            Tool.alert($scope,"获取消息失败，请稍后再试!");
        })
    }

    /**
     * 检查消息数据
     */
    $scope.mergeMessage = function(items){
        items.forEach(function(item){
            item.dataStr = item.createDateStr.slice(5,10);
        })
    }
    /*
	** 加载下一页数据
	*/
	$scope.loadNext = function(){
		$scope.queryParams.currentPage++;
		$scope.queryMessage();
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

app.controller("messageDoctorCtrl",["$scope","$http","Ajax","Tool",function($scope,$http,Ajax,Tool){
    $scope.queryParams = {
		pageRows:10,
		currentPage:1
	}
    $scope.messages = [];
    $scope.noProduct = false;
    $scope.noProductText = "";
    $scope.loading = false;
    $scope.init = function(){
        Ajax.loadHost($scope,function(){
            Tool.loadUserinfo($scope);
            $scope.queryParams.accessToken = $scope.userInfo.accessToken;
            $scope.queryMessage();
        })
    }
    /**
     * 查询消息
     */
    $scope.queryMessage = function(){
        var url = $scope.host+"/wx/post/doctorMessage";
        var params = Tool.convertParams($scope.queryParams);
        $scope.loading = true;
        $http.post(url,params,{
            headers:{
				'Content-type':'application/x-www-form-urlencoded;charset=UTF-8',
                'accessToken':$scope.userInfo.accessToken,
			}
        }).success(function(data){
            if(data.code==0){
                if(data.data.length<1){
                    if($scope.messages.length<1){
                        $scope.noProductText = "您还没有消息!";
                    }else{
                        $scope.noProductText = "已经没有了!";
                    }
                    $scope.noProduct = true;
                }else{
                    $scope.mergeMessage(data.data);
                    $scope.messages = $scope.messages.concat(data.data);
                }
            }else{
                Tool.alert($scope,"获取消息失败，请稍后再试!");
            }
            $scope.loading = false;
        }).error(function(){
            $scope.loading = false;
            Tool.alert($scope,"获取消息失败，请稍后再试!");
        })
    }

    /**
     * 检查消息数据
     */
    $scope.mergeMessage = function(items){
        items.forEach(function(item){
            item.dataStr = item.createTimeStr.slice(5,10);
            item.postIntro = "："+item.postIntro;
            if(item.postState==1){
                item.noReply = false;
            }else{
                item.noReply = true;
            }
        })
    }
    /*
	** 加载下一页数据
	*/
	$scope.loadNext = function(){
		$scope.queryParams.currentPage++;
		$scope.queryMessage();
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
     * 跳转到咨询页面
     */
    $scope.detail = function(id){
        Tool.goPage("/new/htmls/askdoctor.html#?id="+id);
    }

}])

app.controller("messageSystemCtrl",["$scope","$http","Ajax","Tool",function($scope,$http,Ajax,Tool){}])