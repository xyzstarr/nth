(function () {
    angular
            .module('loadshedding.maps')
            .factory('MapsService', ['LoadSheddingWebService', '$http', mapsService]);
    function mapsService(LoadSheddingWebService, $http) {
        results = {
            data: [],
            getProvinces: function (url) {
                return LoadSheddingWebService(url);
            },
            getProvince: function (id) {
                return $http.get('http://127.0.0.1:8080/loadshedding/resources/areas.list-provinces.php')
                        .success(function (data) {
                            results.data.currentProvince = data;
                        })
                        .error(function error(data) {
                            results.data.currentProvince = data;
                        });
            },
            saveProvince: function (person) {
                return $http.post('http://127.0.0.1:8080/loadshedding/resources/areas.list-provinces.php')
                        .success(function () {
                            results.getProvinces();
                        })
                        .error(function () {
                        });
            },
            deleteProvince: function (id) {
                return $http.delete('http://127.0.0.1:8080/loadshedding/resources/areas.list-provinces.php')
                        .success(function () {
                            results.getProvinces();
                        })
                        .error(function () {
                        });
            }
        };
        return results;
    }
})();