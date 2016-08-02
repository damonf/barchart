(function () {

  module.exports = {
    buildDir : 'build',

    appFiles: {
      js: ['src/**/*.js'],
      html: 'src/public/index.html'
    },

    vendorFiles: {
      js: [
        './bower_components/angular/angular.js',
      ],
      css: [
        //'./bower_components/bootstrap/dist/css/bootstrap.css',
      ]
    }
  };

})();

