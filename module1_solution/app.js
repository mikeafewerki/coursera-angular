(function () {
'use strict';

angular.module('LunchCheck', [])
.controller('LunchCheckController', LunchCheckController);

LunchCheckController.$inject = ['$scope'];
function LunchCheckController($scope) {
  $scope.lunch = "";
  $scope.message = "";

  $scope.showMessage = function () {
    if($scope.lunch){
        var list = $scope.lunch.split(",");
        //remove an empty element if it exists
        list.forEach(function(element){
          if(element.trim()=="")
            list.splice(list.indexOf(element),1);
        });
        if(list.length<=3){
          $scope.message = "Enjoy!";
        }else{
          $scope.message = "Too much!";
        }
        $scope.textColor = {"color":"green"};
        $scope.borderColor = {"border-color":"green"};
    } else{
      $scope.message = "Please enter data first";
      $scope.textColor = {"color":"red"};
      $scope.borderColor = {"border-color":"red"};
    }
  };
}

})();
