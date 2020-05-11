angular.module('starter.controllers', [])

.controller('DashCtrl', function($scope) {

})

.controller('ChatsCtrl', function($scope, Chats) {
  // With the new view caching in Ionic, Controllers are only called
  // when they are recreated or on app start, instead of every page change.
  // To listen for when this page is active (for example, to refresh data),
  // listen for the $ionicView.enter event:
  //
  //$scope.$on('$ionicView.enter', function(e) {
  //});

  $scope.chats = Chats.all();
  $scope.remove = function(chat) {
    Chats.remove(chat);
  };
})

.controller('menuCtrl', function($scope, $rootScope, Auth, $ionicLoading) {

})

.controller('ChatDetailCtrl', function($scope, $stateParams, Chats) {
  $scope.chat = Chats.get($stateParams.chatId);
})

.controller('AccountCtrl', function($scope) {
  $scope.settings = {
    enableFriends: true
  };
})

.controller('introCtrl', function($scope, $rootScope) {

})

.controller('newaccountCtrl', function($scope, $rootScope) {
  $scope.navTitle='';
  $scope.data = [];
  $scope.error_ = false;

  $scope.emailCreate = function(data){
    if(data.$valid)
    {
      $rootScope.email = $scope.data.email;
      window.location.href="#/new-account-information";
    }
    else
    {
      $scope.error_ = true;
    }

  }
})

.controller('newaccountinfoCtrl', function($scope, $rootScope, Auth, $ionicLoading) {
  $scope.navTitle='';
  $scope.error_ = false;
  $scope.is_registered = false;

  $scope.data = [];
  $scope.data.email = $rootScope.email;
  $rootScope.userEmail = $rootScope.email;

  $scope.registerAcct = function(data){
    if(data.$valid){
      $ionicLoading.show({
        template: '<ion-spinner class="spinner-calm" icon="android"></ion-spinner>'
      });
      var obj    = new Object();
      obj.method = 'POST';
      obj.url    = $rootScope.baseURL+"mobilebackend/Mobilecontroller/registerCustomers";
      obj.data   = new FormData();
        obj.data.append('gender', $scope.data.gender);
        obj.data.append('fname', $scope.data.fname);
        obj.data.append('lname', $scope.data.lname);
        obj.data.append('company', $scope.data.company);
        obj.data.append('address', $scope.data.address);
        obj.data.append('city', $scope.data.city);
        obj.data.append('state', $scope.data.state);
        obj.data.append('zipcode', $scope.data.zip);
        obj.data.append('phone', $scope.data.phone);
        obj.data.append('email', $scope.data.email);
        obj.data.append('pword', $scope.data.pword);
        obj.data.append('token', '1as54d68asd312sd685asd64as6d1asd8asdasd546as8das1');
      obj.params = {};
      Auth.REQUEST(obj).then(function(success) {
        //console.log(success.data);
        if(success.data == 1 || success.data == '1'){
          $ionicLoading.hide();
          $scope.is_registered = false;
          window.location.href="#/login";
        }else if(success.data == 3 || success.data == '3'){
          $ionicLoading.hide();
          $rootScope.showToast('Email already registered.','long','bottom');
        }else{
          $ionicLoading.hide();
          $rootScope.showToast('General Error. Contact Admin.','long','bottom');
        }

      },function(error) {
         console.log(error);
        }
      );
    }else{
      $scope.error_ = true;
      //alert($scope.data.email);
    }
  }
  //alert($rootScope.email);

})

.controller('loginCtrl', function($scope, $rootScope, Auth, $ionicLoading) {
  //- manual clear of localstorage
  var userdata = Auth.FETCH_DATA("userdata");
  if(userdata != ""){
    window.location.href="#/dash-home";
  }

  $scope.error_ = false;
  $scope.data = [];
  $scope.data.username = $rootScope.userEmail;
  //for testing only
  //$scope.data.username = 'jessahouano@gmail.com';
  //$scope.data.password = 'sang90210123';
  //Auth.STORE_DATE("userid", "12758");
  //end for testing only

  $scope.loginAcct = function(data){
    if(data.$valid){

      $ionicLoading.show({
        template: '<ion-spinner class="spinner-calm" icon="android"></ion-spinner>'
      });

      var obj    = new Object();
      obj.method = 'POST';
      obj.url    = $rootScope.baseURL+"mobilebackend/Mobilecontroller/loginCustomer";
      obj.data   = new FormData();
        obj.data.append('username', $scope.data.username);
        obj.data.append('password', $scope.data.password);
        obj.data.append('token', '1as54d68asd312sd685asd64as6d1asd8asdasd546as8das1');
      obj.params = {};
      Auth.REQUEST(obj).then(function(success) {
        //console.log(success.data);
        if(success.data != 0 || success.data != '0'){
          $ionicLoading.hide();
          //console.log(success.data);
          //3dfe12a8-8da1-4b33-b70c-a6f14fcffbae
          Auth.STORE_DATA("userdata", success.data[0]);
          window.location.href="#/dash-home";
          //alert('logged in');
        }else{
          $ionicLoading.hide();
          $rootScope.showToast('User not found.','long','bottom');
        }
      },function(error) {
         console.log(error);
        }
      );
      //for testing only
      //window.location.href="#/menu/dash-home";
      //return;
      //end for testing only
    }else{
      $scope.error_ = true;
    }
  }

})

