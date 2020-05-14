"use strict"

var app = angular.module('starter.services',[]);

app.factory('Auth', ['$http','$rootScope', 
			 function($http,  $rootScope)
{
	$rootScope.baseURL      = 'https://www.petsneedmeds.com/';    

    var fac  = {};
 
	fac.STORE_DATA = function(database,data)
	{
		localStorage.setItem(database,JSON.stringify(data));
	}

	fac.FETCH_DATA = function(name)
	{
		var checker = localStorage.getItem(name);
		return checker ? JSON.parse(checker) : false;
	}

	fac.REQUEST = function(obj)
	{ 
		var http = $http(
			                {
			                    method            : obj.method,
			                    url               : obj.url,
			                    data              : obj.data,
			                    params            : obj.params,
			                    transformRequest  : angular.identity,
			                    headers           : { 'Content-Type':undefined }
			                }
	                    );
		return http;
	}	

	return fac;
}]);

app.directive('numbersOnly', function () {
    return {
        require: 'ngModel',
        link: function (scope, element, attr, ngModelCtrl) {
            function fromUser(text) {
                if (text) {
                    var transformedInput = text.replace(/[^0-9]/g, '');

                    if (transformedInput !== text) {
                        ngModelCtrl.$setViewValue(transformedInput);
                        ngModelCtrl.$render();
                    }
                    return transformedInput;
                }
                return undefined;
            }            
            ngModelCtrl.$parsers.push(fromUser);
        }
    };
});

app.factory('PaypalService', ['$q', '$ionicPlatform', '$filter', '$timeout', 
					function ($q, $ionicPlatform, $filter, $timeout) 
{  
	// change payPalEnv: use this PayPalEnvironmentNoNetwork for test mode,
    // PayPalEnvironmentSandbox for SandBox,
    // for live use PayPalEnvironmentProduction
	var payPalEnv= 'PayPalEnvironmentProduction',
   		payPalShopName = 'Pets Need Meds',
   		payPalMerchantPrivacyPolicyURL = 'url to policy',
   		payPalMerchantUserAgreementURL = ' url to user agreement ';

    var init_defer;
    /**
     * Service object
     * @type object
     */
    var service = {
        initPaymentUI: initPaymentUI,
        createPayment: createPayment,
        configuration: configuration,
        onPayPalMobileInit: onPayPalMobileInit,
        makePayment: makePayment,
        onPrepareRender: onPrepareRender,
        onSuccesfulPayment: onSuccesfulPayment,
    };


    /**
     * @ngdoc method
     * @name initPaymentUI
     * @methodOf app.PaypalService
     * @description
     * Inits the payapl ui with certain envs. 
     *
     * 
     * @returns {object} Promise paypal ui init done
     */
    function initPaymentUI() {

        init_defer = $q.defer();
        $ionicPlatform.ready().then(function () {
            var payPalSandboxId = 'AaTQTNLO9FpM2PnulJjdBLNP9l3o4NUW72AD-9ilRDBCYmRqLzC7dnex1FoHZkeE9EVUBYsZcmBs7u3c';
            var payPalProductionId = 'AZ5fEHG8aLNtSY03IYDUxWeqhP4VAxelmf1VXjkfo1tIOIr7vodVUo_E_BbXdefcIYifbw7JxESXcZza';

            var clientIDs = {
                "PayPalEnvironmentProduction": payPalProductionId,
                "PayPalEnvironmentSandbox": payPalSandboxId
            };
            PayPalMobile.init(clientIDs, onPayPalMobileInit);
            // PayPalMobile.init(clientIDs, app.onPayPalMobileInit);
        });

        return init_defer.promise;

    }


    /**
     * @ngdoc method
     * @name createPayment
     * @methodOf app.PaypalService
     * @param {string|number} total total sum. Pattern 12.23
     * @param {string} name name of the item in paypal
     * @description
     * Creates a paypal payment object 
     *
     * 
     * @returns {object} PayPalPaymentObject
     */
    function createPayment(total, name) {
            
        // "Sale  == >  immediate payment
        // "Auth" for payment authorization only, to be captured separately at a later time.
        // "Order" for taking an order, with authorization and capture to be done separately at a later time.
        // var payment = new PayPalPayment("" + total, "USD", "" + name, "sale");
        // return payment;

        var paymentDetails = new PayPalPaymentDetails(total + "", "0.00", "0.00");
        var payment = new PayPalPayment(total+"", "USD", name+"", "Sale", paymentDetails);
        return payment;
    }
    /**
     * @ngdoc method
     * @name configuration
     * @methodOf app.PaypalService
     * @description
     * Helper to create a paypal configuration object
     *
     * 
     * @returns {object} PayPal configuration
     */
    function configuration() {
        // for more options see `paypal-mobile-js-helper.js`
        // var config = new PayPalConfiguration({ merchantName: payPalShopName, merchantPrivacyPolicyURL: payPalMerchantPrivacyPolicyURL, merchantUserAgreementURL: payPalMerchantUserAgreementURL, acceptCreditCards: false });
        
        var config = new PayPalConfiguration({ merchantName: "Pets Need Meds", merchantPrivacyPolicyURL: "https://mytestshop.com/policy", merchantUserAgreementURL: "https://mytestshop.com/agreement" });

        return config;
    }
            
                        
    function onPayPalMobileInit() {
        $ionicPlatform.ready().then(function () {
            // must be called
            // use PayPalEnvironmentNoNetwork mode to get look and feel of the flow
            // let envv = "PayPalEnvironmentSandbox";
            let envv = "PayPalEnvironmentProduction";
            PayPalMobile.prepareToRender(envv, configuration(), function () {

                $timeout(function () {
                    init_defer.resolve();
                });

            });
        });
    }

    /**
     * @ngdoc method
     * @name makePayment
     * @methodOf app.PaypalService
     * @param {string|number} total total sum. Pattern 12.23
     * @param {string} name name of the item in paypal
     * @description
     * Performs a paypal single payment 
     *
     * 
     * @returns {object} Promise gets resolved on successful payment, rejected on error 
     */
    function makePayment(total, name) {
      
        var defer = $q.defer();
        total = total.toFixed(2);
        $ionicPlatform.ready().then(function () {
            PayPalMobile.renderSinglePaymentUI(createPayment(total, "Total Payment"), function (result) {
                console.log(result);
                $timeout(function () {
                    defer.resolve(result);
                });
                }, function (error) {

                console.log(error)

                $timeout(function () {
                    defer.reject(error);
                });
            },
            onUserCanceled);
        });

        return defer.promise;
    }
                        
    function onSuccesfulPayment  (payment) {
        return JSON.stringify(payment, null, 4);
    }
                        
    function onUserCanceled (result) {
        console.log(result);
    }

    function onPrepareRender() {
        $timeout(function () {
            init_defer.resolve();
        });
    }
    
    return service;
}]);

//end services