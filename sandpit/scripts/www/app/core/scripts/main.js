(function(){
    angular.module('loadshedding.app')

            .factory('BaseFactory',[fnBaseFactory])
            .controller('SettingsController',['$scope','BaseFactory',fnBaseController])
            ;
    function fnBaseFactory(){
        //    var baseURL="http://192.168.43.111:8080/webapps/apis/loadshedding-api/api/v1/";
        var baseURL="http://169.254.80.80:8080/webapps/apis/loadshedding-api/api/v1/";
        //baseURL="http://127.0.0.1:8080/webapps/apis/loadshedding-api/api/v1/";

        var setURL=function(API){
            var techkcURL;
            var localhostURL;
            var thitosURL;
            var alloniaURL;
            var URL;
            console.log(AppData);
            URL="";
            alloniaURL="http://main:8080/webapps/apis/loadshedding-api/api/v1/";
            thitosURL="http://locale:8080/webapps/apis/loadshedding-api/api/v1/";
            localhostURL="http://169.254.80.80:8080/webapps/apis/loadshedding-api/api/v1/";
            techkcURL="http://169.254.80.80:8080/webapps/apis/loadshedding-api/api/v1/";
            switch(API.Settings.Env) {
                case 'dev':
                    serviceBase=thitosURL;
                    break;
                default:
                    serviceBase=alloniaURL;
            }

            serviceBase=URL;
            console.log(AppData);
            AppData.BaseURL=URL;
            return baseURL;
        };
        return{
            BaseURL:baseURL,
            SetURL:setURL
        };
    }
    ;
    function fnBaseController($scope,BaseFactory){

        $scope.logs=AppData.Logs;
        $scope.API={};
        $scope.API.Settings={};
        $scope.API.Settings.ErrorAlerts=AppData.API.ErrorAlerts;
        //$scope.API.Settings.URI="localhost";
        apiURI=AppData.API.BaseURL.localhost;
        $scope.SetAPI=function(){
            AppData.API.ErrorAlerts=$scope.API.Settings.ErrorAlerts;
            switch($scope.API.Settings.URI) {
                case 'thitos':
                    apiURI=AppData.API.BaseURL.thitos;
                    $scope.API.Settings.FullURI=apiURI;
                    break;
                case 'localhost':
                    apiURI=AppData.API.BaseURL.localhost;
                    $scope.API.Settings.FullURI=apiURI;
                    ;
                    break;
                case 'allonia':
                    apiURI=AppData.API.BaseURL.allonia;
                    $scope.API.Settings.FullURI=apiURI;
                    ;
                    break;
                case 'calmcarnage':
                    apiURI=AppData.API.BaseURL.calmcarnage;
                    $scope.API.Settings.FullURI=apiURI;
                    ;
                    break;
                case 'techkc':
                    apiURI=AppData.API.BaseURL.techkc;
                    $scope.API.Settings.FullURI=apiURI;
                    ;
                    break;
                default:
                    apiURI=$scope.API.Settings.URI;
                    $scope.API.Settings.FullURI=apiURI;
                    break;

            }
            serviceBase=apiURI+apiEndPoint+apiVersion;
        };
        $scope.RemoveLogItem=function(log){
            console.log(log);
            $scope.logs.splice(log);
        };
    }
})();
