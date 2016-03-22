(function(){
    angular
            .module('loadshedding.app')
            .factory('CurrentUserProfileFactory',['AppApi','SessionFactory',fnCurrentUserProfileFactory])
            .controller('CurrentUserProfileController',['$scope','CurrentUserProfileFactory',fnCurrentUserProfileController])
            ;
    function fnCurrentUserProfileFactory(AppApi,SessionFactory){
        var service = new AppApi();
        var CurrentUser = SessionFactory.GetSession();

        return {
            GetUserProfile: CurrentUser
        };
    }
    function fnCurrentUserProfileController($scope,UserProfileFactory){
        $scope.UserProfile = UserProfileFactory.GetUserProfile;
    }
})();