angular.module('df.app', [
  'df.barchart.directive'
])

.controller('AppController', $scope => {
  $scope.config1 = {
    rangeStart  : 0,
    rangeEnd    : 24,
    stepValue   : 1,
    gridWidthPx : 900,
    rowHeightPx : 50,
    barOutlineColor : '#1E1E1E'
  };

  $scope.rows1 = [
    {
      label: 'abc',
      barFillColor: 'blue',
      barLabelColor: 'white',
      bars: [
        {
          label: 'blue1',
          start: 1,
          end  : 2
        }
      ]
    },
    {
      label: 'xyz',
      barFillColor: 'red',
      bars: [
        {
          label: 'red1',
          start: 2,
          end  : 5
        },
        {
          label: 'an extra long label',
          start: 7,
          end  : 9
        },
        {
          label: 'red3',
          start: 9.5,
          end  : 22.5 
        }
      ]
    },
  ];

  $scope.config2 = {
    rangeStart  : 100,
    rangeEnd    : 200,
    stepValue   : 10,
    gridWidthPx : 500,
    rowHeightPx : 40,
    barOutlineColor : '#1E1E1E'
  };

  $scope.rows2 = [
    {
      label: 'abc',
      barFillColor: 'blue',
      bars: [
        {
          start: 90,
          end  : 110 
        }
      ]
    },
    {
      label: 'xyz',
      barFillColor: 'red',
      bars: [
        {
          start: 130,
          end  : 145 
        },
        {
          start: 170,
          end  : 400 
        }
      ]
    },
  ];

  $scope.config3 = {
    rangeStart     : -100,
    rangeEnd       : 100,
    stepValue      : 5,
    gridWidthPx    : 600,
    rowHeightPx    : 50,
    barThickness   : 0.2,
    headerFont     : '9px serif'
  };

  $scope.rows3 = [
    {
      label: 'label1',
      barFillColor: 'orange',
      bars: [
        {
          start: -50,
          end  : 50 
        }
      ]
    },
    {
      label: 'label2',
      barFillColor: 'yellow',
      bars: [
        {
          start: -100,
          end  : 0 
        },
        {
          start: 15,
          end  : 80 
        }
      ]
    },
    {
      label: 'label3',
      barFillColor: 'green',
      bars: [
        {
          start: -5,
          end  : 5 
        },
        {
          start: 10,
          end  : 50 
        }
      ]
    },
  ];
});

;

