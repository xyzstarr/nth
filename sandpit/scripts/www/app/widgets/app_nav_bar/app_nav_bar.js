(function(){
    angular
            .module('loadshedding.app')
            .directive('appNavBar',fnAppNavBar)
            ;
    function fnAppNavBar(){
        return {
            // can be used as attribute or element
            restrict: 'E',
            scope: false,
            // which markup this directive generates
            templateUrl: 'app/widgets/app_nav_bar/app_nav_bar.html'
        };
    }
    ;
})();