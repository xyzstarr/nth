(function(){
    angular.module('loadshedding.app')
            .controller('NavController',navController)
            ;

    function navController($scope,$ionicSideMenuDelegate){
        $scope.toggleLeft = function(){
            $ionicSideMenuDelegate.toggleLeft();
        };
    }
})();