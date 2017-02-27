var mainApp = angular.module(
    'mainApp', ['ngMessages', 'ngResource', 'ngRoute']);

/*
 *   Router
 */
mainApp.config(function($routeProvider){
    $routeProvider
        .when('/', {
                templateUrl: 'views/signin.view.html',
                controller: 'serviceLoginController'
            })
        .when('/op', {
                templateUrl: 'views/options.html',
                controller: 'serviceSelectionController'
            })
        .when('/ce/:env', {
                templateUrl: 'views/changeenvironment.html',
                controller: 'serviceSelectionSecondController'
            })
        .when('/ue/:env', {
        
            })
        .when('/lv/:env', {
        
            })
        .when('/re/:env', {
        
            })
        .when('/ao/:env', {
        
            })  
        .when('/ro/:env', {
        
            })
        .when('/login', {
                templateUrl: 'views/signin.view.html',
                controller: 'serviceLoginController'
            })
        .otherwise({ redirectTo: '/login' });    
});

/*
 *   Services
 */
mainApp.service('authService', function(){
    var self = this;
    
    this.user = 'YnNzYXBwQGNlbnR1cnlsaW5rLmNvbQ==';
    
    this.token = function(){
       return self.user + "YnNzYXBw"; 
    };
    
    this.validate = function(user){
        return self.token();
    }
});

/*
 *   Controllers
 */
mainApp.controller(
    'serviceLoginController'
    ,["$scope", "$log", "$http", "$routeParams", "$location", "authService", function serviceLoginController($scope, $log, $http, $routeParams, $location, authService)
         {
            $log.info(authService.user + " serviceLoginController...(" + $routeParams.env + ")...");
            
            $scope.validate = function(user)
            {
                if((btoa(user.username) + btoa(user.password)) === authService.validate(user)) {
                    $log.debug(true);
                    $location.url('/op');
                    //return true;
                }
                else {
                    $log.debug(false);
                    return false;
                }
            };
             
            $scope.reset = function(user)
            {
                user.username = "";
                user.password = "";
            }
         }
     ]
);

mainApp.controller(
    'serviceSelectionController'
    ,["$scope", "$log", "$http", "$routeParams", "authService", function serviceSelectionController($scope, $log, $http, $routeParams, authService)
         {
            $log.info(authService.user + " serviceSelectionController...(" + $routeParams.env + ")...");
            $scope.services 
                = [{
                        name: 'Change Environment',
                        snippet: 'INT1',
                        url: '#/ce/int1'
                   },
                   {
                        name: 'Update Environment',
                        snippet: 'INT1',
                        url: '#/ue/int1'
                   },
                   {
                        name: 'Log Viewer',
                        snippet: 'INT1',
                        url: '#/lv/int1'
                   },
                   {
                        name: 'Restart',
                        snippet: 'INT1',
                        url: '#/re/int1'
                   },
                   {
                        name: 'Available Options',
                        snippet: 'INT1',
                        url: '#/ao/int1'
                   },
                   {
                        name: 'Router',
                        snippet: 'INT1',
                        url: '#/ro/int1'
                   }
                  ];
         }
      ]
);


mainApp.controller(
    'serviceSelectionSecondController'
    ,["$scope", "$log", "$http", "$routeParams", "authService", function serviceSelectionSecondController($scope, $log, $http, $routeParams, authService)
         {
            $log.info(authService.user + " serviceSelectionSecondController(" + $routeParams.env + ")...");
           
             $http.get('http://www.google.com')
                  .success(function(result){$scope.bmiresult = result;})
                  .error(function(data, code){$log.error("Error: " + data);$log.error("Error: " + code);})
                  .finally(function(){$log.info("Completed BMI request.");});
         }
      ]
);

mainApp.directive("serviceSelectionList"
                     ,function() {
                        return {
                            restrict: 'AECM',
                            templateUrl: 'scripts/directives/templates/servicelist.html',
                            replace: false,
                            scope:{
                                serviceObject: "=", }
                        }          
                      }
);