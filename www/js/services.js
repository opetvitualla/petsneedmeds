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
        makePayment: makePayment
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
    function initPaymentUI(payPalSandboxId, payPalProductionId) {

        init_defer = $q.defer();
        $ionicPlatform.ready().then(function () {

            var clientIDs = {
                "PayPalEnvironmentProduction": payPalProductionId,
                "PayPalEnvironmentSandbox": payPalSandboxId
            };
            PayPalMobile.init(clientIDs, onPayPalMobileInit);
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
        var payment = new PayPalPayment("" + total, "USD", "" + name, "sale");
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
        var config = new PayPalConfiguration({merchantName: payPalShopName, merchantPrivacyPolicyURL: payPalMerchantPrivacyPolicyURL, merchantUserAgreementURL: payPalMerchantUserAgreementURL, acceptCreditCards: false});
        return config;
    }

    function onPayPalMobileInit() {
        $ionicPlatform.ready().then(function () {
            // must be called
            // use PayPalEnvironmentNoNetwork mode to get look and feel of the flow
            PayPalMobile.prepareToRender(payPalEnv, configuration(), function () {

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
            console.log("test")
            PayPalMobile.renderSinglePaymentUI(createPayment(total, name), function (result) {

                console.log(result);

                $timeout(function () {
                    defer.resolve(result);
                });
            }, function (error) {
                    
                    console.log(error)
                    
                $timeout(function () {
                    defer.reject(error);
                });
            });
        });

        return defer.promise;
    }

    return service;
}]);

//end services