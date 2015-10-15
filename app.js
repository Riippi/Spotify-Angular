angular.module("app", [])
    .config([
    '$compileProvider',
    function ($compileProvider) {
        // allows linking to spotify app
        $compileProvider.aHrefSanitizationWhitelist(/^\s*(https?|spotify):/);
    }
])

.controller("myCtrl", function ($scope, $http) {


    $scope.myData = {};

    $scope.search = function () {
        
        console.log($scope.query);
        
        if ($scope.query === undefined || $scope.query.length == 0) return;

        makeQuery('artist', function (data) {
            $scope.myData.artists = data.artists.items;
        });

        makeQuery('album', function (data) {
            $scope.myData.albums = data.albums.items;
        });

        makeQuery('track', function (data) {
            $scope.myData.tracks = data.tracks.items;
        });


        function makeQuery(type, callback) {

            var url = 'https://api.spotify.com/v1/search?q=' + $scope.query +
                '&type=' + type +
                '&limit=20';

            // GET request
            $http.get(url).then(function successCallback(response) {

                callback(response.data);

            }, function errorCallback(response) {
                console.log('error');
            });

        }

    }


    // Parse artist names for track
    $scope.parseArtistsForTrack = function (artists) {

        var str = 'by: ';
        var first = true;

        for (artist in artists) {

            if (first) {
                first = false;
            } else {
                str += ', ';
            }
            str += artists[artist].name;
        }
        return str;
    }


    // Get the best image url from array or placeholder
    $scope.getImage = function (array) {

        if (array === undefined) {
            return 'http://placehold.it/64x64';
        }

        var last = array[array.length - 1];

        if (last === undefined) {
            return 'http://placehold.it/64x64';
        }

        return last.url;
    }

});