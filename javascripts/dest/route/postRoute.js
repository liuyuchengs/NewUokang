/*
** 我的帖子页面路由
*/
app.config(["$routeProvider",function($routeProvider){
	$routeProvider.when("/post",{
		templateUrl:"section/mypost-publish.html",
		controller:"myPostPublishCtrl"
	}).when("/reply",{
		templateUrl:"section/mypost-reply.html",
		controller:"myPostReplyCtrl"
	}).otherwise({redirectTo:"/post"});
}])