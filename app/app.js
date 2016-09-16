var app = angular.module('savsApp', ['ngRoute', 'ngStorage']);

app.config(function ($routeProvider) {
  $routeProvider.when('/', {
    controller: 'indexController',
    templateUrl: 'app/templates/index.html'
  }).when('/otro', {
    controller: 'otroController',
    templateUrl: 'app/templates/otro.html'
  }).when('/formulario', {
    controller: 'formularioController',
    templateUrl: 'app/templates/formulario.html'
  }).when('/bienvenida', {
    controller: 'bienvenidaController',
    templateUrl: 'app/templates/bienvenida.html'
  });
});

app.controller('indexController', function ($scope, $location) {
  $scope.mensaje = 'Hola mundo desde AngularJS';
  $scope.saludar = function () {
    $location.path('/otro');
  };
});

app.controller('otroController', function ($scope, $location) {
  $scope.mensaje = 'Este es otro mensja desde angular';
  $scope.hola = function () {
    $location.path('/');
  };
});

app.controller('formularioController', function ($scope, $location, $http) {
  $scope.msnError = false;
  $scope.mensajeError = '';
  $scope.user = {};
  $scope.login = function () {

    $http.post($('#formUser').attr('action'), $scope.user)
            .then(function successCallback(response) { // success
              console.log(response);
              if (response.data.code == '200') {
                $location.path('/bienvenida');
              } else if (response.data.code == '500') {
                $scope.mensajeError = response.data.msg;
                $scope.msnError = true;
              }
            }, function errorCallback(response) { // optional // failed
              console.log(response);
            });

//    $.ajax({
//      url: $('#formUser').attr('action'),
//      type: $('#formUser').attr('method'),
//      data: $scope.user,
//      dataType: 'json',
//      success: function (data) {
//        console.log(data);
//        if (data.code == 200) {
//          $location.path('/bienvenida');
//        } else if (data.code == 500) {
//          $scope.mensajeError = data.msg;
//          $scope.msnError = true;
//        }
//      },
//      error: function (objeto, quepaso, otroobj) {
//
//      }
//    });
  };
});

app.controller('bienvenidaController', function ($scope, $location) {
  $scope.volver = function () {
    $location.path('/formulario');
  };
});