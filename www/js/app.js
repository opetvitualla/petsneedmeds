// Ionic Starter App
  
// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.services' is found in services.js
// 'starter.controllers' is found in controllers.js
angular.module('starter', ['ionic', 'starter.controllers', 'starter.services', 'ngMessages', 'ngSanitize', 'ngCordova'])

.run(function($ionicPlatform, $cordovaToast, $rootScope, $cordovaInAppBrowser) {
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if (window.cordova && window.cordova.plugins && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
      cordova.plugins.Keyboard.disableScroll(true);

    }
    if (window.StatusBar) {
      // org.apache.cordova.statusbar required
      StatusBar.styleDefault();
    }
  });

  $rootScope.showToast = function(msg, duration, position)
  {
    $cordovaToast
    .show(msg, duration, position)
    .then(function(success) {
      // success
    }, function (error) {
      // error
    });
  }
  
  $rootScope.openInapp = function(url)
  {
      var options = {location: 'yes', clearcache: 'yes', toolbar: 'yes'};      
      
      $cordovaInAppBrowser.open(url, '_blank', options)
       .then(function(event){

       })
       .catch(function(event){

       });      
  }

})

.config(function($stateProvider, $urlRouterProvider, $ionicConfigProvider) {
  $ionicConfigProvider.tabs.position('bottom');
  // Ionic uses AngularUI Router which uses the concept of states
  // Learn more here: https://github.com/angular-ui/ui-router
  // Set up the various states which the app can be in.
  // Each state's controller can be found in controllers.js
  $stateProvider

  //dashboard menu
  .state('menu', {
    url: '/menu',
    abstract: true,
    templateUrl: 'templates/menu.html',
    controller: 'menuCtrl'
  })

  // setup an abstract state for the tabs directive
    .state('tab', {
    url: '/tab',
    abstract: true,
    templateUrl: 'templates/tabs.html'
  })

  // Each tab has its own nav history stack:

  .state('tab.dash', {
    url: '/dash',
    views: {
      'tab-dash': {
        templateUrl: 'templates/tab-dash.html',
        controller: 'DashCtrl'
      }
    }
  })

  .state('tab.chats', {
      url: '/chats',
      views: {
        'tab-chats': {
          templateUrl: 'templates/tab-chats.html',
          controller: 'ChatsCtrl'
        }
      }
    })
    .state('tab.chat-detail', {
      url: '/chats/:chatId',
      views: {
        'tab-chats': {
          templateUrl: 'templates/chat-detail.html',
          controller: 'ChatDetailCtrl'
        }
      }
    })

  .state('tab.account', {
    url: '/account',
    views: {
      'tab-account': {
        templateUrl: 'templates/tab-account.html',
        controller: 'AccountCtrl'
      }
    }
  })

  .state('intro', {
    url: '/intro',
    templateUrl: 'templates/intro.html',
    controller: 'introCtrl'
  })

  .state('new-account', {
    url: '/new-account',
    templateUrl: 'templates/new-account.html',
    controller: 'newaccountCtrl'
  })

  .state('new-account-info', {
    url: '/new-account-information',
    templateUrl: 'templates/new-account-information.html',
    controller: 'newaccountinfoCtrl'
  })

  .state('login', {
    url: '/login',
    templateUrl: 'templates/login.html',
    controller: 'loginCtrl'
  })

  .state('forgot-password', {
    url: '/forgot-password',
    templateUrl: 'templates/forgot-password.html',
    controller: 'forgotpasswordCtrl'
  })

  .state('dash-home', {
    url: '/dash-home',
    templateUrl: 'templates/dash-home.html',
    controller: 'dashhomeCtrl'
  })

  .state('dash-shopping-cart', {
    url: '/dash-shopping-cart',    
    templateUrl: 'templates/dash-shopping-cart.html',
    controller: 'dashshopcartCtrl'
  })

  .state('dash-product-list', {
    url: '/dash-product-list',    
    templateUrl: 'templates/dash-product-list.html',
    controller: 'ProductlistCtrl'
  })

  .state('dash-product-page',{
    url: '/dash-product-page',
    templateUrl: 'templates/dash-product-page.html',
    controller: 'ProductfetchCtrl'
  })

  .state('dash-search-results',{
    url: '/dash-search-results',
    templateUrl: 'templates/dash-search-results.html',
    controller: 'SearchCtrl'
  })
 
  .state('dash-wishlist',{
    url: '/dash-wishlist',
    templateUrl: 'templates/dash-wishlist.html',
    controller: 'WishlistCtrl'
  })

  .state('dash-my-account',{
    url: '/dash-my-account',
    templateUrl: 'templates/dash-my-account.html',
    controller: 'MyAccountCtrl'
  })

  .state('dash-contact-us',{
    url: '/dash-contact-us',
    templateUrl: 'templates/dash-contact-us.html',
    controller: 'ContactUsCtrl'
  })

  .state('dash-cart-shipping',{
    url: '/dash-cart-shipping',
    templateUrl: 'templates/dash-cart-shipping.html',
    controller: 'CartShippingCtrl'
  })

  .state('dash-carrier-list',{
    url: '/dash-carrier-list',
    templateUrl: 'templates/dash-carrier-list.html',
    controller: 'CartCarrierCtrl'
  })

  .state('dash-payment',{
    url: '/dash-payment',
    templateUrl: 'templates/dash-payment.html',
    controller: 'PaymentCtrl'
  })

  .state('dash-payment-summary',{
    url: '/dash-payment-summary',
    templateUrl: 'templates/dash-payment-summary.html',
    controller: 'SummaryCtrl'
  })

  .state('dash-order-confirmation',{
    url: '/dash-order-confirmation',
    templateUrl: 'templates/dash-order-confirmation.html',
    controller: 'OrderConfirmCtrl'
  });
  
  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/intro');

});
