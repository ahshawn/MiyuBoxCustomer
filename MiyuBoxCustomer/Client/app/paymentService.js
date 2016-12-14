(function (app) {
    var paymentService = function ($http, paymentAPI) {

        var create = function (transaction) {
            return $http.post(paymentAPI, transaction);
        }
        return {
            sendTransaction : create
        };
    };
    app.factory("paymentService", paymentService);
}(angular.module("ProductApp")))
