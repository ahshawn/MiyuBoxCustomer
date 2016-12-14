(function (app) {

    var ProductListController = function ($scope, productService, reviewService, paymentService, orderService) {
        var vendorCode = "1506588A";
        var transactionType = "SALES";
        $scope.tab = 1;
        $scope.filtText = "";
        $scope.cartQuantity = 1;
        $scope.cart = [];
        $scope.reviews = [];
        $scope.details = [];
        $scope.cardNumber = "4123456789012345";
        $scope.cardHolder = "TEST";
        $scope.cardExpiry = "1122";
        $scope.cardType = "Visa";
        $scope.cardCVC = "2222";
        $scope.status = "";
        $scope.transactionError = "";

        productService.getAll()
            .success(function (data) {
                $scope.products = data;
            });

        var getTotalProduct = function (cost, quantity) {
            var price = 0;
            price = cost * quantity;
            return price;
        }

        $scope.clearCart = function () {
            var checkTrue = confirm("Are you sure?");
            if(checkTrue === true) 
            {
                $scope.cart = [];
            }
        }
        $scope.addToCart = function (product, cartQuantity) {
            if (cartQuantity === 0 || cartQuantity == undefined || cartQuantity <= 0) {
                alert("Please check your input");
            } else if (!$scope.getUserName()) {
                alert("Please login in order to add item into cart");
            } else {
                var found = false;

                $scope.cart.forEach(function (item) {
                    if (item.Id === product.Id) {
                        item.Quantity += cartQuantity;
                        item.TotalCost += product.Cost * cartQuantity;
                        found = true;
                    }
                });
                if (!found) {
                    var productToAdd = {
                        Id: product.Id,
                        Name: product.Name,
                        Cost: product.Cost,
                        Quantity: cartQuantity,
                        TotalCost: getTotalProduct(product.Cost, cartQuantity)
                    };


                    $scope.cart.push(productToAdd);
                }
            };

        }

        $scope.getCartPrice = function () {
            var totalPrice = 0;
            $scope.cart.forEach(function (product) {
                totalPrice += product.Cost * product.Quantity;
            });

            return Number(totalPrice).toFixed(2);
        }


        $scope.select = function (setTab) {
            $scope.tab = setTab;
            if (setTab === 2) {
                $scope.filtText = "Fruits";
            } else if (setTab === 3) {
                $scope.filtText = "Vegetables";
            } else if (setTab === 4) {
                $scope.filtText = "Mushrooms";
            } else {
                $scope.filtText = "";
            }
        }
        $scope.isSelected = function (tab) {
            if ($scope.tab === tab) {
                return true;
            } else {
                return false;
            }
        }

        $scope.getProductDetails = function (item) {
            var itemId = item.Id;
            productService.getById(itemId)
                .success(function (data) {
                    $scope.productDetails = data;
                });

            reviewService.getById(itemId)
                .success(function (data) {
                    $scope.reviews = data;
                });
        };
        $scope.addReview = function (item, message) {
            var newReview = {
                Date: "1900-01-01T00:00:00",
                Id: 5,
                ProductId: item.Id,
                Description: message,
                Username: UniqueUserName
            }

            newReview = JSON.stringify(newReview);
            reviewService.postReview(newReview)
                .success(function (data) {
                    alert("Your comment: '" + data.Description + "' has been posted.");
                });

        };

        $scope.getUserName = function () {
            if (UniqueUserName == "" || UniqueUserName == undefined) {
                return false;
            } else {
                return true;
            }
        };

        $scope.checkOut = function () {
            $('#ajaxBusy').show();
            var request = {
                TransactionAmount: $scope.getCartPrice(),
                CardNumber: $scope.cardNumber,
                CardHolder: $scope.cardHolder,
                ExpiryDate: $scope.cardExpiry,
                CardType: $scope.cardType,
                CVC: $scope.cardCVC,
                VendorCode: vendorCode,
                TransactionType: transactionType
            };
            JSON.stringify(request);

            paymentService.sendTransaction(request)
            .success(function (data) {
                $scope.ApprovalCode = data.ApprovalCode;
                $scope.TransactionReference = data.TransactionReference;
                $scope.TransactionDate = data.TransactionDate;
                $scope.TransactionAmount = data.TransactionAmount;
                if (data.ApprovalCode !== "ERROR!") {
                    $scope.addOrder();
                }
            })
            .error(function (err) {
                console.log(err);
            });


        };

        $scope.addOrder = function () {
            var newOrder = {
                Id: 1,
                Status: false,
                Username: UniqueUserName,
                TransactionAmount: $scope.TransactionAmount,
                TransactionReference: $scope.TransactionReference,
                TransactionDate: $scope.TransactionDate,
                ApprovalCode: $scope.ApprovalCode
            };

            JSON.stringify(newOrder);

            orderService.addOrder(newOrder)
                .success(function (data) {
                    $scope.OrderId = data.Id;
                    $scope.addOrderDetails();
                })
                .error(function(error) {
                    console.log(error);
                });

        };

        $scope.addOrderDetails = function () {

            $scope.cart.forEach(function (item) {
                var newDetail = {
                    Id: 5,
                    OrderId: $scope.OrderId,
                    ProductId: item.Id,
                    Quantity: item.Quantity,
                    ProductName: item.Name,
                    UnitPrice: item.Cost,
                    Subtotal: item.TotalCost
                }
                orderService.addOrderDetails(newDetail)
                .success(function (data) {
                    $('#ajaxBusy').hide();
                })
                .error(function (error) {
                    console.log(error);
                });;
                $scope.status = "Successful Transaction!";
            });
            $scope.cardNumber = "";
            $scope.cardHolder = "";
            $scope.cardExpiry = "";
            $scope.cardType = "";
            $scope.cardCVC = "";
            $scope.cart = [];
        }

        $scope.checkStatus = function() {
            if ($scope.status === "" || $scope.status == undefined) {
                return false;
            } else {
                return true;
            }
        }

    };
    ProductListController.$inject = ["$scope", "productService", "reviewService", "paymentService", "orderService"];

    app.controller("ProductListController", ProductListController);


}(angular.module("ProductApp")));