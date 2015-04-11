(function() {
    'use strict';

    var app = angular.module('oursky');

    app.controller('CameraController', ['$scope', function($scope) {

        console.log('CameraController');

        $scope.launch = function() {
            console.log('CameraController / launch method');

            // launch camera
            navigator.camera.getPicture (
                onSuccess,
                onFail,
                { quality: 50, destinationType: Camera.DestinationType.DATA_URL}
            );


            /**
             * call success
             * @param imageData
             */
            function onSuccess (imageData) {
                var image = document.getElementById ('picture');
                image.src = "data:image/jpeg;base64," + imageData;
            }

            /**
             * call fail
             * @param message
             */
            function onFail (message) {
                alert ('error!: ' + message);
            }
        };
    }]);


})();