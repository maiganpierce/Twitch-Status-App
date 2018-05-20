(function () {
    'use strict';

    angular.module('angularApp').controller('Main', main);

    function main() {
        var vm = this;
        vm.food = 'pizza';
	vm.side = 'cheese';
    }
})();