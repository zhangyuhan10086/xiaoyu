
angular.module("myapp").controller("homeCtrl",function($scope,$http){
    $http({
        method:"post",
        url:"https://musicapi.duapp.com/api.php?type=topPlayList&cat=%E5%85%A8%E9%83%A8&offset=0&limit=6"})
        .success(function(data){
            $scope.data=data.playlists;
        });
    var nav=document.getElementsByClassName("nav");
    var ali=document.getElementsByTagName("li");

    for(var i=0;i<ali.length;i++){
        (function(i){
            ali[i].onclick=function(){
                for(var k=0;k<ali.length;k++){
                    ali[k].className="";
                };
                ali[i].className="active";
            };
        })(i)
    }
})