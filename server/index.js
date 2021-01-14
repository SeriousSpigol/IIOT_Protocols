var restify = require('restify');

var server = restify.createServer();
server.use(restify.plugins.bodyParser());

server.get('/scooters', function(req, res, next) {
    res.send('List of scooters: [TODO]');
    return next();
});

server.get('/scooters/:id', function(req, res, next) {
    res.send('Current values for scooter ' + req.params['id'] + ': [TODO]');
    return next();
});

server.post('/scooters/:id', function(req, res, next) {
    res.send('Data received from scooter [TODO]');

    // uncomment to see posted data
    console.log(req.body);

    return next();
});

server.listen(8011, function() {
    console.log('%s listening at %s', server.name, server.url);
});
