angular.module('df.barchart.directive', [
  'df.barchart'
])

.directive('barchart', (
  Barchart
) => {

  return {
    restrict: 'AE',
    scope : {
      name   : '@',
      config : '=',
      rows   : '='
    },
    template: '<canvas id="barchartCanvas" width="900" height="0"></canvas>',
    link : (scope, element) => {
      var
        barchart;

      element.find('canvas').attr('id', scope.name); 

      // TODO: need a watch on config
      barchart = Barchart.create(scope.name, scope.config);

      scope.$watch('rows', newVal => {
        if (newVal) {
          barchart.draw(scope.rows);
        }
      });

    }
  };
})

;
