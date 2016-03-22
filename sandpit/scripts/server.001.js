var shell = require('shelljs');
var loopback = require('loopback');
var boot = require('loopback-boot');

var app = module.exports = loopback();

app.start = function() {
  // start the web server
  return app.listen(function(ddd) {
	  console.log(ddd)
    app.emit('started');
    var baseUrl = app.get('url').replace(/\/$/, '');
    console.log('Web server listening at: %s', baseUrl);
    /********************thato end edit***************************/
				var version = shell.exec('node --version', {silent:true}).output;

				var child = shell.exec('slc arc', {async:true});
				child.stdout.on('data', function(data) {
				  console.log('... do something with data ... ');
				  console.log(data)
				});

				shell.exec('slc arc', function(code, output) {
				  console.log('Exit code:', code);
				  console.log('Program output:', output);
				});
	/********************thato end edit***************************/
	if (app.get('loopback-component-explorer')) {
      var explorerPath = app.get('loopback-component-explorer').mountPath;
      console.log('Browse your REST API at %s%s', baseUrl, explorerPath);
    }
  });
};

// Bootstrap the application, configure models, datasources and middleware.
// Sub-apps like REST API are mounted via boot scripts.
boot(app, __dirname, function(err) {
  if (err) throw err;

  // start the server if `$ node server.js`
  if (require.main === module)
    app.start();
});