.controller('forgotpasswordCtrl', function($scope, $rootScope, Auth, $ionicLoading) {
  $scope.error_ = false;
  $scope.data = [];

  $scope.forgotPass = function(data){
    if(data.$valid){
      $ionicLoading.show({
        template: '<ion-spinner class="spinner-calm" icon="android"></ion-spinner>'
      });

      var obj    = new Object();
      obj.method = 'POST';
      obj.url    = $rootScope.baseURL+"mobilebackend/Mobilecontroller/forgotPassword";
      obj.data   = new FormData();
        obj.data.append('forgotEmail', $scope.data.forgotEmail);
        obj.data.append('token', '1as54d68asd312sd685asd64as6d1asd8asdasd546as8das1');
      obj.params = {};
      Auth.REQUEST(obj).then(function(success) {
        //console.log(success.data);
        if(success.data == 1 || success.data == '1'){
          $ionicLoading.hide();
          $rootScope.showToast('Check email for confirmation.','long','bottom');
        }else{
          $ionicLoading.hide();
          $rootScope.showToast('Email not found.','long','bottom');
        }
      },function(error) {
         console.log(error);
        });
    }else{
      $scope.error_ = true;
    }
  }
})

.controller('dashhomeCtrl', function($scope, $rootScope, Auth, $ionicLoading) {
  $scope.error_ = false;
  $scope.data = [];
  $scope.headerimg = "<img alt='' src='img/header-logo.png' />";
  $scope.data.worms = 5;
  $scope.data.fleas = 6;

  $scope.search = function(data){
      if(data.$valid){
        $ionicLoading.show({
          template: '<ion-spinner class="spinner-calm" icon="android"></ion-spinner>'
        });

        //alert($scope.data.keyword);
        var obj = new Object();
        obj.method  = 'POST';
        obj.url     = $rootScope.baseURL+"mobilebackend/Mobilecontroller/searchProduct";
        obj.data    = new FormData();
          obj.data.append('searchkey', $scope.data.keyword);
          obj.data.append('token', '1as54d68asd312sd685asd64as6d1asd8asdasd546as8das1');
        obj.params = {};
         Auth.REQUEST(obj).then(function(success) {
            //console.log(success.data);
            $rootScope.searchResult = success.data;
            $ionicLoading.hide({
              template: '<ion-spinner class="spinner-calm" icon="android"></ion-spinner>'
            });
            window.location.href = "#/dash-search-results";
         }, function(error){
              $ionicLoading.hide({
                template: '<ion-spinner class="spinner-calm" icon="android"></ion-spinner>'
              });
              window.location.href = "#/dash-search-results";
         });
      }else{

      }
  }

  $scope.fetchWorms = function(data){
      if(data.$valid){
        $ionicLoading.show({
          template: '<ion-spinner class="spinner-calm" icon="android"></ion-spinner>'
        });
        $rootScope.cat = $scope.data.worms;

        //alert($scope.data.worms);
        var obj    = new Object();
        obj.method = 'POST';
        obj.url    = $rootScope.baseURL+"mobilebackend/Mobilecontroller/fetchCategory";
        //obj.url    = $rootScope.baseURL+"category.php";
        obj.data   = new FormData();
          obj.data.append('id_category', $scope.data.worms);
          obj.data.append('token', '1as54d68asd312sd685asd64as6d1asd8asdasd546as8das1');
        obj.params = {};
        Auth.REQUEST(obj).then(function(success) {
            $rootScope.products = success.data;
            window.location.href= "#/dash-product-list";
            $ionicLoading.hide({
              template: '<ion-spinner class="spinner-calm" icon="android"></ion-spinner>'
            });
        },function(error) {
            console.log(error);
            $ionicLoading.hide({
              template: '<ion-spinner class="spinner-calm" icon="android"></ion-spinner>'
            });
        });
      }
  }

  $scope.fetchFleas = function(data){
    if(data.$valid){
        $ionicLoading.show({
          template: '<ion-spinner class="spinner-calm" icon="android"></ion-spinner>'
        });

        $rootScope.cat = $scope.data.fleas;

        //alert($scope.data.fleas);
        var obj    = new Object();
        obj.method = 'POST';
        obj.url    = $rootScope.baseURL+"mobilebackend/Mobilecontroller/fetchCategory";
        obj.data   = new FormData();
          obj.data.append('id_category', $scope.data.fleas);
          obj.data.append('token', '1as54d68asd312sd685asd64as6d1asd8asdasd546as8das1');
        obj.params = {};
        Auth.REQUEST(obj).then(function(success) {
            $rootScope.products = success.data;
            window.location.href= "#/dash-product-list";
            $ionicLoading.hide({
              template: '<ion-spinner class="spinner-calm" icon="android"></ion-spinner>'
            });
        },function(error) {
         console.log(error);
            $ionicLoading.hide({
              template: '<ion-spinner class="spinner-calm" icon="android"></ion-spinner>'
            });
        });
    }
  }

})

