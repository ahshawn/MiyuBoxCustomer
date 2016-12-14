
var ViewModel = function () {
    var self = this;
    self.products = ko.observableArray();
    self.error = ko.observable();
    self.details = ko.observable();
    self.cartItem = ko.observableArray();
    self.cart = ko.observableArray();




    //self.Home = ko.observable();
    //self.ContactUs = ko.observable();
    //self.FaQ = ko.observable();


    //self.links = ['Home', 'Protein', 'About Us', 'FaQ'];

    ////behaviours
    //self.goToProtein = function (products) { location.hash = products }



    self.TypeOptionValue = ko.observable("Beef");
    self.TypeOptionValue = ko.observable("Chicken");
    self.TypeOptionValue = ko.observable("Milk");
    self.updateImage = ko.observable();

    //listgridfunction
    $(document).ready(function () {
        $('#list').click(function (event) { event.preventDefault(); $('#products .item').addClass('list-group-item'); });
        $('#grid').click(function (event) { event.preventDefault(); $('#products .item').removeClass('list-group-item'); $('#products .item').addClass('grid-group-item'); });
    });

    //filtering
    self.typeToShow = ko.observable("all");
    self.formatOptionValue = ko.observable("Beef");
    self.displayAdvancedOptions = ko.observable(false);

    self.productsToShow = ko.computed(function () {

        var desiredType = self.typeToShow();

        if (desiredType == "all") return self.products();
        else {
            console.log(desiredType);
            return ko.utils.arrayFilter(self.products(), function (product) {
                return product.Type == desiredType;
            });
        }

    });

    this.showProductElement = function (elem) { if (elem.nodeType === 1) $(elem) }
    this.hideProductElement = function (elem) { if (elem.nodeType === 1) $(elem) }

    ko.bindingHandlers.fadeVisible = {
        init: function (element, valueAccessor) {
            // Initially set the element to be instantly visible/hidden depending on the value
            var value = valueAccessor();
            $(element).toggle(ko.unwrap(value)); // Use "unwrapObservable" so we can handle values that may or may not be observable
        },
        update: function (element, valueAccessor) {
            // Whenever the value subsequently changes, slowly fade the element in or out
            var value = valueAccessor();
            ko.unwrap(value) ? $(element).fadeIn() : $(element).fadeOut();
        }
    };


    //function formatCurrency(value) {
    //    return "$" + value.toFixed(2);
    //}

    //self.subtotal = ko.pureComputed(function () {
    //    return self.products() ? self.products().SellingPrice * parseInt("0" + self.quantity(), 10) : 0;

    //});


    //self.removeAll=function (){
    //    self.cartItem.removeAll();
    //}


    //self.finalPrice=ko.computed(function(){
    //    var temp=0;
    //    self.cartItem().forEach(function(v,i) {
    //        temp += v.SellingPrice;
    //    });
    //    return temp;
    //});

    //self.checkout = function(){
    //    mainView.router.load({pageName: 'index'});
    //}




    //self.addToCart= function(Item){
    //    self.details(Item);
    //    self.cartItem.push(Item);
    //    console.log("whw")
    //};


    ////search function
    //self.searchString = ko.observable();
    //self.searchProducts = ko.computed(function () {
    //    if (!self.searchString()) {
    //        return self.products();
    //    } else {
    //        return ko.utils.arrayFilter(self.products(), function (product) {
    //            return ko.utils.stringStartsWith(product.productName.toUpperCase(),
    //                self.searchString().toUpperCase());
    //        });

    //    }
    //}

    //);

    //self.searchType = ko.observable();
    //self.TypeProducts = ko.computed(function () {
    //    if(self,searchString()){
    //        return ko.utils.arrayFilter(self.products()), function(product){
    //            return ko.utils.stringStartsWith(product.productName.toUpperCase(),
    //                self.searchString().toUpperCase());
    //        });
    //    }else{
    //        if(!self.searchType()){
    //            return self.products();
    //        }else{
    //            return ko.utils.arrayFilter(self.products(), function(product){
    //                return ko.utils.stringStartsWith(product.Type.toUpperCase(),
    //                    self.searchType().toUpperCase());
    //            });
    //        }

    //    }
    //});

    //self.getProduct=function(){
    //    self.searchString();
    //    self.searchType('Beef');

    //}

    //self.getProduct=function(type){
    //    switch (type){
    //        case"beef": self.searchType('Beef');
    //            break;
    //        case"milk":self.searchType('Milk');
    //    }
    //}



    //************  Remember to change the URI accordingly  **********************//
    var productsURI = 'http://localhost:17757/api/proteins/';

    //** this section contains all the AJAX call to the Web APIs **//
    // function to retrieve all products using AJAX call to web API
    function getAllProducts() {
        $.ajax({
            type: 'GET',
            url: productsURI,
            dataType: 'json',
            contentType: 'application/json',
            success: function (data) {
                self.products(data);
            },
            error: function (err) {
                alert("Error: " + err.status + " " + err.statusText);
            }
        });
    };
    // end of function to retrieve all products
    //** this is the end of the section contains all the AJAX call to the Web APIs **//


    // get details of record with reference to the product id
    self.getProductDetails = function (item) {
        $.ajax({
            type: 'GET',
            url: productsURI + item.Id,
            dataType: 'json',
            contentType: 'application/json',
            success: function (data) {
                self.details(data);
            },
            error: function (err) {
                alert("Error: " + err.status + " " + err.statusText);
            }
        });
    }
    // end of function to get details of a product

    // Add item into cart
    self.addToCart = function (item) {
        self.cart.push(item);
    }

    self.removeCartItem = function () {
        self.cart.removeAll();
    }

    self.totalPrice = ko.computed(function () {
        var totalPrice = 0;
        self.cart().forEach(function (v, i) {
            totalPrice += v.SellingPrice;
        })
        return totalPrice.toFixed(2);
    })



    // Fetch the initial data
    getAllProducts();
};

ko.applyBindings(new ViewModel());

