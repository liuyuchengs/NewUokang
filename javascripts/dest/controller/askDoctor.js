define(["jquery"],function($){return function($scope,$rootScope,$location,$http,Tool,Ajax){$scope.hasSee=!0,$scope.content=null,$scope.noSelect=!0,$scope.postData=new FormData,$scope.doctorId=null,$scope.params={input1:{has:!1,url:"",val:"#input1"},input2:{has:!1,url:"",val:"#input2"},input3:{has:!1,url:"",val:"#input3"},input4:{has:!1,url:"",val:"#input4"},input5:{has:!1,url:"",val:"#input5"},input6:{has:!1,url:"",val:"#input6"}},$scope.init=function(){$rootScope.hasBgColor=!0,Tool.noWindowListen(),$scope.getParams(),Tool.checkLogin()?Tool.loadUserinfo():Tool.comfirm("请先登录",function(){$rootScope.hasTip=!1,Tool.changeRoute("/login")}),$scope.listen()},$scope.getParams=function(){$location.search().id?$scope.doctorId=$location.search().id:history.back()},$scope.chooseSee=function(){$scope.hasSee=!$scope.hasSee},$scope.listen=function(){$("#input1").on("change",function(){var url=$scope.getUrl(this.files[0]);$scope.params.input1.has=!0,$scope.params.input1.url=url,$scope.noSelect=!1,$scope.$apply()}),$("#input2").on("change",function(){var url=$scope.getUrl(this.files[0]);$scope.params.input2.has=!0,$scope.params.input2.url=url,$scope.noSelect=!1,$scope.$apply()}),$("#input3").on("change",function(){var url=$scope.getUrl(this.files[0]);$scope.params.input3.has=!0,$scope.params.input3.url=url,$scope.noSelect=!1,$scope.$apply()}),$("#input4").on("change",function(){var url=$scope.getUrl(this.files[0]);$scope.params.input4.has=!0,$scope.params.input4.url=url,$scope.noSelect=!1,$scope.$apply()}),$("#input5").on("change",function(){var url=$scope.getUrl(this.files[0]);$scope.params.input5.has=!0,$scope.params.input5.url=url,$scope.noSelect=!1,$scope.$apply()}),$("#input6").on("change",function(){var url=$scope.getUrl(this.files[0]);$scope.params.input6.has=!0,$scope.params.input6.url=url,$scope.noSelect=!1,$scope.$apply()})},$scope.getUrl=function(obj){var url=null;return void 0!=window.createObjectURL?url=window.createObjectURL(obj):void 0!=window.URL?url=window.URL.createObjectURL(obj):void 0!=window.webkitURL&&(url=window.webkitURL.createObjectURL(obj)),url},$scope.choosePic=function(){var count=0;for(var item in $scope.params){var prototype=$scope.params[item];if(count++,!prototype.has)return void $(prototype.val).click()}6==count&&Tool.alert($scope,"最多只能上传6张图片!")},$scope.remove=function(item){$scope.params[item]&&($scope.params[item].has=!1,$scope.params[item].url="",$scope.clear(item),$scope.listen())},$scope.clear=function(selector){var element=document.getElementById(selector);element.outerHTML=element.outerHTML},$scope.mergePic=function(){var imgStr="img",pStr="p",count=1,afterCount=3,file=new Blob([""],{type:"image/jpeg"});for(var index in $scope.beforeParams){var prototype=$scope.beforeParams[index];prototype.has&&(count<4?($scope.postData.append(imgStr+count,$(prototype.val).get(0).files[0]),count++):($scope.postData.append(pStr+(count-afterCount),$(prototype.val).get(0).files[0]),count++))}for(count;count<7;count++)count<4?$scope.postData.append(imgStr+count,file):$scope.postData.append(pStr+(count-afterCount),file)},$scope.send=function(){if(null===$scope.content||""===$scope.content)Tool.alert("请填写咨询内容!");else{var url=Tool.host+"/wx/post/addPost";$scope.mergePic(),$scope.postData.append("postName",""),$scope.postData.append("postContent",$scope.content),$scope.postData.append("postFlags",3),$scope.postData.append("doctorId",$scope.doctorId),$rootScope.loading=!0,$rootScope.loading=!0,$http.post(url,$scope.postData,{headers:{"Content-Type":void 0,accessToken:Tool.userInfo.accessToken}}).success(function(data){$rootScope.loading=!1,0==data.code?history.back():Tool.alert("连接数据失败，请稍后再试!")}).error(function(){$rootScope.loading=!1,$scope.postData=new FormData,Tool.alert("连接失败，请稍后再试!")})}},$scope.back=function(){history.back()}}});