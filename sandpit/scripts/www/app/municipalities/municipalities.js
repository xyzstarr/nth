(function(){
    angular
            .module('loadshedding.app')
            .factory('MunicipalitiesFactory',['AppApi',fnMunicipalitiesFactory])
            .controller('MunicipalitiesController',['$scope','$stateParams','MunicipalitiesFactory',fnMunicipalitiesController])
            ;
    function fnMunicipalitiesFactory(AppApi){
        var service = new AppApi();
        function getMunicipalities(province_id){
            var promise;
            promise = service.Get('municipalities/'+province_id);
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
            GetMunicipalities: getMunicipalities
        };

    }
    function fnMunicipalitiesController($scope,$stateParams,MunicipalitiesFactory){
        var promise;
        promise = MunicipalitiesFactory.GetMunicipalities($stateParams.province_id);
        promise.then(function(results){
            $scope.municipalities = results.data.municipalities;
        });
    }
    ;


})();