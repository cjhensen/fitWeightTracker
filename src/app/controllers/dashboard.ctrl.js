angular.module('ag-app')
.controller('DashboardCtrl', function($state, auth, Logs, dashboard) {
	var dashboardCtrl = this;

	dashboardCtrl.dashboard = dashboard;


	dashboardCtrl.testDCtrl = function() {
		console.log('From Logs Service: ', Logs.getWeight(auth.uid).val().weight);
	}
	dashboardCtrl.addLog = function() {
		dashboardCtrl.dashboard.$save();
	};


});