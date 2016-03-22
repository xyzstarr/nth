(function(){
    angular
            .module('loadshedding.app')
            .factory('SchedulesFactory',['AppApi',fnSchedulesFactory])
            .controller('SchedulesController',['$scope','$stateParams','SchedulesFactory',fnSchedulesController])
            ;
    function fnSchedulesFactory(AppApi){
        var service=new AppApi();
        function getSchedules(suburb_id){
            var promise;
            promise=service.Get('schedules/'+suburb_id);
            promise
                    .then(
                            function(results){
                                console.log(results);
                                return results;
                            },
                            function(error){
                                return error;
                            });
            return promise;
        }
        ;
        return {
            GetSchedules:getSchedules
        };

    }
    function fnSchedulesController($scope,$stateParams,SchedulesFactory){
        var promise;
        promise=SchedulesFactory.GetSchedules($stateParams.suburb_id);
        promise.then(function(results){
            $scope.schedules=results.data.schedules;
        });
    }
    ;


})();