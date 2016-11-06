/**
 * Created by graje on 11/6/2016.
 */

'use strict';

define([
    'angular',
    'angularRoute'
], function(angular, angularRoute) {
    // Declare app level module which depends on views, and components
   angular.module('employerModule', ['firebaseDataService'])
       .config(['$routeProvider', function($routeProvider) {
           $routeProvider.when('/studentList', {
               templateUrl: 'employer/studentList.tpl.html',
               controller: 'studentList'
           })
       }])
       .controller('studentList',function($scope, dataService){

           dataService.getTotalStudentsList().then(function(data){
               $scope.studentList = data;
           });

           /*$scope.studentList = [
               {
                   name:'Naveen',
                   email:'navven@gmail.com',
                   contact:'6409882442',
                   major:'CS',
                   degree:'Graduate',
                   year:'Sophomore',
                   expectedGraduation:'2017',
                   comments:'Techie Person',
                   rating:'4'
               },
               {
                   name:'Dilip',
                   email:'dilip@gmail.com',
                   contact:'645282442',
                   major:'CS',
                   degree:'Graduate',
                   year:'Sophomore',
                   expectedGraduation:'2018',
                   comments:'Techie Person , Recommended for interview',
                   rating:'5'
               },
               {
                   name:'Raji',
                   email:'raji@gmail.com',
                   contact:'9875882442',
                   major:'CS',
                   degree:'Graduate',
                   year:'Senior',
                   expectedGraduation:'2016',
                   comments:'Not recommended',
                   rating:'3'
               }
           ];*/
       });
});


