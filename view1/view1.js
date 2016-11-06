'use strict';
define([
	'angular',
	'angularRoute',
	'qrCodeLib1',
	'qrCodeLib2',
	'angularBootstrap',
	'angularfire',
	'firebase',
	'angularBootstrapTpls'
], function(angular) {

	angular.module('myApp.view1', ['ngRoute','qrScanner','ui.bootstrap', 'ui.bootstrap.modal', 'firebaseDataService'])
	.config(['$routeProvider', function($routeProvider) {
		$routeProvider.when('/view1', {
			templateUrl: 'view1/view1.html',
			controller: 'View1Ctrl'
		});
	}])
	.controller('View1Ctrl', ['$scope', '$rootScope', '$uibModal','dataService', function($scope, $rootScope, $uibModal, dataService) {

		$scope.onSuccess = function(data) {
			console.log(data);
		};
		$scope.onError = function(error) {
			console.log(error);
		};
		$scope.onVideoError = function(error) {
			console.log(error);
		};

		$rootScope.$on('QR_RECEIVED', function(event, args){
			console.log('Data from the QR  '  + args);

			dataService.getStudentData(args).then(function(data){
				dataService.addOrUpdateStudent(data).then(function(){
					console.log('Added user successsfully to CDK database.');
				})
			});
		});

		$scope.openModal = function(){

			var modalInstance = $uibModal.open({
				controller: 'modalController',
				controllerAs: '$ctrl',
				templateUrl: 'employer/modalTemplate.tpl.html',
				size: 'sm'

			});

			modalInstance.result.then(function () {

				//console.log('OK clicked!');

			}, function () {

				console.log('Dismiss clicked!');

			});
		};
	}])
	.controller('modalController', ['$scope', '$uibModalInstance', '$rootScope',  function($scope, $uibModalInstance, $rootScope){


			$scope.okHandler = function(){
				console.log('OK CLICKED');
				$uibModalInstance.close();
			};

			$scope.cancelHandler = function(){
				console.log('Dismiss CLICKED');
				$uibModalInstance.close();
			};

			$scope.onSuccess = function(data){
				//console.log('QR scan success data :- ' + data);
				$uibModalInstance.close();
				$rootScope.$emit('QR_RECEIVED', data);
			};

			$scope.onError = function(error){
				console.log('QR scan failed with error :- ' + error);
			};

		}]);
});
