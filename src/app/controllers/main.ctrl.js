angular.module('ag-app', [])
.controller('mainCtrl', function($scope) {
	$scope.helloConsole = console.log('hello, this control works!');
});