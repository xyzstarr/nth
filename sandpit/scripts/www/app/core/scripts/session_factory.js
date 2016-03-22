(function(){
    "use strict";
    angular
            .module('loadshedding.app')
            .constant('AUTH_EVENTS',{
                loginSuccess: 'auth-login-success',
                loginFailed: 'auth-login-failed',
                logoutSuccess: 'auth-logout-success',
                sessionTimeout: 'auth-session-timeout',
                notAuthenticated: 'auth-not-authenticated',
                notAuthorized: 'auth-not-authorized'
            })
            .factory('SessionFactory',['AUTH_EVENTS','$rootScope',fnSessionFactory])
            ;
    function fnSessionFactory(AUTH_EVENTS,$rootScope){
        //TODO drop and create sessions on both sides...
        var app_session = {};
        var create = function(api_session){
            $rootScope.$broadcast(AUTH_EVENTS.loginSuccess);
            $rootScope.is_user_authenticated = true;

            app_session = api_session.session_info;
            return app_session;
        };
        var destroy = function(){
            app_session = {};
            $rootScope.is_user_authenticated = false;
            return app_session;
        };
        var getsession = function(){
            return app_session;
        };
        var session = {
            CreateSession: create,
            DestroySession: destroy,
            GetSession: getsession
        };

        return session;
    }
})();
