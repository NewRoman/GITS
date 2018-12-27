let express = require('express');
let app = require('express')();
let path = require('path');
// let server = require('http').Server(app);
let port = 8888;

app.use('/dist', express.static(__dirname + '/dist'));

app.get('/*', function(req, res) {
	res.sendFile(path.join(__dirname, '/dist/index.html'), function(err) {
	  if (err) {
		res.status(500).send(err)
	  }
	})
  })

  app.listen(port, () => {
  console.log('Running server on 127.0.0.1:' + port);
});
