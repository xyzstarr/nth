(function(){
    "use strict";
    angular
            .module('loadshedding.app')
            .config(fnConfigAngularGoogleMaps)
            .factory('AppMapsFactory',['$cordovaGeolocation','$q','uiGmapGoogleMapApi','$window',fnAppMapsFactory])
            .service('GeoPositionFactory',['AppMapsFactory',fnGeoPositionFactory])
            ;
    function fnConfigAngularGoogleMaps(uiGmapGoogleMapApiProvider){
        uiGmapGoogleMapApiProvider.configure({
            //    key: 'your api key',
            v:'3.17',
            libraries:'weather,geometry,visualization,places'
        });
    }
    function fnAppMapsFactory($cordovaGeolocation,$q,uiGmapGoogleMapApi,$window){
        var events={
            places_changed:function(){
                console.log(events.places_changed.val);
            }
        };
        var searchBox=function(){
            var search_box={
                template:'searchbox.tpl.html',
                events:events,
                parentdiv:'div-map-search'
            };
            return search_box;
        };
        var geoLocation={
            mapInfo:{
                coords:{
                    latitude:null,
                    longitude:null
                },
                elevation:8
            },
            getLocation:function(){
                //console.log(uiGmapGoogleMapApi);
                var deferred=$q.defer();
                if(navigator.geolocation){
                    // geo location is supported. Call navigator.geolocation.getCurrentPosition and :
                    // - resolve the promise with the returned Position object, or
                    // - reject the promise with the returned PositionError object, or
                    // - time out after 5 seconds
                    navigator.geolocation.getCurrentPosition(
                            function(result){
                                console.log(result.timestamp);

                                // uiGmapGoogleMapApi is a promise.
                                // The "then" callback function provides the google.maps object.
                                geoLocation.mapInfo.coords=result.coords;
                                geoLocation.appMap();
                                deferred.resolve(result);
                            },
                            function(error){
                                console.log(error);
                                deferred.reject(error);
                            },{
                        timeout:5000
                    });
                } else {
                    //geo location isn't supported
                    //Reject the promise with a suitable error message
                    deferred.reject(new Error('Your browser does not support Geo Location.'));
                }
                return deferred.promise;
            },
            reverseGeoCodePosition:function(coords){
                var deferred=$q.defer();
                var latitude=coords.latitude;
                var longitude=coords.longitude;

                // uiGmapGoogleMapApi is a promise.
                // The "then" callback function provides the google.maps object.
                uiGmapGoogleMapApi.then(function(maps){
                    var positionToReverseGeoCode=new maps.LatLng(latitude,longitude);
                    var reverseGeocoder=new maps.Geocoder();
                    reverseGeocoder.geocode(
                            {
                                'latLng':positionToReverseGeoCode
                            },
                    function(results){
                        console.log(results);
                        deferred.resolve(results);
                    });
                });

                //userLocation.address = {};
                return deferred.promise;
            },
            appMap:function(){
                var objMap;
                console.log('returning map info...');
                console.log(geoLocation.mapInfo);
                objMap={};
                objMap={
                    center:{
                        latitude:geoLocation.mapInfo.coords.latitude,
                        longitude:geoLocation.mapInfo.coords.latitude
                    },
                    zoom:geoLocation.mapInfo.elevation
                };
                return objMap;
            }
        };
        return {
            CurrentPosition:geoLocation.getLocation(),
            ReverseGeoCode:geoLocation.reverseGeoCodePosition,
            SearchBox:searchBox

        };
    }
    ;

    function fnGeoPositionFactory(AppMapsFactory){
        //this.address;// = {};
        //var CurrentPosition = function(){
        //    var promise;
        //   promise = AppMapsFactory.CurrentPosition();
        //    promise.then(function(result){
        //        address = AppMapsFactory.ReverseGeoCode(result.coords);
        //    });
        //    //return promise;
        //};
        //var SendToReverseGeoCoder = function(result){
        //    var promise;
        //    promise = AppMapsFactory.ReverseGeoCode(result.coords);
        //promise.then(function(geoposition){
        //   return geoposition;
        //});
        //console.log(result.coords);
        //    return promise;
        //};
        //CurrentPosition();
        //console.log(CurrentPosition());
        //console.log();
        //return{
        //CurrentPosition: CurrentPosition,
        //ReverseGeoCode: SendToReverseGeoCoder,
        //    Address: address
        //};
    }
})();