.controller('ProductlistCtrl', function($scope, $rootScope, Auth, $ionicLoading) {
  $scope.title = $rootScope.cat == 5 ? 'Worms' : 'Fleas';
  $rootScope.title = $scope.title;

  $ionicLoading.show({
    template: '<ion-spinner class="spinner-calm" icon="android"></ion-spinner>'
  });
  $scope.products = $rootScope.products;
  //alert($rootScope.products);
  $ionicLoading.hide({
    template: '<ion-spinner class="spinner-calm" icon="android"></ion-spinner>'
  });

    $scope.getProducts = function(productid){
      $ionicLoading.show({
        template: '<ion-spinner class="spinner-calm" icon="android"></ion-spinner>'
      });
      //alert(productid);
      var obj    = new Object();
      obj.method = 'POST';
      obj.url    = $rootScope.baseURL+"mobilebackend/Mobilecontroller/fetchProduct";
      obj.data   = new FormData();
        obj.data.append('prodid', productid);
        obj.data.append('token', '1as54d68asd312sd685asd64as6d1asd8asdasd546as8das1');
      obj.params = {};
      Auth.REQUEST(obj).then(function(success) {
          $rootScope.productDetails = success.data;
          window.location.href= "#/dash-product-page";
          $ionicLoading.hide({
            template: '<ion-spinner class="spinner-calm" icon="android"></ion-spinner>'
          });
      },function(error) {
       console.log(error);
          $ionicLoading.hide({
            template: '<ion-spinner class="spinner-calm" icon="android"></ion-spinner>'
          });
      });
    }
})

.controller('ProductfetchCtrl', function($scope, $rootScope, Auth, $ionicLoading) {
  $scope.productDetails = $rootScope.productDetails;
  $scope.title = $rootScope.title;
  $scope.data = [];
  $scope.data.quantity = 1;

  $scope.olonly = $scope.productDetails[0].online_only == 1 ? 'Online only' : '';
  $scope.productData = $scope.productDetails[0];

  //product cart details
  $scope.productId    = $scope.productDetails[0].id_product;
  $scope.productName  = $scope.productDetails[0].name;
  $scope.productPrice = $scope.productDetails[0].price;
  $scope.productPer   = $scope.productDetails[0].value;
  $scope.productImg   = $scope.productDetails[0].id_image;

  //pass product id and qty to dashshopcartCtrl
  $scope.addtocart = function(data, prodid){
    var arr = [];
    if(Auth.FETCH_DATA("cart") == false){
      arr = [{'prodId' : $scope.productId, 'prodName' : $scope.productName, 'prodPrice' : $scope.productPrice, 'prodPer' : $scope.productPer, 'prodImg' : $scope.productImg, 'qty' : $scope.data.quantity}];
      cart = arr;
    }else{
      var cart = JSON.parse(Auth.FETCH_DATA("cart"));
      arr = {'prodId' : $scope.productId, 'prodName' : $scope.productName, 'prodPrice' : $scope.productPrice, 'prodPer' : $scope.productPer, 'prodImg' : $scope.productImg, 'qty' : $scope.data.quantity};

      var count = 0;
      for (var i = 0; i < cart.length; i++) {
        if(cart[i].prodId == $scope.productId){
          cart[i].qty = parseInt(cart[i].qty) + parseInt($scope.data.quantity);
          count++;
        }
      }

      if(count < 1){
        cart.push(arr);
      }
    }

    Auth.STORE_DATA("cart", JSON.stringify(cart));
    //console.log(Auth.FETCH_DATA("cart"));
    window.location.href = "#/dash-shopping-cart";
  }
})

.controller('SearchCtrl', function($scope, $rootScope, Auth, $ionicLoading) {
  $scope.title = 'Search Result';
  $scope.empty = false;
  if($rootScope.searchResult == 'false'){
    $scope.empty = true;
  }else{
    $scope.searchData = $scope.searchResult;
  }

  //get product by id
  $scope.getProducts = function(productid){
    $ionicLoading.show({
      template: '<ion-spinner class="spinner-calm" icon="android"></ion-spinner>'
    });
    //alert(productid);
    var obj    = new Object();
    obj.method = 'POST';
    obj.url    = $rootScope.baseURL+"mobilebackend/Mobilecontroller/fetchProduct";
    obj.data   = new FormData();
      obj.data.append('prodid', productid);
      obj.data.append('token', '1as54d68asd312sd685asd64as6d1asd8asdasd546as8das1');
    obj.params = {};
    Auth.REQUEST(obj).then(function(success) {
        $rootScope.productDetails = success.data;
        window.location.href= "#/dash-product-page";
        $ionicLoading.hide({
          template: '<ion-spinner class="spinner-calm" icon="android"></ion-spinner>'
        });
    },function(error) {
     console.log(error);
        $ionicLoading.hide({
          template: '<ion-spinner class="spinner-calm" icon="android"></ion-spinner>'
        });
    });
  }
})

