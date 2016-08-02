
var
  express = require('express'),
  config = require('./config/config'),
  app = express()
  ;

//app.use(express.static(`${__dirname}/build/public`));
app.use(express.static(__dirname + '/build/public'));

app.listen(config.port, () => {
  //console.log(`listening on port ${config.port}`);
  console.log('listening on port ' + config.port);
});
