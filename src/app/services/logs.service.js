angular.module('ag-app')
.factory('Logs', function($firebaseArray, $firebaseObject, FirebaseUrl) {
	var logsRef = new Firebase(FirebaseUrl+'logs');
	var logs = $firebaseArray(logsRef);


	var Logs = {
		getLogs: function(uid) {
			return $firebaseObject(logsRef.child(uid));
		},
		getWeight: function(uid) {
			var data;
			logsRef.child(uid).once("value", function(dataSnapshot) {
				data = dataSnapshot;
			});
			return data;
		},
		all: logs
	};

	return Logs;
});