(function () {
    var ProductApp = angular.module("ProductApp", ["ngRoute"]);


    var config = function ($routeProvider) {

        $routeProvider
            .when("/list",
                { templateUrl: "/Client/Views/list.html" })
            .otherwise(
                { redirectTo: "/list" });

    }

    ProductApp.config(config);
    ProductApp.constant("productAPI", "http://localhost:50692/api/Products/");
    ProductApp.constant("reviewAPI", "http://localhost:58853/api/reviews/");
    ProductApp.constant("paymentAPI", "http://epaymentservices.azurewebsites.net/api/payment/post");
    ProductApp.constant("orderAPI", "http://localhost:50246/api/");
}());