.controller('dashshopcartCtrl', function($scope, $rootScope, Auth, $ionicLoading) {
  $scope.title = 'Shopping Cart';
  $scope.data = [];

  $scope.total1         = 0;
  $scope.totalshippping = 0;
  $scope.totaltax       = 0;

  $scope.buildcartdata = function(){
    var cart = JSON.parse(Auth.FETCH_DATA("cart"));
    var userdata = Auth.FETCH_DATA("userdata");
    var cartdata = [];
    var arr      = [];
    var item     = [];

    for (var i = 0; i < cart.length; i++){
      arr = {'prodId' : cart[i].prodId, 'qty' : cart[i].qty};
      item.push(arr);
    }

    cartdata.push({items:item,id_customer:userdata.id_customer,product_total:$scope.total1});
    Auth.STORE_DATA("cartdata", JSON.stringify(cartdata));
  }

  if(Auth.FETCH_DATA("cart") === false || Auth.FETCH_DATA("cart") === "" || Auth.FETCH_DATA("cart").length <= 0){
    $scope.hideCart = true;
    $scope.hideCartNotification = '<span class="empty-cart">Your cart is empty. Press home to browse products.</span>';
    return;
  }else{
    $scope.hideCart = false;
    $scope.buildcartdata();
  }

  //console.log(Auth.FETCH_DATA("cart"));
  $scope.cartproduct = JSON.parse(Auth.FETCH_DATA("cart"));

  $scope.initialize = function(){
    $.each($scope.cartproduct, function(index, value){
      $scope.total1 += value.qty * parseFloat(value.prodPrice);
    });
    $scope.buildcartdata();
  }
  $scope.initialize();

  $scope.addQty = function(prodid){
    for(var i = 0; i < $scope.cartproduct.length; i++) {
      if($scope.cartproduct[i].prodId == prodid){
        $scope.cartproduct[i].qty = parseInt($scope.cartproduct[i].qty) + 1;
      }
    }

    //update localstorage
    Auth.STORE_DATA("cart", JSON.stringify($scope.cartproduct));
    $scope.buildcartdata();
  }

  $scope.addTotal = function(price, qty){
    $scope.total1 = 0;
    for (var i = 0; i < $scope.cartproduct.length; i++) {
      $scope.total1 += parseFloat($('#prodTotal'+i).val());
    }
    $scope.total1 = parseFloat($scope.total1) + parseFloat(price);
    $scope.buildcartdata();
  }

  $scope.deductQty = function(prodid){
    $scope.total1 = 0;
    for(var i = 0; i < $scope.cartproduct.length; i++) {
      if($scope.cartproduct[i].prodId == prodid){
        if($scope.cartproduct[i].qty <= 1){
          $scope.initialize();
          return;
        }else{
          $scope.cartproduct[i].qty = parseInt($scope.cartproduct[i].qty) - 1;
          $scope.deductTotal($scope.cartproduct[i].prodPrice, $scope.cartproduct[i].qty);
          //deductTotal(product.prodPrice,product.qty)
        }
      }
    }
    //update localstorage
    Auth.STORE_DATA("cart", JSON.stringify($scope.cartproduct));
    $scope.buildcartdata();
  }

  $scope.deductTotal = function(price, qty){
    $scope.total1 = 0;
    for (var i = 0; i < $scope.cartproduct.length; i++) {
      $scope.total1 += parseFloat($('#prodTotal'+i).val());
    }
    var subtot = parseFloat($scope.total1) - parseFloat(price);
    if(subtot > 0)
    {
      $scope.total1 = parseFloat($scope.total1) - parseFloat(price);
    }
  }

  $scope.removeProduct = function(item){
    //alert($scope.cartproduct.length);
    var index = $scope.cartproduct.indexOf(item);
    $scope.cartproduct.splice(index,1);
    Auth.STORE_DATA("cart", JSON.stringify($scope.cartproduct));
    $scope.buildcartdata();

    if($scope.cartproduct.length <= 0){
      $scope.hideCart = true;
      $scope.hideCartNotification = '<span class="empty-cart">Your cart is empty. Press home to browse products.</span>';
    }else{
      $scope.hideCart = false;
      $scope.hideCartNotification = '';
    }
    $scope.total1 = 0;
    $scope.initialize();
  }

  $scope.toshipping = function(totalcart){
    var userdata = Auth.FETCH_DATA("userdata");
    var obj    = new Object();
    obj.method = 'POST';
    //obj.url    = $rootScope.baseURL+"mobileappservices.php?func=fetchCarrier";
    obj.url    = $rootScope.baseURL+"addresses.php";
    obj.data   = new FormData();
      obj.data.append('userid', userdata.id_customer);
      obj.data.append('token', '1as54d68asd312sd685asd64as6d1asd8asdasd546as8das1');
    obj.params = {};
    Auth.REQUEST(obj).then(function(success) {
        $scope.addresses = success.data;
        $scope.addressid = [];
        $scope.addressalias = [];

        for(var i = 0; i < $scope.addresses.length; i++) {
          $scope.addressid[i] = $scope.addresses[i].object.id;
          $scope.addressalias[i] = $scope.addresses[i].object.alias;
        }

        Auth.STORE_DATA("addressid", $scope.addressid);
        Auth.STORE_DATA("addressalias", $scope.addressalias);
        $rootScope.totalcartprice = totalcart;
        window.location.href = "#/dash-cart-shipping";

        $ionicLoading.hide({
          template: '<ion-spinner class="spinner-calm" icon="android"></ion-spinner>'
        });
    },function(error) {
     console.log(error);
        $ionicLoading.hide({
          template: '<ion-spinner class="spinner-calm" icon="android"></ion-spinner>'
        });
    });
  }
})

