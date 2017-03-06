/**
 * Created by Administrator on 2017/3/4 0004.
 */
angular.module("myapp").controller("playlist",function($scope,$http){
    $scope.items=[]; //储存歌单数据
    var start=0;
    var end=6;
    function getplayList(s,e){
        $http({
            method:"post",
            url:"https://musicapi.duapp.com/api.php?type=topPlayList&cat=%E5%85%A8%E9%83%A8&offset="+s+"&limit="+e})
            .success(function(data){
                $scope.data=data.playlists;
                for(var i=0;i<$scope.data.length;i++){
                    $scope.items.push($scope.data[i]);
                }
            });
        start+=6;
        end+=6;
        console.log(start)

    };
    getplayList(start,end);
    function getScrollTop(){
        var scrollTop = 0, bodyScrollTop = 0, documentScrollTop = 0;
        if(document.body){
            bodyScrollTop = document.body.scrollTop;
        }
        if(document.documentElement){
            documentScrollTop = document.documentElement.scrollTop;
        }
        scrollTop = (bodyScrollTop - documentScrollTop > 0) ? bodyScrollTop : documentScrollTop;
        return scrollTop;
    }

//文档的总高度

    function getScrollHeight(){
        var scrollHeight = 0, bodyScrollHeight = 0, documentScrollHeight = 0;
        if(document.body){
            bodyScrollHeight = document.body.scrollHeight;
        }
        if(document.documentElement){
            documentScrollHeight = document.documentElement.scrollHeight;
        }
        scrollHeight = (bodyScrollHeight - documentScrollHeight > 0) ? bodyScrollHeight : documentScrollHeight;
        return scrollHeight;
    }

//浏览器视口的高度

    function getWindowHeight(){
        var windowHeight = 0;
        if(document.compatMode == "CSS1Compat"){
            windowHeight = document.documentElement.clientHeight;
        }else{
            windowHeight = document.body.clientHeight;
        }
        return windowHeight;
    }

    window.onscroll = function(){
        if(getScrollTop() + getWindowHeight() == getScrollHeight()){
            console.log("已经到最底部了！!");
            getplayList(start,end)
        }
    };
})