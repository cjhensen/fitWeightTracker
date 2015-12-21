angular.module('ag-app')
.controller('DashboardCtrl', function($state, auth, Logs, dashboard, CurDate) {
	var dashboardCtrl = this;

	dashboardCtrl.dashboard = dashboard;

	// initially the weight is not set and the form is clear
	//dashboardCtrl.dashboard.weight = "";

	dashboardCtrl.testDCtrl = function() {
		console.log('From Logs Service: ', Logs.getWeight(auth.uid).val().weight);
	}
	dashboardCtrl.addLog = function() {
		dashboardCtrl.dashboard.$save().then(function() {
			// after saving the value to the DB, clear the field
			dashboardCtrl.dashboard.weight = "";
			console.log('date', dashboardCtrl.dashboard.date);
		});

	// Logs.setWeight(auth.uid, dashboardCtrl.dashboard.date, dashboardCtrl.dashboard.weight);
	// dashboardCtrl.dashboard.weight = "";
	};

	// dashboardCtrl.dashboard.date = CurDate.getCurDate();


});