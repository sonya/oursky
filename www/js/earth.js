(function() {
    'use strict';

    var app = angular.module('oursky');

    app.controller('EarthController', function($scope) {
        console.log('EarthController');

        $scope.initializeEarth = function() {
            var s = document.createElement('script');
            s.src = 'http://www.webglearth.com/v2/api.js';
            s.onload = function() {
                var earth = new WE.map('earth_div');
                WE.tileLayer('http://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}.png',{
                             attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, &copy; <a href="http://cartodb.com/attributions">CartoDB</a>'
                             }).addTo(earth);
            }
            document.body.appendChild(s);
        }

        $scope.initializeEarth();
    });
})();
