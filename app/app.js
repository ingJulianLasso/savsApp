var app = angular.module('savsApp', ['ngRoute', 'ngStorage']);

app.config(function ($routeProvider) {
  $routeProvider.when('/', {
    controller: 'indexController',
    templateUrl: 'app/templates/index.html'
  }).when('/otro', {
    controller: 'registroController',
    templateUrl: 'app/templates/registro.html'
  }).when('/formulario', {
    controller: 'formularioController',
    templateUrl: 'app/templates/formulario.html'
  }).when('/bienvenida', {
    controller: 'bienvenidaController',
    templateUrl: 'app/templates/bienvenida.html'
  }).otherwise({
    redirectTo: '/'
  });
});

app.controller('indexController', function ($scope, $location) {
  $scope.user = {};
  $scope.iniciarSesion = function () {
    $.ajax({
      url: $('#formUser').attr('action'),
      type: $('#formUser').attr('method'),
      data: $scope.user,
      dataType: 'json',
      success: function (data) {
        $scope.$apply(function () {
          console.log(data);
          if (data.code == 200) {
            $location.path('/bienvenida');
          } else if (data.code == 500) {
            $scope.mensajeError = data.msg;
            $scope.msnError = true;
          }
        });
      },
      error: function (objeto, quepaso, otroobj) {

      }
    });
  };
  $scope.pageRegistro = function () {
    $location.path('/registro');
  };
});

app.controller('registroController', function ($scope, $location) {
  $scope.index = function () {
    $location.path('/');
  };
});

app.controller('formularioController', function ($scope, $location, $http) {
  $scope.msnError = false;
  $scope.mensajeError = '';
  $scope.user = {};
  $scope.login = function () {

//    $http.post($('#formUser').attr('action'), $scope.user)
//            .then(function successCallback(response) { // success
//              console.log(response);
//              if (response.data.code == '200') {
//                $location.path('/bienvenida');
//              } else if (response.data.code == '500') {
//                $scope.mensajeError = response.data.msg;
//                $scope.msnError = true;
//              }
//            }, function errorCallback(response) { // optional // failed
//              console.log(response);
//            });

    $.ajax({
      url: $('#formUser').attr('action'),
      type: $('#formUser').attr('method'),
      data: $scope.user,
      dataType: 'json',
      success: function (data) {
        $scope.$apply(function () {
          console.log(data);
          if (data.code == 200) {
            $location.path('/bienvenida');
          } else if (data.code == 500) {
            $scope.mensajeError = data.msg;
            $scope.msnError = true;
          }
        });
      },
      error: function (objeto, quepaso, otroobj) {

      }
    });
  };
});

app.controller('bienvenidaController', function ($scope, $location) {
  $scope.volver = function () {
    $location.path('/formulario');
  };
});