(function (app) {
    var orderService = function ($http, orderAPI) {

        var create = function (order) {
            return $http.post(orderAPI + "Orders", order);
        }
        var createOrderDetails = function (orderDetails) {
            return $http.post(orderAPI + "OrderDetails", orderDetails);
        }
        return {
            addOrder: create,
            addOrderDetails: createOrderDetails
        };
    };
    app.factory("orderService", orderService);
}(angular.module("ProductApp")))
