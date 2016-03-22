angular
        .module('loadshedding.app')
        .directive('thitosNavButtons',thitosNavButtons)
        ;
function thitosNavButtons(){
    return {
        // can be used as attribute or element
        restrict: 'E',
        scope: false,
        // which markup this directive generates
        templateUrl: 'app/widgets/thitos-nav-buttons.html'
    };
}
;
