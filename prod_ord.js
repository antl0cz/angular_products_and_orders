// app module
var app = angular.module('app', []);

// create factory
app.factory('productFactory', ['$http', function ($http) {
    // the factory is a function that returns an object

    var factory = {};
    var products = [
        {name: 'Keyboard', price: 149.99, quantity: 25},
        {name: 'Mouse', price: 59.99, quantity: 34},
        {name: 'Basketball', price: 59.99, quantity: 24}
    ];

    factory.getProduct = function (callback) {
        callback(products);
    }

    factory.create = function (data, callback) {
        data.quantity = 50;
        products.push(data);
        callback(products);
    }

    factory.update = function (data, callback) {
        if (Number(data.quantity)) {
            if (products[data.id].quantity - data.quantity > 0) {
                products[data.id].quantity -= data.quantity;
            } else {
                products[data.id].quantity = 0;
            }
        }
        callback(products);
    }

    factory.delete = function (id, callback) {
        products.splice(id, 1);
        callback(products);
    }

    return factory;
}]);

app.controller('productController', ['$scope', 'productFactory', function ($scope, productFactory) {
    function setProducts(data) {
        $scope.products = data;
        $scope.product = {};
    }

    $scope.products = [];
    $scope.product = {};

    $scope.getProduct = function () {
        productFactory.getProduct(setProducts);
    }

    $scope.getProduct();

    $scope.create = function () {
        productFactory.create($scope.product, setProducts);
    }

    $scope.delete = function (id) {
        productFactory.delete(id, setProducts);
    }
}])

app.controller('orderController', ['$scope', 'productFactory', function ($scope, productFactory) {
    function setProducts(data) {
        $scope.products = data;
        $scope.product = {};
    }

    $scope.products = [];

    productFactory.getProduct(setProducts);

    $scope.update = function (id) {
        productFactory.update({
            id: id,
            quantity: 1
        }, setProducts);
    }
}])