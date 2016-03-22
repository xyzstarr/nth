(function () {
    angular.module('loadshedding.app')
        .factory('CandleFactory', ['$cordovaFlashlight', fnCandle]);

    function fnCandle($cordovaFlashlight) {
        var fnToggleCandle = function () {
            $cordovaFlashlight
                .available()
                .then(function (availability) {
                    $cordovaFlashlight
                        .toggle()
                        .then(fnFlashLightAvailable, fnFlashLightNotAvailable);
                });
        };

        var fnLightUpCandle = function () {
            $cordovaFlashlight
                .available()
                .then(function (availability) {
                    console.log(availability);
                    $cordovaFlashlight
                        .switchOn()
                        .then(fnFlashLightAvailable, fnFlashLightNotAvailable);
                });
        };

        var fnSwitchOffCandle = function () {
            $cordovaFlashlight
                .available()
                .then(function (availability) {
                    console.log(availability);
                    $cordovaFlashlight
                        .switchOff()
                        .then(fnFlashLightAvailable, fnFlashLightNotAvailable);
                });
        };

        var fnFlashLightAvailable = function (success) {
            'Flashlight available...' + success;
        };
        var fnFlashLightNotAvailable = function (error) {
            'Flashlight not available...' + error;
        };
        return {
            ToggleCandle: fnToggleCandle,
            LightUpCandle: fnLightUpCandle,
            SwitchOffCandle: fnSwitchOffCandle
        };
    }
})();
