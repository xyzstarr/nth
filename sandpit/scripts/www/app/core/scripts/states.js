(function(){
    angular.module('loadshedding.app')
            .config(['$stateProvider','$urlRouterProvider',fnConfigStates])
            ;
    function fnConfigStates($stateProvider,$urlRouterProvider){
        $stateProvider
                // setup an abstract state for the tabs directive
                .state('app',{
                    url:'/app',
                    templateUrl:'app/core/partials/abstract.html',
                    abstract:true,
                    controller:'BaseController'
                })
                .state('app.home',{
                    url:'/home',
                    authenticate:true,
                    views:{
                        'load-shedding-main':{
                            templateUrl:'app/core/partials/home.html',
                            controller:'BaseController'
                        }
                    }
                })
                .state('app.settings',{
                    url:'/settings',
                    //authenticate:true,
                    views:{
                        'load-shedding-main':{
                            templateUrl:'app/core/partials/settings.html',
                            controller:'SettingsController'
                        }
                    }
                })
                .state('app.login',{
                    url:'/login',
                    views:{
                        'load-shedding-main':{
                            templateUrl:'app/users/login/login.html',
                            controller:'UserLoginController'
                        }
                    }
                })
                .state('app.signup',{
                    url:'/signup',
                    views:{
                        'load-shedding-main':{
                            templateUrl:'app/users/sign_up/sign_up.html',
                            controller:'SignUpController'
                        }
                    }
                })
                .state('app.currentuserprofile',{
                    url:'/currentuserprofile',
                    authenticate:true,
                    views:{
                        'load-shedding-main':{
                            templateUrl:'app/users/profile/current_user/current_user_profile.html',
                            controller:'CurrentUserProfileController'
                        }
                    }
                })
                .state('app.provinces',{
                    url:"/provinces",
                    authenticate:true,
                    views:{
                        'load-shedding-main':{
                            templateUrl:'app/provinces/provinces.html',
                            controller:'ProvincesController'
                        }
                    }
                })
                .state('app.municipalities',{
                    url:"/municipalities/:province_id",
                    authenticate:true,
                    views:{
                        'load-shedding-main':{
                            templateUrl:"app/municipalities/municipalities.html",
                            controller:'MunicipalitiesController'
                        }
                    }
                })
                .state('app.suburbs',{
                    url:"/suburbs/:municipal_id",
                    authenticate:true,
                    views:{
                        'load-shedding-main':{
                            templateUrl:"app/suburbs/suburbs.html",
                            controller:'SuburbsController'
                        }
                    }
                })
                .state('app.schedules',{
                    url:"/schedules/:suburb_id",
                    authenticate:true,
                    views:{
                        'load-shedding-main':{
                            templateUrl:"app/schedules/schedules.html",
                            controller:'SchedulesController'
                        }
                    }
                })
                .state('app.xxx',{
//                .state('app.settings', {
//                    url: "/settings",
//                    views: {
//                        'load-shedding-main': {
//                            templateUrl: "/loadshedding.settings.html",
//                            controller: 'SettingsController'
//                        }
//                    }
//                })
//
//
//
////                    .state('app', {
////                        url: '/app',
////                        templateUrl: '/loadshedding.abstract.html',
////                        abstract: true,
////                        controller: 'LoadSheddingMainController'
////                    })
////                    .state('app.home', {
////                        url: '/home',
////                        views: {
////                            'load-shedding-main': {
////                                templateUrl: '/loadshedding.home.html',
////                                controller: 'LoadSheddingMainController'
////                            }
////                        }
////                    })
////
////
////                    .state('app.chat', {
////                        url: '/chat',
////                        views: {
////                            'load-shedding-main': {
////                                templateUrl: '/loadshedding.chat.html',
////                                controller: 'SndChatPageController'
////                            }
////                        }
////                    })
////                    .state('app.chat-single', {
////                        url: '/chat-single',
////                        views: {
////                            'load-shedding-main': {
////                                templateUrl: '/loadshedding.chat-single.html',
////                                controller: 'SndChatSinglePageController'
////                            }
////                        }
////                    })
////                    .state('app.drink', {
////                        url: '/drink',
////                        views: {
////                            'load-shedding-main': {
////                                templateUrl: '/loadshedding.drink.html',
////                                controller: 'SndDrinkPageController'
////                            }
////                        }
////                    })
//                .state('app.policy', {
//                    url: '/policy',
//                    views: {
//                        'load-shedding-main': {
//                            templateUrl: '/loadshedding.policy.html',
//                            controller: 'LoadSheddingMainController'
//                        }
//                    }
//                });
                })
                ;
        // if none of the above states are matched, use this as the fallback
        $urlRouterProvider.otherwise('/app/home');
    }
})();

