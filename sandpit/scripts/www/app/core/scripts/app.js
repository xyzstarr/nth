(function(global){
    angular
            .module('loadshedding.app',
                    [
                        'ionic',
                        'ng-token-auth',
                        'ngStorage',
                        'ngCordova',
                        'ngCookies',
                        'uiGmapgoogle-maps'

                    ])
            .run(['$ionicPlatform','$rootScope','$state','$ionicHistory','$cordovaNetwork',fnInitializeApp])
            ;
    function fnInitializeApp($ionicPlatform,$rootScope,$state,$ionicHistory,$cordovaNetwork){
        //console.log(navigator);
        $ionicPlatform.ready(platformIsReady);
        $rootScope.$on('$stateChangeStart',fnStateChangeStart);
        function platformIsReady(){
            // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
            // for form inputs)
            if(window.cordova&&window.cordova.plugins.Keyboard){
                cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
            }
            if(window.StatusBar){
                StatusBar.styleDefault();
            }
            addToLogs({
                "window":window
            });
            addToLogs({
                "$cordovaNetwork":$cordovaNetwork
            });
            addToLogs({
                //"$cordovaNetwork.getNetwork()":$cordovaNetwork.getNetwork()

            });

            //Listen to connectivity events
            document.addEventListener("online",onOnline,false);
            document.addEventListener("resume",onResume,false);
            document.addEventListener("offline",onOffline,false);
            function onOnline(){
                //alert('just came online ionic ...');
                var execLog;
                loadMapsApi();
                execLog={
                    message:"just came online",
                    $cordovaNetwork:$cordovaNetwork.getNetwork()
                };
                addToLogs({
                    network:execLog
                });
            }
            function onResume(){
                var execLog={
                    message:"resuming from background",
                    $cordovaNetwork:$cordovaNetwork.getNetwork()
                };
                addToLogs({
                    network:execLog
                });
                loadMapsApi();
            }
            function onOffline(){
                var execLog={
                    message:"just went offline",
                    $cordovaNetwork:$cordovaNetwork.getNetwork()
                };
                addToLogs({
                    network:execLog
                });
            }
            function loadMapsApi(){
                // if online and maps not already loaded
                //    then load maps api
                var execLog;
                if(navigator.connection.type===Connection.NONE||(global.google!==undefined&&global.google.maps)){
                    execLog={
                        message:"can not load maps...apps is offline",
                        $cordovaNetwork:$cordovaNetwork.getNetwork()
                    };
                    addToLogs({
                        network:execLog
                    });
                    return;
                }
                //alert('can load maps');
            }
        }
        ;
        function fnStateChangeStart(event,toState,toParams,fromState,fromParams){
            if(toState.authenticate&&!$rootScope.is_user_authenticated){
                /*
                 * The $ionicViewService will clear the navigation
                 * stack and then redirect to the sign in view.
                 * The reason we clear the navigation stack is
                 * because we don’t want Android users to hit the
                 * back button and end up back in the protected view / controller.
                 * This is a non-issue for iOS users because there is no back button.
                 * When the navigation stack is cleared,
                 * the back button will simply exit the application.
                 * Note that PC web browser back buttons will still go back regardless
                 *      if the navigation stack is cleared.
                 * https://blog.nraboy.com/2014/07/handle-user-sign-ionicframework/
                 *
                 */
                $ionicHistory.nextViewOptions({
                    disableAnimate:true,
                    disableBack:true
                });
                $state.transitionTo("app.login");
                event.preventDefault();
            }
        }
        ;
    }
})(window);
