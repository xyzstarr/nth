(function(){
    angular
            .module('loadshedding.app')
            .directive('tabsMenu',fnTabsMenu)
            ;
    function fnTabsMenu(){
        return {
            // can be used as attribute or element
            restrict: 'E',
            scope: false,
            // which markup this directive generates
            templateUrl: 'app/widgets/tabs_menu/tabs_menu.html'
        };
    }
    ;
})();