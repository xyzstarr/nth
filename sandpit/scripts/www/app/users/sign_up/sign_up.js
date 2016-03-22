(function(){
    angular
            .module('loadshedding.app')
            .factory('SignUpFactory',['AppApi','SessionFactory','$state',fnSignUpFactory])
            .controller('SignUpController',['$scope','SignUpFactory',fnSignUpController])
            ;
    function fnSignUpFactory(AppApi,SessionFactory,$state){
        var service=new AppApi();
        function doSignUp(signUpDetails){
            var promise;
            promise=service.Post('signup',signUpDetails);
            promise
                    .then(
                            function(results){
                                if(results.data.status==='success')
                                {
                                    SessionFactory.CreateSession(results.data);
                                    $state.transitionTo('app.currentuserprofile');
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
            DoSignUp:doSignUp
        };
    }
    function fnSignUpController($scope,SignUpFactory){
        $scope.SignUpDetails={
            name:null,
            email:null,
            password:null,
            confirmPassword:null,
            phone:Math.floor((Math.random()*100000000)+1),
            address:null
        };
        $scope.RandomizeData=function(){
            $scope.SignUpDetails={
                name:chance.name(),
                email:chance.email(),
                password:'password',
                confirmPassword:'password',
                phone:chance.phone({
                    country:'uk',
                    mobile:true
                }),
                address:chance.address()
            };
        };
        $scope.SignUpResults={
            showResults:false,
            status:null,
            message:null,
            user_id:null,
            styleApiStatusInfo:"api-status-info"
        };
        $scope.DoSignUp=function(){
            var payload=$scope.SignUpDetails;
            var promise;
            promise=SignUpFactory.DoSignUp(payload);
            promise.then(function(results){
                //$scope.SignUpResults.showResults=true;
                $scope.SignUpResults.message=results.data.message;
                $scope.SignUpResults.styleApiStatusInfo=fnStyleApiStatusInfo(results.data.status);
            });
        };
        function fnStyleApiStatusInfo(status){
            var style;
            switch(status)
            {
                case "success":
                    style="api-status-success";
                    break;
                case "error":
                    style="api-status-error";
                    break;
            }
            return style;
        }
        ;
    }
})();