(function() {
    'use strict';

    var app = angular.module('oursky');

    app.controller('EarthController', function($scope) {
        console.log('EarthController');

        $scope.initializeEarth = function() {
    var OURSKY=typeof OURSKY==="undefined"?{}:OURSKY;
    
    (function(){
    
    OURSKY.option = {
      sircleHeight : 250000,
      sircleSize   : 200000,
      colorData    : [
        [0.105882353,0.215686275,0.678431373, 0.9],
        [0.470588235,0.57254902,1, 0.9],
        [0.0, 0.0, 0.9, 0.9],
        [0.447058824,0.807843137,0.960784314, 0.9]
      ],
      initSkyData  : [
        {
          name   : "Boston",
          latlon : [-71.058880, 42.360083],
          color  : [0.105882353,0.215686275,0.678431373, 0.9],
        },
        {
          name   : "San Francisco",
          latlon : [-122.419416, 37.774930],
          color  : [0.470588235,0.57254902,1, 0.9]
        },
        {
          name   : "Chicago",
          latlon : [-87.629798, 41.878114],
          color  : [0.0, 0.0, 0.9, 0.9]
        },
        {
          name   : "Brazil",
          latlon : [-51.925280, -14.235004],
          color  : [0.447058824,0.807843137,0.960784314, 0.9]
        },
        {
          name   : "Tokyo",
          latlon : [139.731992, 35.709026],
          color  : [0.105882353,0.215686275,0.678431373, 0.9]
        },
        {
          name   : "Hokkaido",
          latlon : [143.006695, 43.997712],
          color  : [0.470588235,0.57254902,1, 0.9]
        },
        {
          name   : "Okinawa",
          latlon : [127.680932, 26.212401],
          color  : [0.0, 0.0, 0.9, 0.9]
        },
      ]
    }
    OURSKY.init = function(){
      OURSKY.viewer = new Cesium.Viewer('cesiumContainer',{
        animation : false,
        timeline : false,
        fullscreenButton : false,
        navigationHelpButton : false
      });
      // var viewer = new Cesium.CesiumWidget('cesiumContainer');
    
      // change layers
      // var layers = OURSKY.viewer.scene.imageryLayers;
      // var blackMarble = layers.addImageryProvider(new Cesium.TileMapServiceImageryProvider({
      //   url : 'http://cesiumjs.org/blackmarble',
      //   maximumLevel : 8,
      //   credit : 'Black Marble imagery courtesy NASA Earth Observatory'
      // }));
      // blackMarble.alpha = 0.8;
      // blackMarble.brightness = 0.8;
    
      for (var i = 0; i < OURSKY.option.initSkyData.length; i++) {
        OURSKY.addCircle({
          name   : OURSKY.option.initSkyData[i].name,
          latlon : OURSKY.option.initSkyData[i].latlon,
          color  : OURSKY.option.initSkyData[i].color
        });
      };
    
      var scene = OURSKY.viewer.scene;
    
      // function flyToTokyo() {
      //     var longitude = 139.054784;
      //     var latitude = 35.685692;
      //     var height = 300000.0;
      //     scene.camera.flyTo({
      //         destination : Cesium.Cartesian3.fromDegrees(longitude, latitude, height)
      //     });
      // }
      // flyToTokyo();
    
      // for random generate
      var I = 0;
      var circleTimer = setInterval(function(){
          var lat = (Math.random() * 358)-179
          var lon = (Math.random() * 166)-83
          var cr = Math.floor( Math.random() * OURSKY.option.colorData.length )
          OURSKY.addCircle({
              name   : "My Sky " + I,
              latlon : [lat, lon],
              color  : OURSKY.option.colorData[cr]
          });
      },1000);
    
    
    }
    OURSKY.addCircle = function(data){
      var entity = OURSKY.viewer.entities.add({
        position: Cesium.Cartesian3.fromDegrees(data.latlon[0],data.latlon[1]),
        name : data.name,
        ellipse : {
          height : OURSKY.option.sircleHeight,
          semiMinorAxis : OURSKY.option.sircleSize,
          semiMajorAxis : OURSKY.option.sircleSize,
          material : new Cesium.Color(data.color[0],data.color[1],data.color[2],data.color[3])
        }
      });
      // OURSKY.viewer.zoomTo(OURSKY.viewer.entities);
    }
    
    OURSKY.init();
    
    })();
        }

        $scope.initializeEarth();
    });
})();
