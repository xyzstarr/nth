(function(){
    angular
            .module('loadshedding.app')
            .directive('appListFilter',appListFilterDirective)
            ;
    function appListFilterDirective(){
        return {
            // can be used as attribute or element
            restrict:'E',
            //scope:true,
            //controller: 'LoadSheddingStatusController',
            templateUrl:'app/widgets/app_list_filter/app_list_filter.html'
        };
    }
    ;
})();