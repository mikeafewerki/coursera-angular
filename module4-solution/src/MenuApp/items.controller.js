(function () {
'use strict';

angular.module('MenuApp')
.controller('MenuItemsController', MenuItemsController);

// 'items' is injected through state's resolve
MenuItemsController.$inject = ['items']
function MenuItemsController(items) {
  var menuItems = this;
  menuItems.itemsList = items;
}

})();
