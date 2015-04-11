(function() {
    'use strict';

    var app = angular.module('oursky');

    app.controller('CalendarController', function($scope) {

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
                    month: month,
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

                var imageURI = 'img/IMG_0197_small.JPG';

                currentRow.push({
                    date: i,
                    month: month,
                    imageURI: imageURI
                });
            }

            if (dayOfWeek != 6) {
                // finish loop
                for (var i = dayOfWeek+1; i <= 6; i++) {
                    currentRow.push({
                        // TODO: add dates for next month
                        date: 0,
                        month: month,
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

            console.log($scope.calendarRows);
        };

        $scope.calendarItemClick = function(scope) {
            var date = scope.calendarCell.date;
            var images = [];

            images.push({
                location: 'Somerville, MA'
                time: '5:00 pm',
                color: 'Blue',
                url: 'img/IMG_0208_small.JPG'
            });
            images.push({
                location: 'Somerville, MA'
                time: '9:00 am',
                color: 'Blue',
                url: 'img/IMG_0197_small.JPG'
            });

            $scope.images = images;
        };

        getPhotoCellsForCurrentMonth();

    });

})();


