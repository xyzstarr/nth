(function(){
    angular
            .module('loadshedding.app')
            .factory('ProvincesFactory',['AppApi',fnProvincesFactory])
            .controller('ProvincesController',['$scope','ProvincesFactory',fnProvincesController])
            ;
    function fnProvincesFactory(AppApi){
        var service = new AppApi();
        function getProvinces(){
            var promise;
            promise = service.Get('provinces');
            promise
                    .then(
                            function(results){
                                return results;
                            },
                            function(error){
                                return error;
                            });
            return promise;
        }
        ;
        return {
            GetProvinces: getProvinces
        };

    }
    function fnProvincesController($scope,ProvincesFactory){
        var promise;
        promise = ProvincesFactory.GetProvinces();
        promise.then(function(results){
            $scope.provinces = results.data.provinces;
        });
    }
    ;


})();