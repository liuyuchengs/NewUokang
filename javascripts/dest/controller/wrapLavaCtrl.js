app.controller("wrapLavaCtrl",["$scope","$http","Tool","Ajax",function($scope,$http,Tool,Ajax){$scope.productInfo=[],$scope.noProduct=!1,$scope.noProductText="",$scope.loading=!1,$scope.queryParams={flag:3,city:"深圳",area:"",professionId:"2",itemId:"",currentPage:1},$scope.init=function(){Ajax.loadHost($scope,function(){$scope.loadGift()})},$scope.loadGift=function(){$scope.loading=!0;var url=$scope.host+"/wx/product/queryByMidd",params=Tool.convertParams($scope.queryParams);$http.post(url,params,{headers:{"Content-type":"application/x-www-form-urlencoded;charset=UTF-8"}}).success(function(data){0==data.code?data.data.length<1?($scope.productInfo.length<1?$scope.noProductText="没有项目信息,请选择其他区域或者时间!":$scope.noProductText="已经没有项目了!",$scope.noProduct=!0):($scope.mergeProdcut(data.data),$scope.productInfo=$scope.productInfo.concat(data.data)):Tool.alert($scope,data.message),$scope.loading=!1}).error(function(){$scope.noProduct=!0,Tool.alert($scope,"获取项目信息失败，请稍后再试!"),$scope.loading=!1})},$scope.mergeProdcut=function(items){items.forEach(function(item){null!=item.priceunit&&""!=item.priceunit?item.preferPriceType=item.pricetype+"/"+item.priceunit:item.preferPriceType=item.pricetype,""!=item.samllimg&&null!=item.samllimg||(item.samllimg="../contents/img/p_default.png")})},window.onscroll=function(){if(!$scope.loading&&!$scope.noProduct){var body=document.body,html=document.documentElement,height=Math.max(body.scrollHeight,body.offsetHeight,html.clientHeight,html.scrollHeight,html.offsetHeight);height>window.innerHeight&&height-window.scrollY-window.innerHeight<100&&$scope.loadNext()}},$scope.loadNext=function(){$scope.queryParams.currentPage++,$scope.loadGift()},$scope.detail=function(proId,hospitalId){var path="/new/htmls/product-detail.html#?productId="+proId+"&hospitalId="+hospitalId;"discount"==$scope.itemState?path+="&code=123":"month"==$scope.itemState&&(path+="&discountid=123&flag=11"),Tool.goPage(path)},$scope.question=function(){Tool.alert($scope,"如有疑问，请致电0755-26905699")}}]);