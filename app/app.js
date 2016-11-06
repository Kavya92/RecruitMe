'use strict';

define([
	'angular',
	'angularRoute',
	'view1/view1',
	'view2/view2',
	'employer/main',
	'firebasedb/firebaseDataService'
], function(angular, angularRoute, view1, view2) {
	// Declare app level module which depends on views, and components
	return angular.module('myApp', [
		'ngRoute',
		'myApp.view1',
		'myApp.view2',
		'employerModule',
		'firebaseDataService'
	]).
	config(['$routeProvider', function($routeProvider) {
		$routeProvider.otherwise({redirectTo: '/view1'});
	}]);
});

