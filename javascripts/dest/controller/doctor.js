define(function(){return function($scope,$rootScope,$http,Tool,Ajax,Params){$scope.hasBg=!1,$scope.profValue="default",$scope.profItemValue="default",$scope.doctors=[],$scope.noProduct=!1,$scope.noProductText="",$scope.orderParams={"default":{has:!0,val:""},title:{has:!1,val:"profession_title desc"},score:{has:!1,val:"score desc"}},$scope.areaParams=Params.areaParams,$scope.professionalParams=Params.professionalParams,$scope.queryParams={professionId:"",itemid:"",orderby:"",city:"深圳",area:"",pageRows:10,currentPage:1},$scope.menuParams={area:{has:!1,val:$scope.areaParams},order:{has:!1,val:$scope.orderParams},professional:{has:!1,val:$scope.professionalParams}},$scope.init=function(){$rootScope.hasBgColor=!0,$scope.loadDoctor()},window.onscroll=function(){if(!$rootScope.loading&&!$scope.noProduct){var body=document.body,html=document.documentElement,height=Math.max(body.scrollHeight,body.offsetHeight,html.clientHeight,html.scrollHeight,html.offsetHeight);height>window.innerHeight&&height-window.scrollY-window.innerHeight<100&&$scope.loadNext()}},$scope.switchMenu=function(menu){$scope.switchObj(menu,$scope.menuParams,!0)},$scope.selectMenu=function(item,obj){var ob=$scope.menuParams[obj].val;$scope.switchObj(item,ob),"area"==obj&&($scope.queryParams.area=ob[item].val),"order"==obj&&($scope.queryParams.orderby=ob[item].val),$scope.switchMenu(obj),$scope.resetDate(),$scope.loadDoctor()},$scope.selectProfression=function(item){$scope.switchObj(item,$scope.professionalParams)},$scope.selectProfressionItem=function(item,pro){item!=$scope.profItemValue&&(""==$scope.profValue&&""==$scope.profItemValue?$scope.professionalParams[pro].val[item].has=!0:($scope.professionalParams[$scope.profValue].val[$scope.profItemValue].has=!1,$scope.professionalParams[pro].val[item].has=!0),$scope.profItemValue=item,$scope.profValue=pro,$scope.queryParams.professionId=$scope.professionalParams[pro].proId,$scope.queryParams.itemid=$scope.professionalParams[pro].val[item].id,$scope.switchMenu("professional"),$scope.resetDate(),$scope.loadDoctor())},$scope.switchObj=function(item,obj,hasBg){for(var pro in obj)pro==item?(obj[pro].has=!obj[pro].has,hasBg&&($scope.hasBg=obj[pro].has)):obj[pro].has=!1},$scope.loadDoctor=function(){Ajax.post({url:Tool.host+"/wx/doctor/querydoctorbycityandprofession",params:$scope.queryParams}).then(function(data){data.data.length<1?($scope.doctors.length<1?$scope.noProductText="没有项目信息,请选择其他区域或者时间!":$scope.noProductText="已经没有项目了!",$scope.noProduct=!0):($scope.mergeDoctor(data.data),$scope.doctors=$scope.doctors.concat(data.data))})["catch"](function(){$scope.noProduct=!0,Tool.alert("数据加载失败，请稍后再试!")})["finally"](function(){$rootScope.loading=!1})},$scope.mergeDoctor=function(items){items.forEach(function(item){""!=item.score&&null!=item.score||(item.score="暂无评"),""!=item.sales&&null!=item.sales||(item.sales=0)})},$scope.loadNext=function(){$scope.queryParams.currentPage++,$scope.loadDoctor()},$scope.resetDate=function(){$scope.queryParams.currentPage=1,$scope.noProduct=!1,$scope.noProductText="",$scope.doctors=[]},$scope.detail=function(id){Tool.changeRoute("/doctor/detail","id="+id)}}});