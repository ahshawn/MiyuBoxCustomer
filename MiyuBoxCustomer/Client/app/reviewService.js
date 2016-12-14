(function (app) {
    var reviewService = function ($http, reviewAPI) {

        var getAll = function () {
            return $http.get(reviewAPI);
        };
        var getById = function (id) {
            return $http.get(reviewAPI + "pid/" + id);
        };
        var create = function(review) {
            return $http.post(reviewAPI, review);
        }
        return {
            getAll: getAll,
            getById: getById,
            postReview: create
        };
    };
    app.factory("reviewService", reviewService);
}(angular.module("ProductApp")))
