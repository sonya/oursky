(function() {
    'use strict';

    var app = angular.module('oursky');

    app.controller('CameraController', ['$scope', function($scope) {
        console.log('CameraController');

        $scope.launchCamera = function() {
            console.log('CameraController / launchCamera method');

            // launch camera
            navigator.camera.getPicture (
                selectColor,
                showError,
                {
                    quality: 80,
                    destinationType: Camera.DestinationType.DATA_URL,
                    sourceType: Camera.PictureSourceType.CAMERA,
                    encodingType: Camera.EncodingType.JPEG,
                    targetWidth: 1000,
                    targetHeight: 1000,
                    saveToPhotoAlbum: true
                }
            );
        };

        $scope.selectPhoto = function() {
            console.log('CameraController / selectPhoto method');

            // launch gallery
            navigator.camera.getPicture(
                selectColor,
                showError,
                {
                    quality: 80,
                    destinationType: Camera.DestinationType.DATA_URL,
                    sourceType: Camera.PictureSourceType.SAVEDPHOTOALBUM,
                    encodingType: Camera.EncodingType.JPEG,
                    targetWidth: 1000,
                    targetHeight: 1000
                });

        };

        /**
         * show ImageURL
         * @param base64
         */
        function selectColor(base64) {
            console.log(base64.length);

            // have memory
            $scope.image = base64;

            $scope.app.navigator.pushPage('sky_color.html');
        }

        /**
         * call fail
         * @param message
         */
        function showError(message) {
            alert('error!: ' + message);
        }
    }]);

    /**
     * Select sky color screen view
     */
    app.controller('SelectSkyColorController', ['$scope', '$filter', function($scope, $filter) {
        console.log('SelectSkyColorController');

        var f = $filter('date');    // Date filter

        setImage("data:image/jpeg;base64," + $scope.$parent.image);

        // Define sky color objects.
        $scope.colors = [
            { label: "Deep Blue",  imageClassName: "sky-deep-blue" },
            { label: "Blue",       imageClassName: "sky-blue" },
            { label: "Light Blue", imageClassName: "sky-light-blue" },
            { label: "Pale Blue",  imageClassName: "sky-pale-blue" },
            { label: "Milky",      imageClassName: "sky-milky" },
            { label: "Cloudy",     imageClassName: "sky-cloudy" }

        ];

        $scope.save = function (color) {
            savePicture($scope.$parent.image, color);
        };

        $scope.back = function () {
            $scope.app.navigator.popPage();
        };

        /**
         * show Image and show select button
         * @param path
         */
        function setImage(path) {
            var image = document.getElementById ('picture');
            image.src = path;
        }


        /**
         * Save image
         * Depend Parse SDK
         * @param base64 base64 string
         */
        function savePicture(base64, color) {
            var now = new Date();
            var fileName = f(now, 'yyyyMMdd_HHmmss_sss', 'UTC') + '.jpg';
            var file = new Parse.File(fileName, { base64: base64 });

            console.log('SelectSkyColorController / savePicture');
            console.log(fileName);
            console.log(color);

            $scope.modal.show();
            file.save().then(function(obj) {
                console.log('SelectSkyColorController / savePicture / file save');
                console.log(obj);

                var sky = new Parse.Object("SkyImage");
                sky.set("label", color.label);
                sky.set("imageClassName", color.imageClassName);
                sky.set("imageFile", file);
                sky.save().then(function(obj2) {
                        console.log('savePicture / file save / sky save');
                        console.log(obj2);
                        $scope.modal.hide();
                        alert('save sky image!');
                        $scope.back();
                    },
                    function(error) {
                        $scope.modal.hide();
                        console.error(error);
                    });
            }, function(error) {
                $scope.modal.hide();
                console.error(error);
            });
        }

    }]);
})();
