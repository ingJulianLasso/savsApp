var app = angular.module('savsApp', ['ngRoute', 'ngStorage']);

app.config(function ($routeProvider) {
  $routeProvider.when('/', {
    controller: 'indexController',
    templateUrl: 'app/templates/index.html'
  }).when('/registro', {
    controller: 'formularioController',
    templateUrl: 'app/templates/formulario.html'
  }).when('/bienvenida', {
    controller: 'bienvenidaController',
    templateUrl: 'app/templates/bienvenida.html'
  }).otherwise({
    redirectTo: '/'
  });
});

app.controller('indexController', function ($scope, $location, $localStorage, $sessionStorage) {

  if ($localStorage.session == true) {
    $location.path('/bienvenida');
  } else if ($sessionStorage.session == true) {
    $location.path('/bienvenida');
  }

  $scope.user = {};
  $scope.msnError = false;
  $scope.iniciarSesion = function () {
    $.ajax({
      url: $('#formUser').attr('action'),
      type: $('#formUser').attr('method'),
      data: $scope.user,
      dataType: 'json',
      success: function (data) {
        $scope.$apply(function () {
          if (data.code == 200) {
            if ($scope.user.rememberme == true) {
              $localStorage.session = true;
            } else {
              $sessionStorage.session = true;
            }
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

app.controller('formularioController', function ($scope, $location, $http) {
  $scope.registro = {};
  $scope.pageInicio = function () {
    $location.path('/');
  };
  $scope.registrar = function () {
    $.ajax({
      url: $('#formUser').attr('action'),
      type: $('#formUser').attr('method'),
      data: $scope.registro,
      dataType: 'json',
      success: function (data) {
        $scope.$apply(function () {
          if (data.code == 200) {
            $scope.mensajeSuccess = data.msg;
            $scope.msnSuccess = true;
            $location.path('/');
          } else if (data.code == 300) {

            if (typeof data.usuario !== 'undefined') {
              $scope.errorUser = 'has-error';
              $scope.msnErrorUser = true;
              $scope.mensajeErrorUser = data.usuario.invalido;
            }

            if (typeof data.password.invalido !== 'undefined') {
              $scope.errorPass = 'has-error';
              $scope.msnErrorPass = true;
              $scope.mensajeErrorPass = data.password.invalido;
            }

          }
        });
      },
      error: function (objeto, quepaso, otroobj) {

      }
    });
  };
});

app.controller('bienvenidaController', function ($scope, $location, $localStorage, $sessionStorage) {
  $scope.logout = function () {
    if ($localStorage.session == true) {
      delete $localStorage.session;
    } else if ($sessionStorage.session == true) {
      delete $sessionStorage.session;
    }
    $location.path('/');
  };
});