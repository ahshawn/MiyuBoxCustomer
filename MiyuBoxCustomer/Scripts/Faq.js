var ViewModel = function () {
    var self = this;
    self.Faqs = ko.observableArray();
    self.error = ko.observable();


    // search at client side
    self.searchString = ko.observable();
    self.searchFaqs = ko.computed(function () {
        if (!self.searchString()) {
            return self.Faqs();
        } else {
            return ko.utils.arrayFilter(self.Faqs(), function (Faq) {
                return ko.utils.stringStartsWith(Faq.Question.toUpperCase(), self.searchString().toUpperCase());
            });
        }
    });
    // end of search at client side

    self.searchQuestion = ko.observable('');
    self.searchQuestionAnswers = ko.computed(function () {
        if (self.searchString()) {
            return ko.utils.arrayFilter(self.Faqs(), function (Faq) {
                return ko.utils.stringStartsWith(Faq.Answer.toUpperCase(), self.searchString().toUpperCase());
            });
        } else {

            if (!self.searchQuestion()) {
                console.log("SearchFAQ");
                return self.Faqs();
            } else {
                return ko.utils.arrayFilter(self.Faqs(), function (Faq) {
                    return ko.utils.stringStartsWith(Faq.Question.toUpperCase(), self.searchQuestion().toUpperCase());
                });
            }
        }
    });



    //************  Remember to change the URI accordingly  **********************//
    var FaqsURI = 'http://localhost:2555/api/Faqs';

    //** this section contains all the AJAX call to the Web APIs **//
    // function to retrieve all products using AJAX call to web API
    function getAllFaqs() {
        $.ajax({
            type: 'GET',
            url: FaqsURI,
            dataType: 'json',
            contentType: 'application/json',
            success: function (data) {
                self.Faqs(data);
            },
            error: function (err) {
                alert("Error: " + err.status + " " + err.statusText);
            }
        });
    };
    // end of function to retrieve all products
    //** this is the end of the section contains all the AJAX call to the Web APIs **//

    // Fetch the initial data
    getAllFaqs();
};

ko.applyBindings(new ViewModel());