.controller('WishlistCtrl', function($scope, $rootScope, Auth, $ionicLoading) {
  $scope.title = 'My Wishlist';
  $scope.EmptyWishlist = '';

  var userdata = Auth.FETCH_DATA("userdata");

  $ionicLoading.show({
    template: '<ion-spinner class="spinner-calm" icon="android"></ion-spinner>'
  });

  //alert(productid);
  var obj    = new Object();
  obj.method = 'POST';
  obj.url    = $rootScope.baseURL+"mobilebackend/Mobilecontroller/fetchWishlist";
  obj.data   = new FormData();
    obj.data.append('userid', userdata.id_customer);
    obj.data.append('token', '1as54d68asd312sd685asd64as6d1asd8asdasd546as8das1');
  obj.params = {};
  Auth.REQUEST(obj).then(function(success) {
      //console.log(success.data);
      if(success.data == 0){
        $scope.EmptyWishlist = '<span class="empty-cart empty-wishlist">Your wishlist is empty. Login to website and populate your wishlist.</span>';
         $ionicLoading.hide();
      }else{
        $scope.wishlistDetails = success.data;
        $ionicLoading.hide();
      }
  },function(error) {
      console.log(error);
      $ionicLoading.hide();
  });

  //get product by id
  $scope.xgetProducts = function(productid){
    $ionicLoading.show({
      template: '<ion-spinner class="spinner-calm" icon="android"></ion-spinner>'
    });
    //alert(productid);
    var obj    = new Object();
    obj.method = 'POST';
    obj.url    = $rootScope.baseURL+"mobilebackend/Mobilecontroller/fetchProduct";
    obj.data   = new FormData();
      obj.data.append('prodid', productid);
      obj.data.append('token', '1as54d68asd312sd685asd64as6d1asd8asdasd546as8das1');
    obj.params = {};
    Auth.REQUEST(obj).then(function(success) {
        $rootScope.productDetails = success.data;
        window.location.href= "#/dash-product-page";
        $ionicLoading.hide({
          template: '<ion-spinner class="spinner-calm" icon="android"></ion-spinner>'
        });
    },function(error) {
     console.log(error);
        $ionicLoading.hide({
          template: '<ion-spinner class="spinner-calm" icon="android"></ion-spinner>'
        });
    });
  }
})

.controller('MyAccountCtrl', function($scope, $rootScope, Auth, $ionicLoading) {
  $scope.title = 'My Account';

  $scope.signout = function(){
    Auth.STORE_DATA("prodid", "");
    Auth.STORE_DATA("cart", "");
    Auth.STORE_DATA("userdata", "");
    Auth.STORE_DATA("addressid", "");
    Auth.STORE_DATA("addressalias", "");
    Auth.STORE_DATA("cartdata", "");
    window.location.href="#/intro";
  }

  $scope.rateapp = function(){
    $rootScope.openInapp("https://play.google.com/store/apps/details?id=com.ionicframework.petsneedsmeds547748");
  }

  $scope.appfeedback = function(){
    $rootScope.openInapp("https://play.google.com/store/apps/details?id=com.ionicframework.petsneedsmeds547748");
  }
})

.controller('ContactUsCtrl', function($scope, $rootScope, Auth, $ionicLoading) {
  $scope.title = 'Contact Us';
  $scope.data = [];
  $scope.error_ = false;
  $scope.successmsg = '';
  $scope.errormsg = '';

  $scope.contactUs = function(data){
    if(data.$valid){
      $ionicLoading.show({
        template: '<ion-spinner class="spinner-calm" icon="android"></ion-spinner>'
      });

      var obj    = new Object();
      obj.method = 'POST';
      obj.url    = $rootScope.baseURL+"mobilebackend/Mobilecontroller/contactus";
      obj.data   = new FormData();
        obj.data.append('Full_name', $scope.data.fname);
        obj.data.append('Address',   $scope.data.password);
        obj.data.append('Email',     $scope.data.email);
        obj.data.append('Phone',     $scope.data.phone);
        obj.data.append('Comment',   $scope.data.comments);
        obj.data.append('token', '1as54d68asd312sd685asd64as6d1asd8asdasd546as8das1');
      obj.params = {};
      Auth.REQUEST(obj).then(function(success) {
          $ionicLoading.hide();
          if(success.data == 1 || success.data == '1'){
            $scope.successmsg = '<div class="success-msg">Your message has been submitted.  We will get in touch with you as soon as possible.<br/>Thank you for your time.</div>';
          }else{
            $scope.errormsg = '<div class="error">Failed to send email. Please try again.</div>';
          }
      },function(error) {
          $ionicLoading.hide();
         console.log(error);
        }
      );
    }else{
      $scope.error_ = true;
    }
  }
})

