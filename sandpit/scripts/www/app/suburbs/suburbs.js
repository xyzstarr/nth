(function(){
    angular
            .module('loadshedding.app')
            .factory('SuburbsFactory',['AppApi','CurrentUserProfileFactory',fnSuburbsFactory])
            .controller('SuburbsController',['$scope','$stateParams','SuburbsFactory','SessionFactory','UserSuburbsFactory',fnSuburbsController])
            ;
    function fnSuburbsFactory(AppApi,CurrentUserProfileFactory){
        var service = new AppApi();

        function currentUser(){
            return CurrentUserProfileFactory.GetUserProfile;
        }
        ;

        function getSuburbs(municipal_id){
            var promise;
            promise = service.Get('suburbs/'+municipal_id);
            promise
                    .then(
                            function(results){
                                return results;
                            },
                            function(error){
                                return error;
                            });
            return promise;
        }
        ;

        return {
            GetSuburbs: getSuburbs,
            CurrentUser: currentUser
        };
    }
    function fnSuburbsController($scope,$stateParams,SuburbsFactory,SessionFactory,UserSuburbsFactory){

        var GetSuburbs = function(){
            var promise;
            promise = SuburbsFactory.GetSuburbs($stateParams.municipal_id);
            promise.then(function(results){
                $scope.suburbs = results.data.suburbs;
            });
        };

        $scope.AddNewUserSuburb = function(suburb_id){
            var session = SessionFactory.GetSession();
            var UserSuburb = {};
            UserSuburb.user_id = session.user_id;
            UserSuburb.suburb_id = suburb_id;
            UserSuburbsFactory.SaveNewUserSuburb(UserSuburb);
        };

        GetSuburbs();
    }
    ;


})();