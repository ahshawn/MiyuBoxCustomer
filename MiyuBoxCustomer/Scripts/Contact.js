var ViewModel = function () {
    var self = this;
    self.products = ko.observableArray();
    self.error = ko.observable();

    self.newProduct = {
        Id: ko.observable(),
        Title: ko.observable(),
        Name: ko.observable(),
        contactNumber: ko.observable(),
        Email: ko.observable(),
        Text: ko.observable()
    };





    //************  Remember to change the URI accordingly  **********************//
    var productsURI = 'http://localhost:40078/api/contacts';


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


    self.addProduct = function () {
        var aProduct = {
            Id: self.newProduct.Id(),
            Title: self.newProduct.Title(),
            Name: self.newProduct.Name(),
            contactNumber: self.newProduct.contactNumber(),
            Email: self.newProduct.Email(),
            Text: self.newProduct.Text()

        };

        $.ajax({
            type: 'POST',
            url: productsURI,
            data: JSON.stringify(aProduct),
            dataType: 'json',
            contentType: 'application/json',
            success: function (data) {
                self.products.push(data);
                alert("Feedback Received!");
            },
            error: function (err) {
                alert("Error: " + err.status + " " + err.statusText);
            }
        });

    };
    // end of the function to save the new product record to database



    // Fetch the initial data
    getAllProducts();
};

ko.applyBindings(new ViewModel());