.controller('CartShippingCtrl', function($scope, $rootScope, Auth, $ionicLoading) {
  $scope.title      = 'Shipping Address';
  $scope.data       = [];
  $scope.successmsg = '';
  $scope.errormsg   = '';
  $scope.fetched    = false;
  $scope.error_     = false;

  var cart = JSON.parse(Auth.FETCH_DATA("cartdata"));

  $scope.total1   = cart[0]['product_total'];
  $scope.totaltax = 0;
  $scope.totalshippping = 0;

  $scope.addressid = Auth.FETCH_DATA("addressid");
  $scope.addressalias = Auth.FETCH_DATA("addressalias");

  $scope.updatecartdata = function(selectedid){
    //Auth.STORE_DATA("cartdata", JSON.stringify(cartdata));
    //console.log(JSON.parse(Auth.FETCH_DATA("cartdata"));
    var arr  = [];
    var item = [];

    cart[0]['id_address'] = selectedid;
    Auth.STORE_DATA("cartdata", JSON.stringify(cart));
    //console.log(Auth.FETCH_DATA("cartdata"));
  }

  $scope.changeAddress = function(idaddress){
    //compile data for database saving
    $scope.updatecartdata(idaddress);
    //alert(addressid);
    $scope.addressused = idaddress;
    $ionicLoading.show();
    var userdata = Auth.FETCH_DATA("userdata");
    var obj    = new Object();
    obj.method = 'POST';
    //obj.url    = $rootScope.baseURL+"mobileappservices.php?func=fetchCarrier";
    obj.url    = $rootScope.baseURL+"addresses.php";
    obj.data   = new FormData();
      obj.data.append('idaddress', idaddress);
      obj.data.append('userid', userdata.id_customer);
      obj.data.append('token', '1as54d68asd312sd685asd64as6d1asd8asdasd546as8das1');
    obj.params = {};
    Auth.REQUEST(obj).then(function(success) {
        //$scope.changedadd = success.data;
        //console.log(success.data);
        $scope.error_ = false;
        if(success.data.id_state == 5 || success.data.id_state == '5'){
          var californiatax = parseFloat(0.09).toFixed(2);
          var subtot_wt = (cart[0]['product_total'] * californiatax);

          cart[0]['product_tax'] = subtot_wt;
          //$scope.total1 = cart[0]['product_total_wt'];
        }else{
          cart[0]['product_tax'] = 0;
        }

        cart[0]['address1']   = success.data.address1;
        cart[0]['id_state']   = success.data.id_state;
        cart[0]['enstate']    = success.data.formatedState;
        cart[0]['country']    = success.data.country;
        cart[0]['city']       = success.data.city;
        cart[0]['zip']        = success.data.postcode;
        cart[0]['first_name'] = success.data.firstname;
        cart[0]['last_name']  = success.data.lastname;
        cart[0]['email']      = userdata.email;
        cart[0]['phone']      = success.data.phone;

        Auth.STORE_DATA("cartdata", JSON.stringify(cart));
        var updatedcart = JSON.parse(Auth.FETCH_DATA("cartdata"));
        //display charges
        $scope.totaltax   = updatedcart[0]['product_tax'];
        $scope.grandtotal = updatedcart[0]['product_tax'] + updatedcart[0]['product_total'];

        Auth.STORE_DATA("cartdata", JSON.stringify(cart));
        //console.log(Auth.FETCH_DATA("cartdata"));

        $ionicLoading.hide();
        $scope.fetched     = true;
        $scope.specificAdd = success.data;
        $scope.fullname    = success.data.firstname+' '+success.data.lastname;
        $scope.citystate   = success.data.city+', '+success.data.formatedState+' '+success.data.postcode;
        $ionicLoading.hide({
          template: '<ion-spinner class="spinner-calm" icon="android"></ion-spinner>'
        });
    },function(error) {
     console.log(error);
        $ionicLoading.hide({
          template: '<ion-spinner class="spinner-calm" icon="android"></ion-spinner>'
        });
    });
  }

  $scope.getCarriers = function(addressused){
    var userdata  = Auth.FETCH_DATA("userdata");
    var totprice  = JSON.parse(Auth.FETCH_DATA("cartdata"));

    if (addressused === undefined || addressused === null) {
      $scope.error_ = true;
      return;
    }

    var obj    = new Object();
    //alert(addressused+'-'+userdata.id_customer+'-'+totprice);
    obj.method = 'POST';
    //obj.url    = $rootScope.baseURL+"mobileappservices.php?func=fetchCarrier";
    obj.url    = $rootScope.baseURL+"parent-order-controller.php";
    obj.data   = new FormData();
      obj.data.append('userid', userdata.id_customer);
      obj.data.append('addressid', addressused);
      obj.data.append('totalprice', totprice[0]['product_total']);
      obj.data.append('token', '1as54d68asd312sd685asd64as6d1asd8asdasd546as8das1');
    obj.params = {};
    Auth.REQUEST(obj).then(function(success) {
        $scope.error_ = false;
        //console.log(success.data);
        $ionicLoading.hide();
        $ionicLoading.hide({
          template: '<ion-spinner class="spinner-calm" icon="android"></ion-spinner>'
        });

        $rootScope.cartAddress = addressused;
        $rootScope.price_nt    = totprice;
        $rootScope.thecarriers = success.data;
        window.location.href="#/dash-carrier-list";
    },function(error) {
     console.log(error);
        $ionicLoading.hide({
          template: '<ion-spinner class="spinner-calm" icon="android"></ion-spinner>'
        });
    });
  }
})

