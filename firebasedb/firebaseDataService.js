/**
 * Created by graje on 11/6/2016.
 */'use strict';

define([
    'angular',
    'angularfire',
    'firebase'
], function(angular, angularfire, firebase) {
    angular.module('firebaseDataService', ['firebase'])
        .run( function() {
            firebase.initializeApp({
                apiKey: 'AIzaSyAzXuFx4A2y87H3ko6My94-ZWGF_pyOdrI',
                authDomain: 'pickme-d038c.firebaseapp.com',
                databaseURL: 'https://pickme-d038c.firebaseio.com/',
                storageBucket: 'pickme-d038c.appspot.com'
            });
        })
        .factory('dataService', ['$firebaseObject','$firebaseArray', '$q', function($firebaseObject, $firebaseArray, $q) {

            var addOrUpdateStudent = function(studentData){

                var defer = $q.defer();

                var ref = firebase.database().ref().child('CDK');
                var list = $firebaseArray(ref);
                list.$add(studentData).then(function(data) {
                    defer.resolve(data);
                }, function(){
                    defer.reject('Update failed');
                });

                return defer.promise;
            };

            var getTotalStudentsList = function(){

                 var defer = $q.defer();
                 var ref = firebase.database().ref().child('CDK');
                 var obj = $firebaseArray(ref);

                obj.$loaded().then(function(data) {

                    var studentList = [];
                    angular.forEach(obj, function(value, key) {
                        studentList.push(value);
                    });

                    defer.resolve(studentList);
                }, function(){
                    defer.reject('getTotalStudentsList failed');
                });
                return defer.promise;
            };

            /*
            t.getStudentData('-KVt4y9PLwYKgrsA6Zru').then(function(data){
            console.log(data);
            });

             t.getTotalStudentsList().then(function(data){
             console.log(data);
             });

            */

            var getStudentData = function(id){

                var defer = $q.defer();
                var ref = firebase.database().ref().child('Student');
                var obj = $firebaseArray(ref);

                obj.$loaded().then(function() {

                    angular.forEach(obj, function(value, key) {
                        if(id === value.$id){
                            defer.resolve(value);
                        }
                    });
                }, function(){
                    defer.reject('getTotalStudentsList failed');
                });
                return defer.promise;
            };

            return {
                addOrUpdateStudent: addOrUpdateStudent,
                getTotalStudentsList: getTotalStudentsList,
                getStudentData: getStudentData
            };
        }]);
});