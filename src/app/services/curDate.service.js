angular.module('ag-app')
.factory('CurDate', function($filter) {
	var CurDate = {
		getCurDate: function() {
			var now = new Date();
			var day = ("0" + now.getDate()).slice(-2);
			var month = ("0" + (now.getMonth() + 1)).slice(-2);
			var today = now.getFullYear()+"-"+(month)+"-"+(day);
			return today;
		}
	};

	return CurDate;
});	