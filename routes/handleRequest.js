module.exports = function(app){

  app.get('/', function(req, res){
    res.render('index', {status: ""});
  });

  app.get('/registration', function(req, res){
    res.render('registration', {status: ""});
  });

  app.get('/login', function(req, res){
    res.render('login', {status: ""});
  });

  app.get('/game', function(req, res){
    res.render('game');
  });

}
