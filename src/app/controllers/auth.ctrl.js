angular.module('ag-app')
.controller('AuthCtrl', function(Auth, $state) {
	var authCtrl = this;

	authCtrl.user = {
		email: '',
		password: ''
	};

	// login
	authCtrl.login = function() {
		// calls the auth service and uses the firebase function 
		// authWithPassword by passing in the user
		// then it redirects to the home state if authentication was successful
		Auth.$authWithPassword(authCtrl.user).then(function(auth) {
			$state.go('dashboard');
		}, function(error) {
			authCtrl.error = error;
		});
	};

	// register
	authCtrl.register = function() {
		// calls the auth service and uses the firebase function
		// createUser by passing in teh user
		// then it login in the user by calling the login function in 
		// this controller
		Auth.$createUser(authCtrl.user).then(function(user) {
			authCtrl.login();
		}, function(error) {
			authCtrl.error = error;
		});
	};

	authCtrl.logout = function() {
		Auth.$unauth();
		$state.go('login');
	}


});