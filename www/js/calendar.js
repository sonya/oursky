(function() {
    'use strict';

    var app = angular.module('oursky');

    app.controller('CalendarController', function($scope) {

        // eventually this will come from a photo service
        var getImageDataForDate = function(date) {
            // colors: deep blue blue, light blue, pale blue, milky, other
            var fakeImageData = [
                {
                    url: 'img/IMG_0197_small.JPG',
                    time: '10:00 AM',
                    location: 'Somerville, MA',
                    color: 'Deep blue'
                },
                {
                    url: 'img/IMG_0201_small.JPG',
                    time: '11:00 AM',
                    location: 'Somerville, MA',
                    color: 'Milky'
                },
                {
                    url: 'img/IMG_0202_small.JPG',
                    time: '4:00 PM',
                    location: 'Somerville, MA',
                    color: 'Milky'
                },
                {
                    url: 'img/IMG_0208_small.JPG',
                    time: '5:00 PM',
                    location: 'Somerville, MA',
                    color: 'Deep blue'
                }
            ];

            // each day may have zero or one or many images
            // we are just kind of simulating that
            var dateNumber = date.getDate();
            var numberOfImages = (dateNumber * dateNumber - (dateNumber % 4) + 1) % 3;

            var images = [];
            for (var i = 0; i < numberOfImages; i++) {
                var random = Math.floor(Math.random() * fakeImageData.length);
                images.push(fakeImageData[random]);
            }

            return images;
        };

        var getPhotoCellsForCurrentMonth = function () {
            var rows = [];

            var date = new Date();

            var month = date.getMonth() + 1;
            var year = date.getYear();

            // http://stackoverflow.com/a/1184359
            var numberOfDays = new Date(year, month, 0).getDate();

            // extra call at loop beginning
            date = new Date(year, month, 1);
            var dayOfWeek = date.getDay();

            var currentRow = []
            for (var i = 0; i < dayOfWeek; i++) {
                // push empty cells until the first day of the month
                currentRow.push({
                    // TODO: get date from previous month
                    date: 0,
                    dateObject: null,
                    imageURI: null
                });
            }

            for (var i = 1; i <= numberOfDays; i++) {
                date = new Date(year, month, i);
                dayOfWeek = date.getDay();

                if (dayOfWeek == 0 && currentRow.length > 0) {
                    rows.push(currentRow);
                    currentRow = [];
                }

                var images = getImageDataForDate(date);
                var imageURI = null;
                if (images.length > 0) {
                    imageURI = images[0].url;
                }

                currentRow.push({
                    date: i,
                    dateObject: date,
                    imageURI: imageURI
                });
            }

            if (dayOfWeek != 6) {
                // finish loop
                for (var i = dayOfWeek+1; i <= 6; i++) {
                    currentRow.push({
                        // TODO: add dates for next month
                        date: 0,
                        dateObject: null,
                        imageURI: null
                    });
                }

                rows.push(currentRow);
            }

            var englishMonthNames = [
                "January", "February", "March", "April", "May", "June",
                "July", "August", "September", "October", "November", "December"
            ];

            $scope.currentMonth = englishMonthNames[month-1];
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

            showNode('calendar-day');
            hideNode('calendar');
        };

        $scope.backToCalendar = function(scope) {
            showNode('calendar');
            hideNode('calendar-day');
        };

        getPhotoCellsForCurrentMonth();

    });

})();


