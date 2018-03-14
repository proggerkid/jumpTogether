module.exports = function(app, urlencodedParser, User){
  app.post('/handleLogin', urlencodedParser, function(req, res){
    var loginData = {
      username: req.body.username,
      password: req.body.password
    }

    loginUser(User, loginData, res, req);
  });
}

function loginUser(User, loginData, res, req){
  User.findOne({username: loginData.username, password: loginData.password}, function(error, result){
    if(error){
      res.render('login', {status: "Server error. Try again later"});
    }
    if(!result){
      res.render('login', {status: "Username or password was wrong"});
    }
    else{
      req.session.user = result;
      res.render('index', {status: "You are logged in"});
    }
  });
}
