angular.module('ag-app')
.directive('logout', function() {
	return {
		restrict: 'E',
		replace: 'true',
		templateUrl: 'logout.html',
		controller: 'AuthCtrl as authCtrl'
	};
});