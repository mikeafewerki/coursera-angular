(function () {
'use strict';

angular.module('ShoppingListCheckOff', [])
.controller('ToBuyController', ToBuyController)
.controller('AlreadyBoughtController', AlreadyBoughtController)
.service('ShoppingListCheckOffService', ShoppingListCheckOffService);

// toBuyList - controller
ToBuyController.$inject = ['ShoppingListCheckOffService'];
function ToBuyController(ShoppingListCheckOffService) {
  var toBuyList = this;

  toBuyList.items = ShoppingListCheckOffService.getToBuyItems();

  toBuyList.removeItem = function (itemIndex) {
    ShoppingListCheckOffService.removeItem(itemIndex);
    toBuyList.isEmpty = ShoppingListCheckOffService.toBuyListIsEmpty();
  };

  toBuyList.emptyMessage =
            ShoppingListCheckOffService.showEmptyMessage("toBuy");
}


// alreadyBoughtList - controller
AlreadyBoughtController.$inject = ['ShoppingListCheckOffService'];
function AlreadyBoughtController(ShoppingListCheckOffService) {
  var alreadyBoughtList = this;

  alreadyBoughtList.items = ShoppingListCheckOffService.getBoughtItems();
  alreadyBoughtList.emptyMessage =
            ShoppingListCheckOffService.showEmptyMessage("bought");

  alreadyBoughtList.size = function () {
    return alreadyBoughtList.items.length;
  }
}

function ShoppingListCheckOffService() {
  var service = this;

  // List of shopping items
  var toBuyItems = [
    {
      item_name : "cookies",
      item_quantity : "10"
    },
    {
      item_name : "Candies",
      item_quantity : "25"
    },
    {
      item_name : "Cake",
      item_quantity : "4"
    },
    {
      item_name : "Muffin",
      item_quantity : "5"
    },
    {
      item_name : "Peanut Butter",
      item_quantity : "10"
    }
  ];

  var boughtItems = [];

  var addItem = function (itemName, quantity) {
     var item = {
        item_name: itemName,
        item_quantity: quantity
      };
      boughtItems.push(item);
  };

  service.removeItem = function (itemIndex) {
    addItem(toBuyItems[itemIndex].item_name, toBuyItems[itemIndex].item_quantity);
    toBuyItems.splice(itemIndex, 1);
  };

  service.getToBuyItems = function () {
    return toBuyItems;
  };


  service.getBoughtItems = function () {
    return boughtItems;
  };

  service.toBuyListIsEmpty = function(){
    return toBuyItems.length === 0;
  };

  service.showEmptyMessage = function(list){
    if(list==="toBuy"){
      return "Everything is bought!";
    }
    else {
      return "Nothing bought yet.";
    }
  }
}

})();
