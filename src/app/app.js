angular.module('ag-app', [
	'firebase', 
	'ui.router', 
	'templatesCache', 
	'angular-md5'
	])
.config(function($stateProvider, $urlRouterProvider) {
	$stateProvider
		.state('home', {
			url: '/',
			templateUrl: 'home.html'
		})
		.state('login', {
			url: '/login',
			controller: 'AuthCtrl as authCtrl',
			templateUrl: 'login.html',
			resolve: {
			  requireNoAuth: function($state, Auth){
			    return Auth.$requireAuth().then(function(auth){
			      $state.go('home');
			    }, function(error){
			      return;
			    });
			  }
			}
		})
		.state('register', {
			url: '/register',
			controller: 'AuthCtrl as authCtrl',
			templateUrl: 'register.html',
			resolve: {
			  requireNoAuth: function($state, Auth){
			    return Auth.$requireAuth().then(function(auth){
			      $state.go('home');
			    }, function(error){
			      return;
			    });
			  }
			}
		})
		.state('profile', {
			url: '/profile',
			controller: 'ProfileCtrl as profileCtrl',
			templateUrl: 'profile.html',
			resolve: {
		    auth: function($state, Users, Auth){
		      return Auth.$requireAuth().catch(function(){
		        $state.go('home');
		      });
		    },
		    profile: function(Users, Auth){
		      return Auth.$requireAuth().then(function(auth){
		        return Users.getProfile(auth.uid).$loaded();
		      });
		    }
		  }
		});
		$urlRouterProvider.otherwise('/');
})
.constant('FirebaseUrl', 'https://ag-app.firebaseio.com/');