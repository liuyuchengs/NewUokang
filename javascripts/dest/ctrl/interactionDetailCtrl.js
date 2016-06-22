app.controller("interactionDetailCtrl",["$scope","$http","$location","Tool","Ajax",function($scope,$http,$location,Tool,Ajax){
	$scope.loading = false;
	$scope.post = {};
	$scope.replyMess = {};
	$scope.showReplyInputId = null;
	$scope.showPostinput = false;
	$scope.messageId = null; //评论id
	$scope.replyId = null; //被回复人id
	//回复输入框提示本文
	$scope.inputStyle = "输入你的回复...";
	$scope.noProduct = false;
	$scope.noProductText = "";
	$scope.postId = "";
	$scope.follow = {
		hasFollow:false,
		followText:"关注"
	}
	$scope.queryParams = {
		id:"",
		pageRows:10,
		currentPage:1
	}
	// 页面初始化
	$scope.init =function(){
		Ajax.loadHost($scope,function(){		
			$scope.getQueryString();
			$scope.queryPost();
			$scope.queryMessage();
		})
	}

	// 获取帖子id
	$scope.getQueryString = function(){
		if($location.search().id){
			$scope.postId = $location.search().id;
			$scope.queryParams.id = $location.search().id;
		}else{
			Tool.goPage("/new/htmls/interaction.html");
		}
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

	// 加载下一页数据
	$scope.loadNext = function(){
		$scope.queryParams.currentPage++;
		$scope.queryMessage();
	}

	// 获取帖子详细信息
	$scope.queryPost = function(){
		$scope.loading = true;
		var url  = $scope.host+"/wx/post/postDetail";
		var params = "id="+$scope.postId;
		if(Tool.isLogin()){
			Tool.loadUserinfo($scope);
			params += "&accessToken="+$scope.userInfo.accessToken;
		}
		$http.post(url,params,{
			headers:{
				'Content-type':'application/x-www-form-urlencoded;charset=UTF-8',
			}
		}).success(function(data){
			if(data.code==0){
				$scope.post = data.data;
				if(data.data.focusState===1){
					$scope.follow.hasFollow = true;
					$scope.follow.followText = "已关注"
				}
				if($scope.post.faceImage===null||$scope.post.faceImage===""){
					if($scope.post.sex==="男"||$scope.post.sex===null||$scope.post.sex===""){
						$scope.post.faceImage = "../contents/img/men-head.png";
					}else{
						$scope.post.faceImage = "../contents/img/women-head.png";
					}
				}
			}else{
				Tool.alert($scope,data.message);
			}
			$scope.loading = false;
		}).error(function(){
			$scope.loading = false;
			Tool.alert($scope,"帖子信息加载失败!");
		})
	}

	// 查询评论信息
	$scope.queryMessage = function(){
		$scope.loading = true;
		var url = $scope.host+"/wx/post/postMessage";
		var params = Tool.convertParams($scope.queryParams);
		$http.post(url,params,{
			headers:{
				'Content-type':'application/x-www-form-urlencoded;charset=UTF-8',
			}
		}).success(function(data){
			if(data.code==0){
				if(data.data.commentList.length<1){
					$scope.noProduct = true;
				}
				$scope.mergeMessage(data.data);
				if($scope.replyMess.commentList){
					$scope.replyMess.commentList =  $scope.replyMess.commentList.concat(data.data.commentList);
				}else{
					$scope.replyMess = data.data;
				}
			}else{
				Tool.alert($scope,"连接数据失败，请稍后再试!");
			}
			$scope.loading = false;
		}).error(function(){
			$scope.loading = false;
			Tool.alert($scope,"连接数据失败，请稍后再试!");
		})
	}

	// 检查评论信息
	$scope.mergeMessage = function(post){
		post.message = "";
		var comment  = post.commentList;
		if($scope.replyMess.commentList){
			var counts = $scope.replyMess.commentList.length;
		}else{
			var counts = 0;
		}
		if(comment.length>0){
			for(var outIndex in comment){
				var reply = comment[outIndex];
				reply.count = counts+1;
				counts++;
				reply.hasReplyInput = false;
				reply.message = "";
				if(reply.createDateStr){
					reply.createDateStr =  reply.createDateStr.trim();
					reply.createDateStr = reply.createDateStr.slice(5,10);
				}
				if(parseInt(reply.praiseNum)<1){
					reply.praiseNum = "点赞";
				}
				if(reply.repliesMessageList.length>0){
					reply.hasReply=true;
					var replyList = reply.repliesMessageList;
					for(var inIndex in replyList){
						var replyListItem = replyList[inIndex];
						if(replyListItem.replyName==""||replyListItem.replyName==null){
							replyListItem.isReply = false;
						}else{
							replyListItem.isReply = true;
						}
					}
				}else{
					reply.hasReply=false;
				}
			}
		}
	}

	// 检查是否登录
	$scope.checkLogin = function(){
		if(!Tool.isLogin()){
			Tool.comfirm($scope,"请先登录！",function(){
				Tool.goPage("/new/htmls/login.html");
			})
			return false;
		}else{
			Tool.loadUserinfo($scope);
			return true;
		}
	}

	// 点赞，flag:0->帖子,flag:1->评论
	$scope.thumb = function(id,flag){
		if($scope.checkLogin()){
			var reply = "";
			if(flag==0){
				reply = $scope.post;
			}else{
				for(var index in $scope.replyMess.commentList){
					if($scope.replyMess.commentList[index].id==id){
						reply = $scope.replyMess.commentList[index];
					}
				}
			}
			var url = $scope.host+"/wx/post/thumbUp";
			var params = "postId="+id+"&flag="+flag;
			$http.post(url,params,{
				headers:{
					'Content-type':'application/x-www-form-urlencoded;charset=UTF-8',
					'accessToken':$scope.userInfo.accessToken,
				}
			}).success(function(data){
				if(data.code==0){
					reply.praiseNum = data.data;
				}else if(data.code==1){
					Tool.alert($scope,data.message);
				}
			}).error(function(){
				Tool.alert($scope,"连接数据失败，请稍后再试!");
			})
		}
	}

	// 显示评论回复输入框
	$scope.showReplyInput = function(id,replyId,replyName){
		if($scope.checkLogin()){
			if($scope.showReplyInputId!=id){
				var post = $scope.replyMess;
				$scope.messageId = id;
				if(replyId&&replyId!=$scope.userInfo.id){
					$scope.replyId = replyId;
				}
				if($scope.showReplyInputId==null){
					for(var index in post.commentList){
						if(post.commentList[index].id==id){
							post.commentList[index].hasReplyInput = true;
							$scope.inputStyle = "输入你的回复...";
							if(replyId && replyId != $scope.userInfo.id){
								$scope.inputStyle= "回复 "+replyName+": ";
							}
						}
					}
				}else{
					for(var index in post.commentList){
						if(post.commentList[index].id==id){
							post.commentList[index].hasReplyInput = true;
							$scope.inputStyle = "输入你的回复...";
							if(replyId && replyId != $scope.userInfo.id){
								$scope.inputStyle = "回复 "+replyName+": ";
							}
						}
						if(post.commentList[index].id==$scope.showReplyInputId){
							post.commentList[index].hasReplyInput = false;
						}
					}
				}
				$scope.showReplyInputId = id;
			}
		}
	}

	// 显示评论输入框
	$scope.showPostInput = function(){
		if($scope.checkLogin()){
			if($scope.showPostinput == false){
				$scope.showPostinput = true;
			}
		}
	}

	// 隐藏评论输入框
	$scope.hidePostInput = function(){
		if($scope.showPostinput ==true){
			$scope.showPostinput = false;
			$scope.post.message = "";
		}
	}

	// 隐藏评论回复输入框
	$scope.hideReplyInput = function(id){
		var post = $scope.replyMess;
		for(var index in post.commentList){
			if(post.commentList[index].id==id){
				post.commentList[index].hasReplyInput = false;
				post.commentList[index].message = "";
				$scope.inputStyle= "输入你的回复...";
			}
		}
		if($scope.showReplyInputId){
			$scope.showReplyInputId = null;
		}
		if($scope.messageId){
			$scope.messageId = null; //评论id
		}
		if($scope.replyId){
			$scope.replyId = null; //被回复人id
		}
	}

	// 发表评论
	$scope.sendPost = function(content){
		if(content==""||content==null){
			Tool.alert($scope,"消息为空!");
		}else{
			var params = {
				postId:$scope.post.id,
				replyState:0,
				content:content,
				userId:$scope.userInfo.id,
			}
			var url = $scope.host+"/wx/repliesMessage/addRepliesMessage";
			var paramsStr = Tool.convertParams(params);
			$http.post(url,paramsStr,{
				headers:{
					'Content-type':'application/x-www-form-urlencoded;charset=UTF-8',
					'accessToken':$scope.userInfo.accessToken,
				}
			}).success(function(data){
				if(data.code==0){
					$scope.hidePostInput();
					data.data.count = $scope.replyMess.commentList.length+1;
					$scope.mergeNewReply(data.data);
					$scope.replyMess.commentList.push(data.data);
				}else{
					Tool.alert($scope,data.message);
				}
			}).error(function(){
				Tool.alert($scope,"连接数据失败，请稍后重试!");
			})
		}
	}

	// 检查新发表的评论信息
	$scope.mergeNewReply = function(reply){
		if(reply.userImage===null||reply.userImage===""){
			var user = Tool.getLocal("user");
			if(user.sex==="男"||user.sex===""||user.sex===null){
				reply.userImage = "../contents/img/men-head.png";
			}else{
				reply.userImage = "../contents/img/women-head.png";
			}
		}
	}

	// 发表回复
	$scope.sendReply = function(content,id){
		if(content==""||content==null){
			Tool.alert($scope,"消息为空！");
		}else{
			var params = {
				postId:$scope.post.id,
				replyState:1,
				content:content,
				userId:$scope.userInfo.id,
				messageId:$scope.messageId,
			}
			if($scope.replyId){
				params.replyId = $scope.replyId;
			}
			var url = $scope.host+"/wx/repliesMessage/addRepliesMessage";
			var paramsStr = Tool.convertParams(params);
			$http.post(url,paramsStr,{
				headers:{
					'Content-type':'application/x-www-form-urlencoded;charset=UTF-8',
					'accessToken':$scope.userInfo.accessToken,
				}
			}).success(function(data){
				if(data.code==0){
					$scope.showReplyInputId = null;
					$scope.messageId = null; //评论id
					$scope.replyId = null; //被回复人id
					$scope.hideReplyInput(id);
					for(var index in $scope.replyMess.commentList){
						if($scope.replyMess.commentList[index].id==id){
							if(data.data.replyName==""||data.data.replyName==null){
								data.data.isReply = false;
							}else{
								data.data.isReply = true;
							}
							$scope.replyMess.commentList[index].hasReply = true;
							$scope.replyMess.commentList[index].repliesMessageList.push(data.data);
							return;
						}
					}

				}else{
					Tool.alert($scope,data.message);
				}
			}).error(function(){
				Tool.alert($scope,"连接数据失败，请稍后重试!");
			})
		}
	}

	// 关注按钮处理函数
	$scope.clickFollow = function(){
		if(!Tool.isLogin()){
			Tool.comfirm($scope,"请先登录!",function(){
				Tool.goPage("/new/htmls/login.html");
			})
		}else{
			if($scope.follow.hasFollow){
				$scope.cacelFollow();
			}else{
				$scope.tofollow();
			}
		}
	}

	// 关注发帖人
	$scope.tofollow = function(){
		var url = $scope.host+"/wx/post/focus";
		var params = "flag=1&userId="+$scope.post.userId;
		$http.post(url,params,{
			headers:{
				'Content-type':'application/x-www-form-urlencoded;charset=UTF-8',
				'accessToken':$scope.userInfo.accessToken,
			}
		}).success(function(data){
			if(data.code==0){
				$scope.follow.hasFollow = true;
				$scope.follow.followText = "已关注";
			}else{
				Tool.alert($scope,"关注失败，稍后再试!");
			}
		}).error(function(){
			Tool.alert($scope,"连接数据失败，请稍后再试!");
		})
	}

	// 取消关注发帖人
	$scope.cacelFollow = function(){
		var url = $scope.host+"/wx/post/cacelFocus";
		var params = "flag=1&userId="+$scope.post.userId;
		$http.post(url,params,{
			headers:{
				'Content-type':'application/x-www-form-urlencoded;charset=UTF-8',
				'accessToken':$scope.userInfo.accessToken,
			}
		}).success(function(data){
			if(data.code==0){
				$scope.follow.hasFollow = false;
				$scope.follow.followText = "关注";
			}else{
				Tool.alert($scope,"取消关注失败，稍后再试!");
			}
		}).error(function(){
			Tool.alert($scope,"连接数据失败，稍后再试!");
		})
	}

	// 跳转到医生页面
	$scope.goDoctor = function(id){
		Tool.goPage("/new/htmls/doctor-detail.html#?id="+id);
	}

	// 跳转到项目页面
	$scope.goProduct = function(productId,hospitalId){
		Tool.goPage("/new/htmls/product-detail.html#?flag=1&productId="+productId+"&hospitalId="+hospitalId);
	}
}])
