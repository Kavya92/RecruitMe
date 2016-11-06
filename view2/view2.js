'use strict';

define([
	'angular',
	'angularRoute',
	'components/version/version',
	'angularfire',
	'firebase'
], function(angular) {
	angular.module('myApp.view2', ['ngRoute', 'myApp.version'])
	.config(['$routeProvider', function($routeProvider) {
		$routeProvider.when('/view2', {
			templateUrl: 'view2/view2.html',
			controller: 'View2Ctrl'
		});
	}])
	// We can load the controller only when needed from an external file
	.controller('View2Ctrl', ['$scope', '$injector','$firebaseObject','$firebaseArray', function($scope, $injector,$firebaseObject,$firebaseArray) {
		require(['view2/ctrl2'], function(ctrl2) {

			$injector.invoke(ctrl2, this, {'$scope': $scope});

		});
		$scope.writeUserData=function () {
			/*var ref = firebase.database().ref().child('Student');
			/*var obj = $firebaseObject(ref);
			console.log(obj);
			var list = $firebaseArray(ref);
			console.log(list);*/
			/*var list = $firebaseArray(ref);
			list.$add({ fname:"Dilip",lname:"Rob" }).then(function () {
				alert('hi');
			});*/
		};
	}]);
});