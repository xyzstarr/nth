(function(){
    angular
            .module('loadshedding.app')
            .factory('UserSuburbsFactory',['AppApi','SessionFactory',fnUserSuburbsFactory])
            .controller('UserSuburbsController',['$scope','UserSuburbsFactory',fnUserSuburbsController])
            .directive('userSuburbs',fnUserSuburbsDirective)
            ;
    function fnUserSuburbsDirective(){
        return {
            // can be used as attribute or element
            restrict: 'E',
            scope: true,
            controller: 'UserSuburbsController',
            templateUrl: 'app/users/user_suburbs/user_suburbs.html'
        };
    }
    ;
    function fnUserSuburbsFactory(AppApi,SessionFactory){
        var service = new AppApi();
        var CurrentUser = SessionFactory.GetSession();
        //console.log(CurrentUser);

        function getUserSuburbs(){
            var promise;
            promise = service.Get('user_suburbs/'+CurrentUser.user_id);
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
        function saveNewUserSuburb(newUserSuburbDetails){
            var promise;
            promise = service.Post('user_suburbs',newUserSuburbDetails);
            promise
                    .then(
                            function(results){
                                if(results.data.status==='success')
                                {
                                    //SessionFactory.CreateSession(results.data);
                                    //$state.transitionTo('app.currentuserprofile');
                                }
                                return results;
                            },
                            function(results){
                                return results;
                            });
            return promise;
        }
        ;
        return {
            SaveNewUserSuburb: saveNewUserSuburb,
            GetUserSuburbs: getUserSuburbs
        };















    }
    ;
    function fnUserSuburbsController($scope,UserSuburbsFactory){
        //$scope.AddNewUserSuburbs = UserSuburbsFactory.UserSuburbsFactory;

        var promise;
        promise = UserSuburbsFactory.GetUserSuburbs();
        promise.then(function(results){
            $scope.suburbs = results.data.user_suburbs;
        });
    }
    ;
})();