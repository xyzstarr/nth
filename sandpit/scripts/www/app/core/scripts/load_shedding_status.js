(function(){
    angular
            .module('loadshedding.app')
            .factory('LoadSheddingStatus',[fnLoadSheddingStatus])
            ;
    function fnLoadSheddingStatus(){
        var loadSheddingStatus={
            loadSheddingStage:0,
            //loadSheddingStage:3,
            //loadSheddingStage:2
            //loadSheddingStage:3
            get loadSheddingStatusMessage(){
                switch(this.loadSheddingStage) {
                    case 0:
                        return 'Not Load Shedding';
                        break;
                    case 1:
                    case 2:
                    case 3:
                        return 'Currently In Stage '+this.loadSheddingStage;
                        break;
                }
            }
        };
        return {
            CurrentStatus:loadSheddingStatus
        };
    }

})();