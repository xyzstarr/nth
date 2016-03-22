(function () {
    "use strict";
    angular.module('loadshedding.app')
            .factory('toast', function ($rootScope, $timeout, $ionicPopup, $ionicLoading) {
                return {
                    show: function (message, duration, position) {
                        var myPopup;
                        message = message || "There was a problem...";
                        duration = duration || 'short';
                        position = position || 'top';


                        if (duration === 'short') {
                            duration = 2000;
                        } else {
                            duration = 5000;
                        }

                        myPopup = $ionicPopup.show({
                            template: "<div class='toast'>" + message + "</div>",
                            scope: $rootScope,
                            buttons: []
                        });

                        $timeout(function () {
                            myPopup.close();
                        }, duration);

                    },
                    pop: function (msg) {
                        var myToast = $ionicLoading.show({
                            template: msg,
                            noBackdrop: true,
                            duration: 2500
                        });
                    }
                };
            });
})();
