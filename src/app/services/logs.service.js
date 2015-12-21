angular.module('ag-app')
.factory('Logs', function($firebaseArray, $firebaseObject, FirebaseUrl, CurDate) {
	var logsRef = new Firebase(FirebaseUrl+'logs');
	var logs = $firebaseArray(logsRef);


	var Logs = {
		getLogs: function(uid) {
			// returning the current date child back to the route so it is available to save
			// data to from the route and the dashboardCtrl
			// PROBLEM WITH THIS IS THIS DATE IS THE ONLY ONE YOU HAVE ACCESS TO AND IF YOU
			// CHANGE THE DATE IN THE DATEPICKER, THE LOGS DON'T CHANGE FOR THAT DATE
			return $firebaseObject(logsRef.child(uid).child(CurDate.getCurDate()));
		},
		getWeight: function(uid) {
			var data;
			logsRef.child(uid).once("value", function(dataSnapshot) {
				data = dataSnapshot;
			});
			return data;
		},
		setWeight: function(uid, date, weight) {
			logsRef.child(uid).child(date).set({
				date: date,
				weight: weight
			}, function(error) {
				if (error !== null) {
					alert('Unable to push log to Firebase!');
				}
			});
		},
		all: logs
	};

	return Logs;
});