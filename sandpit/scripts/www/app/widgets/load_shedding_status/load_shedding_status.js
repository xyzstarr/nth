(function(){
    angular
            .module('loadshedding.app')
            .factory('LoadSheddingStatusFactory',[fnLoadSheddingStatusFactory])
            .controller('LoadSheddingStatusController',['$scope','CandleFactory','LoadSheddingStatusFactory',fnLoadSheddingStatusController])
            .directive('loadSheddingStatus',loadSheddingStatusDirective)
            ;
    function loadSheddingStatusDirective(){
        return {
            // can be used as attribute or element
            restrict:'E',
            scope:true,
            controller:'LoadSheddingStatusController',
            templateUrl:'app/widgets/load_shedding_status/load_shedding_status.html'
        };
    }
    ;
    function fnLoadSheddingStatusFactory(){
        var loadSheddingStatus={
            //LoadSheddingStage: 0
            LoadSheddingStage:3,
            //LoadSheddingStage:2
            //LoadSheddingStage:3
            get LoadSheddingStatusMessage(){
                switch(this.LoadSheddingStage) {
                    case 0:
                        return 'Not Load Shedding';
                        break;
                    case 1:
                    case 2:
                    case 3:
                        return 'Currently In Stage '+this.LoadSheddingStage;
                        break;
                }
            }
        };
        return {
            CurrentStatus:loadSheddingStatus
        };
    }
    ;
    function fnLoadSheddingStatusController($scope,CandleFactory,LoadSheddingStatusFactory){
        $scope.ToggleCandle=CandleFactory.ToggleCandle;
        $scope.LoadSheddingStatus=LoadSheddingStatusFactory.CurrentStatus;
    }
    ;
})();