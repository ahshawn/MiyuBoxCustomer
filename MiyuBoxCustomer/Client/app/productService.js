(function (app) {
    var productService = function ($http, productAPI) {

        var getAll = function() {
            return $http.get(productAPI);
        };
        var getById = function(id) {
            return $http.get(productAPI + id);
        };
        return {
            getAll: getAll,
            getById: getById
        };
    };
    app.factory("productService", productService);
}(angular.module("ProductApp")))
