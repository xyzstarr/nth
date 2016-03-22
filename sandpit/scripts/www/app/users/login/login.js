/* global angular*/

(function(){
    "use strict";
    angular
            .module('loadshedding.app')
            .controller('UserLoginController',['$scope','UserLoginFactory','AppMapsFactory',fnUserLoginController])
            .factory('UserLoginFactory',['$http','AppApi','SessionFactory','$state',fnUserLoginFactory])
            ;
    function fnUserLoginFactory($http,AppApi,SessionFactory,$state){
        var service=new AppApi();
        function doLogIn(login_data){
            var promise;
            promise=service.Post('login',login_data);
            promise
                    .then(
                            function(results){
                                if(results.data.status==='success')
                                {
                                    $http.defaults.headers.common.Authorization=results.data.api_key;
                                    SessionFactory.CreateSession(results.data);
                                    $state.transitionTo('app.currentuserprofile');
                                }
                                return results;
                            },
                            function(results){
                                return results;
                            });
            return promise;
        }
        ;
        return{
            DoLogIn:doLogIn
        };
    }

    function fnUserLoginController($scope,UserLoginFactory,AppMapsFactory){
        //<editor-fold desc="Controller Log In Feature">
        $scope.LoginCredentials={};
        $scope.LoginCredentials.email='tizahbut@siwowod.org';
        $scope.LoginCredentials.password='password';
        $scope.UserLogin=function(){
            var payload=$scope.LoginCredentials;
            var promise;
            promise=UserLoginFactory.DoLogIn(payload);
            promise.then(function(results){
                //TODO not yet figured out. after logging in...
                //console.info('//TODO not yet figured out. after logging in...');
            });
        };
        //</editor-fold>

        //<editor-fold desc="Controller Sign Out Feature">
        var UserLogOut=function(){
            AppApi.get('logout')
                    .then(function(results){
                        AppApi.toast(results);
                        $state.go('app.login');
                    });
        };
        //</editor-fold>
        //$scope.searchbox=AppMapsFactory.SearchBox;
        //console.log($scope.searchbox);
        $scope.address={};
        var promise;
        promise=AppMapsFactory.CurrentPosition;
        promise
                .then(function(result){
                    $scope.address=result;
                    //$scope.map=AppMapsFactory.MapInfo;
                    $scope.map={
                        center:{
                            latitude:result.coords.latitude,
                            longitude:result.coords.longitude
                        },
                        zoom:14
                    };

                    AppMapsFactory.ReverseGeoCode(result.coords)
                            .then(function(result){

                                //$scope.address1=result;
                                $scope.address.details={
                                    'street_number':result[0].address_components[0].long_name,
                                    'street_name':result[0].address_components[1].long_name,
                                    'suburb':result[0].address_components[2].long_name,
                                    'local_municipality':result[0].address_components[3].long_name,
                                    'administration':result[0].address_components[4].long_name,
                                    'province':result[0].address_components[5].long_name,
                                    'postal_code':result[0].address_components[7].long_name
                                }
                                ;
                                console.log(result);

                            },function(result){
                                $scope.address=result;
                                console.log($scope.address);
                            });
                    console.log(result);
                    console.log($scope.map);
                },function(result){
                    $scope.address=result;
                    console.log($scope.address);
                })
                ;

    }
})();
