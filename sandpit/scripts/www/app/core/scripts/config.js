(function(){
    angular
            .module('loadshedding.app')
            .config(['$ionicConfigProvider',fnIonicCustomConfigs])
            ;
    function fnIonicCustomConfigs($ionicConfigProvider){
        $ionicConfigProvider
                .tabs.position('bottom');

    }
})();