.controller('CartCarrierCtrl', function($scope, $rootScope, Auth, $ionicLoading) {
  $scope.title       = 'Available Carriers';
  $scope.carriers    = $rootScope.thecarriers;
  var cart = JSON.parse(Auth.FETCH_DATA("cartdata"));

  $scope.totalshippping = 0;
  $scope.totaltax   = cart[0]['product_tax'];
  $scope.grandtotal = cart[0]['product_tax'] + cart[0]['product_total'];
  $scope.total1     = cart[0]['product_total'];

  $scope.topayment = function(id, price, name){
    cart[0]['id_carrier']    = id;
    cart[0]['carrier_price'] = price;
    cart[0]['carrier_name']  = name;
    Auth.STORE_DATA("cartdata", JSON.stringify(cart));
    //console.log(Auth.FETCH_DATA("cartdata"));
    window.location.href="#/dash-payment";
  }
})

.controller('PaymentCtrl', function($scope, $rootScope, Auth, $ionicLoading, $ionicModal,PaypalService) {
  $scope.title  = 'Payment Option';
  $scope.data   = [];
  var userdata  = Auth.FETCH_DATA("userdata");
  var cart      = JSON.parse(Auth.FETCH_DATA("cartdata"));
  $scope.errorCard = false;

  $scope.totalshippping = cart[0]['carrier_price'];
  $scope.totaltax   = cart[0]['product_tax'];
  $scope.grandtotal = cart[0]['product_tax'] + cart[0]['product_total'] + cart[0]['carrier_price'];
  $scope.total1     = cart[0]['product_total'];

  cart[0]['grand_total'] = $scope.grandtotal;
  Auth.STORE_DATA("cartdata", JSON.stringify(cart));
  //console.log(Auth.FETCH_DATA("cartdata"));

  // -------------- Modal ---------------
  $ionicModal.fromTemplateUrl('paymentConfirm.html', {
    scope: $scope,
    animation: 'slide-in-up'
  }).then(function(modal) {
    $scope.paymentConfirm = modal;
  });

  $ionicModal.fromTemplateUrl('authorizeForm.html', {
    scope: $scope,
    animation: 'slide-in-up'
  }).then(function(modal) {
    $scope.authorizeForm = modal;
  });
  // -------------- End Modal ---------------

  // -------------- Close Modal -------------
  $scope.closeModal = function() {
    $scope.paymentConfirm.hide();
    $scope.authorizeForm.hide();
  };


  $scope.paypalmodule = function(){
    $scope.paymentConfirm.show();
    //window.location.href="#/dash-payment-summary";
  }

  $scope.authorizemodule = function(){
    $scope.authorizeForm.show();
  }

  $scope.paynow = function(price){
    $scope.errorCard = false;
    var total1  = parseFloat(price);
    var payPalSandboxId = 'AaTQTNLO9FpM2PnulJjdBLNP9l3o4NUW72AD-9ilRDBCYmRqLzC7dnex1FoHZkeE9EVUBYsZcmBs7u3c';
    var payPalProductionId = 'AZ5fEHG8aLNtSY03IYDUxWeqhP4VAxelmf1VXjkfo1tIOIr7vodVUo_E_BbXdefcIYifbw7JxESXcZza';

    PaypalService.initPaymentUI(payPalSandboxId,payPalProductionId).then(function () {
      PaypalService.makePayment(total1, "Total Payment").then(function(success){
        if(success.response.state === 'approved'){
          $ionicLoading.show({
            template: '<ion-spinner class="spinner-calm" icon="android"></ion-spinner>'
          });
          var items = JSON.stringify(cart[0]['items']);
          var obj    = new Object();

          obj.method = 'POST';
          obj.url    = $rootScope.baseURL+"bypasspayment.php?func=authorizepayment";
          obj.data   = new FormData();
            obj.data.append('paytype', 'paypal');
            obj.data.append('items', items);
            obj.data.append('userid', userdata.id_customer);
            obj.data.append('firstname', userdata.firstname);
            obj.data.append('lastname', userdata.lastname);
            obj.data.append('totalproduct', cart[0]['product_total']);
            obj.data.append('totalprice', cart[0]['grand_total']);
            obj.data.append('producttax', cart[0]['product_tax']);
            obj.data.append('carrierprice', cart[0]['carrier_price']);
            obj.data.append('carriername', cart[0]['carrier_name']);
            obj.data.append('address', cart[0]['address1']);
            obj.data.append('state', cart[0]['enstate']);
            obj.data.append('country', cart[0]['country']);
            obj.data.append('zip', cart[0]['zip']);
            obj.data.append('city', cart[0]['city']);
            obj.data.append('email', cart[0]['email']);
            obj.data.append('phone', cart[0]['phone']);
            obj.data.append('carrierid', cart[0]['id_carrier']);
            obj.data.append('addressid', cart[0]['id_address']);
            obj.data.append('token', '1as54d68asd312sd685asd64as6d1asd8asdasd546as8das1');
          obj.params = {};
          Auth.REQUEST(obj).then(function(success) {
              var response = success.data;
              $ionicLoading.hide();
              if(response === 1 || response === '1'){
                Auth.STORE_DATA("cartdata", "");
                Auth.STORE_DATA("cart", "");
                $scope.paymentConfirm.hide();
                window.location.href="#/dash-order-confirmation";
              }
          },function(error) {
           console.log(error);
              $ionicLoading.hide({
                template: '<ion-spinner class="spinner-calm" icon="android"></ion-spinner>'
              });
          });
        }else{
          $ionicLoading.hide();
          $scope.errorCard = true;
          //alert(JSON.stringify(success));
          //error message
        }
      },function(error)
      {
        $rootScope.showToast('Cancelled Payment !');
      })
    });

  }

  $scope.paycredit = function(data){
    $scope.errorCard2 = false;
    var items = JSON.stringify(cart[0]['items']);
    $ionicLoading.show();

    var obj    = new Object();
    obj.method = 'POST';
    obj.url    = $rootScope.baseURL+"bypasspayment.php?func=authorizepayment";
    obj.data   = new FormData();
      obj.data.append('paytype', 'cc');
      obj.data.append('items', items);
      obj.data.append('userid', userdata.id_customer);
      obj.data.append('cardnumber', $scope.data.aim_cardnumber);
      obj.data.append('cardtype', $scope.data.aim_cardtype);
      obj.data.append('cvv', $scope.data.aim_cvv);
      obj.data.append('expmonth', $scope.data.aim_expmonth);
      obj.data.append('expyear', $scope.data.aim_expyear);
      obj.data.append('firstname', $scope.data.aim_firstname);
      obj.data.append('lastname', $scope.data.aim_lastname);
      obj.data.append('totalproduct', cart[0]['product_total']);
      obj.data.append('totalprice', cart[0]['grand_total']);
      obj.data.append('producttax', cart[0]['product_tax']);
      obj.data.append('carrierprice', cart[0]['carrier_price']);
      obj.data.append('carriername', cart[0]['carrier_name']);
      obj.data.append('address', cart[0]['address1']);
      obj.data.append('state', cart[0]['enstate']);
      obj.data.append('country', cart[0]['country']);
      obj.data.append('zip', cart[0]['zip']);
      obj.data.append('city', cart[0]['city']);
      obj.data.append('email', cart[0]['email']);
      obj.data.append('phone', cart[0]['phone']);
      obj.data.append('carrierid', cart[0]['id_carrier']);
      obj.data.append('addressid', cart[0]['id_address']);
      obj.data.append('token', '1as54d68asd312sd685asd64as6d1asd8asdasd546as8das1');
    obj.params = {};
    Auth.REQUEST(obj).then(function(success) {
        var response = success.data;
        $ionicLoading.hide();
        if(response === 1 || response === '1'){
          Auth.STORE_DATA("cartdata", "");
          Auth.STORE_DATA("cart", "");
          $scope.authorizeForm.hide();
          $ionicLoading.hide();
          window.location.href="#/dash-order-confirmation";
        }else{
          $scope.errorCard2 = true;
        }
    },function(error) {
     console.log(error);
        $ionicLoading.hide({
          template: '<ion-spinner class="spinner-calm" icon="android"></ion-spinner>'
        });
    });
  }
})

.controller('SummaryCtrl', function($scope, $rootScope, Auth, $ionicLoading) {
  $scope.title = 'Order Summary';

  var cart = JSON.parse(Auth.FETCH_DATA("cartdata"));

  $scope.totalshippping = cart[0]['carrier_price'];
  $scope.totaltax   = cart[0]['product_tax'];
  $scope.grandtotal = cart[0]['product_tax'] + cart[0]['product_total'] + cart[0]['carrier_price'];
  $scope.total1     = cart[0]['product_total'];

/*
  $ionicModal.fromTemplateUrl('',{
    scope: $scope,
    animation: 'slide-in-up'
  }).then(function(modal){
    $scope.modal = modal;
  });
*/

})

.controller('OrderConfirmCtrl', function($scope, $rootScope, Auth, $ionicLoading){
  $scope.title = 'Order Confirmation';



});
