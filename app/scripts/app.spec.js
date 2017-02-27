describe('serviceSelectionController', function() {
  beforeEach(module('utilityApp'));

  it('should create a `services` model with 2 services', inject(function($controller) {
    var scope = {};
    var ctrl = $controller('serviceSelectionController', {$scope: scope});

    expect(scope.services.length).toBe(2);     
  }));    
});