(function () {
    angular
            .module('loadshedding.maps')
            .controller('GMapsController', ['$scope', '$cordovaGeolocation', fnGMapsController])
            .controller('MapController', ['$scope', '$ionicLoading', '$ionicModal', mapController]);

    function fnGMapsController($scope, $cordovaGeolocation) {
        $scope.lookupaddress = {};
        var events = {
            places_changed: function () {
                console.log(events.places_changed.val);
            }
        };
        $scope.searchbox = {template: 'searchbox.tpl.html', events: events, parentdiv: 'div-map-search'};
        // onSuccess Callback
        // This method accepts a Position object, which contains the
        // current GPS coordinates
        //
        var ReverseGeocode = function (latitude, longitude) {
            var reverseGeocoder = new google.maps.Geocoder();
            var positionToReverseGeoCode = new google.maps.LatLng(latitude, longitude);
            reverseGeocoder.geocode({'latLng': positionToReverseGeoCode}, function (results, status) {

                if (status === google.maps.GeocoderStatus.OK) {
                    if (results[0]) {
                        console.log(results[0]);
                        //navigator.notification.alert('Address : ' + results[0].formatted_address + ',' + 'Type : ' + results[0].types);
                        alert('Address : ' + results[0].formatted_address + ',' + 'Type : ' + results[0].types);
                        console.log('Address : ' + results[0].formatted_address + ',' + 'Type : ' + results[0].types);
                    }
                    else {
                        navigator.notification.alert('Unable to detect your address.');
                    }
                } else {
                    navigator.notification.alert('Unable to detect your address.');
                }
            });
        };
        var onLocationSuccess = function (position) {
            $scope.map = {
                center: {
                    latitude: position.coords.latitude,
                    longitude: position.coords.longitude
                },
                zoom: 14,
                options: {MapTypeId: "SATELLITE"}
            };
            $scope.options = {scrollwheel: false};
            ReverseGeocode(position.coords.latitude, position.coords.longitude);
            alert('Latitude: ' + position.coords.latitude + '\n' +
                    'Longitude: ' + position.coords.longitude + '\n' +
                    'Altitude: ' + position.coords.altitude + '\n' +
                    'Accuracy: ' + position.coords.accuracy + '\n' +
                    'Altitude Accuracy: ' + position.coords.altitudeAccuracy + '\n' +
                    'Heading: ' + position.coords.heading + '\n' +
                    'Speed: ' + position.coords.speed + '\n' +
                    'Timestamp: ' + position.timestamp + '\n');
        };

        // onError Callback receives a PositionError object
        //
        function onLocationError(error) {
            alert('code: ' + error.code + '\n' +
                    'message: ' + error.message + '\n');
        }

        var getGeoCoordinatesFromAddress = function (address) {
            //var address = $('#address').val();
            //var address = '344 Somafco Street Tembisa 1632';
            alert(address);
            var getGeocoder = new google.maps.Geocoder();
            getGeocoder.geocode({'address': address}, function (results, status) {
                if (status === google.maps.GeocoderStatus.OK) {
                    if (results[0]) {
                        var latitude = results[0].geometry.location.lat();
                        var longitude = results[0].geometry.location.lng();
                        //navigator.notification.alert('Latitude : ' + latitude + ',' + 'Longitude : ' + longitude);
                        alert('Latitude : ' + latitude + ',' + 'Longitude : ' + longitude);
                        console.log('Latitude : ' + latitude + ',' + 'Longitude : ' + longitude);
                    }
                    else {
                        //navigator.notification.alert('Unable to detect your coordinates.');
                        alert('Unable to detect your coordinates.');
                    }
                }
                else {
                    //navigator.notification.alert('Unable to detect your coordinates.');
                    alert('Unable to detect your coordinates.');
                }
            });
        };

        navigator.geolocation.getCurrentPosition(onLocationSuccess, onLocationError, {maximumAge: 3000, timeout: 5000, enableHighAccuracy: true});

    }
    function mapController($scope, $ionicLoading, $ionicModal) {
//            $scope.showmap = false;
//
//            if ($scope.showmap === true)
//            {
//                $scope.showmap = false
//            }
//            else
//            {
//                $scope.showmap = false
//            }
        $ionicModal.fromTemplateUrl('/templates/\n\
map-modal.html', {
            scope: $scope,
            animation: 'slide-in-up'
        }).then(function (modal) {
            $scope.modal = modal
        })

        $scope.openMapModal = function () {
            $scope.modal.show()
        }

        $scope.closeModal = function () {
            $scope.modal.hide();
            $scope.showmap = false;
        };

        $scope.$on('$destroy', function () {
            $scope.modal.remove();
        });

        google.maps.event.addDomListener(window, 'load', function () {
            var myLatlng = new google.maps.LatLng(37.3000, -120.4833);

            var mapOptions = {
                center: myLatlng,
                zoom: 16,
                mapTypeId: google.maps.MapTypeId.ROADMAP
            };

            var map = new google.maps.Map(document.getElementById("map"), mapOptions);

            navigator.geolocation.getCurrentPosition(function (pos) {
                map.setCenter(new google.maps.LatLng(pos.coords.latitude, pos.coords.longitude));
                var myLocation = new google.maps.Marker({
                    position: new google.maps.LatLng(pos.coords.latitude, pos.coords.longitude),
                    map: map,
                    title: "My Location"
                });
                $scope.address = ReverseGeocode(pos.coords.latitude, pos.coords.longitude);
                $scope.location = new google.maps.LatLng(pos.coords.latitude, pos.coords.longitude);
            });

            var ReverseGeocode = function (latitude, longitude) {
                var reverseGeocoder = new google.maps.Geocoder();
                var currentPosition = new google.maps.LatLng(latitude, longitude);
                reverseGeocoder.geocode({'latLng': currentPosition}, function (results, status) {

                    if (status === google.maps.GeocoderStatus.OK) {
                        if (results[0]) {
                            console.log(results[0]);
                            //navigator.notification.alert('Address : ' + results[0].formatted_address + ',' + 'Type : ' + results[0].types);
                            alert('Address : ' + results[0].formatted_address + ',' + 'Type : ' + results[0].types);
                            console.log('Address : ' + results[0].formatted_address + ',' + 'Type : ' + results[0].types);
                        }
                        else {
                            navigator.notification.alert('Unable to detect your address.');
                        }
                    } else {
                        navigator.notification.alert('Unable to detect your address.');
                    }
                });
            };

            $scope.map = map;
            // $scope.title = myLocation;
        });

    }
})();