(function() {
    'use strict';

    var app = angular.module('oursky');

    app.controller('CalendarController', function($scope) {

        var imageList = {};
        var aeronetImages = {}
        var getImageList = function() {
            // get user's photos of the sky
            var xhr = new XMLHttpRequest();
            xhr.onreadystatechange = function() {
                if (xhr.readyState == 4) {
                    imageList = JSON.parse(xhr.responseText);
                    getPhotoCellsForCurrentMonth();
                    $scope.$apply();
                }
            };
            xhr.open('GET', 'img/seeddata/seeddata.json', true);
            xhr.send();

            // get aeronet images
            var xhr2 = new XMLHttpRequest();
            xhr2.onreadystatechange = function() {
                if (xhr2.readyState == 4) {
                    aeronetImages = JSON.parse(xhr2.responseText);
                    $scope.$apply();
                }
            };
            xhr2.open('GET', 'img/aeronetseed/seeddata.json', true);
            xhr2.send();
        };

        var getDateKeyForDate = function(date) {
            var year = date.getYear() + 1900;
            var month = date.getMonth() + 1;
            if (month < 10) {
                month = '0' + month;
            }
            var datedate = date.getDate();
            if (datedate < 10) {
                datedate = '0' + datedate;
            }

            return year + '-' + month + '-' + datedate;
        };

        // eventually this will come from a photo service
        var getImageDataForDate = function(date) {
            var dateKey = getDateKeyForDate(date);
            var images = [];

            if (dateKey in imageList) {
                images = imageList[dateKey];
            }

            return images;
        };

        var getFirstImageForDate = function(dateObject) {
            var images = getImageDataForDate(dateObject);
            return (images.length > 0) ? images[0].url : null;
        };

        var getPhotoCellsForCurrentMonth = function () {
            var rows = [];

            var date = new Date(Date.now());

            var month = date.getMonth();
            var year = date.getYear() + 1900;

            // http://stackoverflow.com/a/1184359
            var numberOfDays = new Date(year, month+1, 0).getDate();

            // extra call at loop beginning
            date = new Date(year, month, 1);

            var dayOfWeek = date.getDay();

            var currentRow = [];
            if (dayOfWeek > 0) {
                var pastDate = new Date(year, month, 0).getDate();
                for (var i = 0; i < dayOfWeek; i++) {
                    var dateFromLastMonth = pastDate - dayOfWeek + i + 1;
                    var dateObjectFromLastMonth = new Date(year, month-1, dateFromLastMonth);
                    // push empty cells until the first day of the month
                    currentRow.push({
                        date: dateFromLastMonth,
                        dateObject: dateObjectFromLastMonth,
                        imageURI: getFirstImageForDate(dateObjectFromLastMonth),
                        cssClass: 'past-month'
                    });
                }
            }

            for (var i = 1; i <= numberOfDays; i++) {
                var dateObject = new Date(year, month, i);
                dayOfWeek = dateObject.getDay();

                if (dayOfWeek == 0 && currentRow.length > 0) {
                    rows.push(currentRow);
                    currentRow = [];
                }

                currentRow.push({
                    date: i,
                    dateObject: dateObject,
                    imageURI: getFirstImageForDate(dateObject)
                });
            }

            if (dayOfWeek != 6) {
                // finish loop
                var nextDate = 1;
                for (var i = dayOfWeek+1; i <= 6; i++) {
                    currentRow.push({
                        date: nextDate++,
                        dateObject: null,
                        imageURI: null,
                        cssClass: 'next-month'
                    });
                }

                rows.push(currentRow);
            }

            var englishMonthNames = [
                "January", "February", "March", "April", "May", "June",
                "July", "August", "September", "October", "November", "December"
            ];

            $scope.currentMonth = englishMonthNames[month];
            $scope.calendarRows = rows;
        };

        // i don't know if there's an easier way to do this in onsen
        var showNode = function(domId) {
            var domNode = document.getElementById(domId);
            domNode.className = domNode.className.replace( /(?:^|\s)hidden(?!\S)/g , '' );
        };

        var hideNode = function(domId) {
            var domNode = document.getElementById(domId);
            if (domNode.className.indexOf('hidden') == -1) {
                domNode.className += ' hidden';
            }
        };

        $scope.calendarItemClick = function(scope) {
            var date = scope.calendarCell.dateObject;
            var images = getImageDataForDate(date);

            $scope.images = images;

            // i am sure there is a faster way to do this with onsen
            var listInnerHTML = '';
            for (var i = 0; i < images.length; i++) {
                var imageItem = images[i];
                listInnerHTML += '\
                <ons-list-item class="day-item" modifier="tappable">\
                    <div class="day-image"><img src="' + imageItem.url + '" /></div>\
                    <div class="day-caption day-location">Location: ' + imageItem.location + '</div>\
                    <div class="day-caption day-time">Time: ' + imageItem.time + '</div>\
                    <div class="day-caption day-color">Color: ' + imageItem.color + '</div>\
                </ons-list-item>';
            }
            var list = document.getElementById('calendar-day-list');
            list.innerHTML = listInnerHTML;

            var heading = document.getElementById('calendar-day-heading');
            heading.innerHTML = '<h2>' + date.toDateString() + '</h2>'

            var aeronetNode = document.getElementById('aeronet-comparison');
            var dateKey = getDateKeyForDate(date);
            if (dateKey in aeronetImages) {
                var aeronetImageSrc = aeronetImages[dateKey].url;
                aeronetNode.innerHTML = '<div class="aeronet-image">\
                    <img src="' + aeronetImageSrc + '" width="300px" /></div>';
            } else {
                aeronetNode.innerHTML = '';
            }

            showNode('calendar-day');
            hideNode('calendar');
        };

        $scope.backToCalendar = function(scope) {
            showNode('calendar');
            hideNode('calendar-day');
        };

        getImageList();

    });

})();


