(function () {
'use strict';

angular.module('NarrowItDownApp', [])
.controller('NarrowItDownController', NarrowItDownController)
.service('MenuSearchService', MenuSearchService)
.constant('ApiBasePath', "https://davids-restaurant.herokuapp.com")
.directive('foundItems', FoundItemsDirective);


function FoundItemsDirective() {
  var ddo = {
    templateUrl: 'menuitems.html',
    scope: {
      items: '<',
      title: '@title',
      onRemove: '&'
    }
  };

  return ddo;
}


NarrowItDownController.$inject = ['MenuSearchService'];
function NarrowItDownController(MenuSearchService) {
  var menu = this;

  menu.searchTerm = "";

  var origTitle = "Matched Menu Items";

  menu.search = function(){
    var promise = MenuSearchService.getMatchedMenuItems(menu.searchTerm);
    promise.then(function(response){
      menu.found = response;
      menu.title = origTitle + " (" + menu.found.length + " items )";
    })

  };

  menu.removeItem = function (itemIndex) {
    MenuSearchService.removeItem(itemIndex);
    menu.title = origTitle + " (" + menu.found.length + " items )";
  };

}


MenuSearchService.$inject = ['$http', 'ApiBasePath'];
function MenuSearchService($http, ApiBasePath) {
  var service = this;

  var foundItems;

  service.getMatchedMenuItems = function (searchTerm) {

    return $http({
      method: "GET",
      url: (ApiBasePath + "/menu_items.json")
      }).then(function (result) {
        foundItems = [];
        result.data.menu_items.forEach(function(item){
          // process result and only keep items that match
          if(searchTerm !== "" &&
              item.description.toLowerCase().indexOf(searchTerm.toLowerCase()) !== -1){
            foundItems.push(item);
          }
        });
        // return processed items
        return foundItems;
    }).catch(function (error) {
        console.log(error);
      });

  };

  service.removeItem = function (itemIndex) {
    foundItems.splice(itemIndex,1);
  }

}

})();
