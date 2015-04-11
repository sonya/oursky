(function() {
    'use strict';

    var app = angular.module('oursky', ['onsen.directives']);

    /**
     * for PhoneGap/Cordova event
     * bootstrap AngularJS
     */
    document.addEventListener('deviceready', function() {
        console.log('deviceready event');
        angular.bootstrap(document, ['oursky']);
    }, false);

    app.controller('TabController', function($scope) {

        console.log('TabController');
    });


})();