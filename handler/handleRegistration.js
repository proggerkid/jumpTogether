module.exports = function(app, urlencodedParser, User){

  app.post('/registration', urlencodedParser, function(req, res){
    var reqData = {
      username: req.body.username,
      email: req.body.email,
      password: req.body.password
    };
    validateEntries(reqData, res);
    addUser(User, reqData, res);
  });
}

function validateEntries(reqData, res){
  var errorCode = {
    username: 0,
    email: 0,
    password: 0
  };
  if(reqData.username === ""){
    errorCode.username = 1;
  }
  if(reqData.email === ""){
    errorCode.email = 1;
  }
  if(reqData.password === ""){
    errorCode.password = 1;
  }
  if(errorCode.username == 1 || errorCode.email == 1 || errorCode.password == 1){
    res.render('registration', {status: errorCode});
  }
}

function addUser(User, reqData, res){
  var errorCode = {
    username: '',
    email: ''
  };
  User.find({}, function(error, result){
    if(error){
      res.render('index', {status: "Server error. Please try again later"});
    }

    for(i in result){
      if(result[i].username === reqData.username){
        errorCode.username = 'u';
      }
      if(result[i].email === reqData.email){
        errorCode.email = 'e';
      }
    }
    if(errorCode.username === 'u' || errorCode.email === 'e'){
      res.render('registration', {status: errorCode});
    }

    else{
      user = new User({
        username: reqData.username,
        email: reqData.email,
        password: reqData.password
      });
      user.save(function(err){
        if(err){
          console.log(err);
          res.render('index', {status: "Server error. Please try again later"});
        }
        else{
          res.render('login', {status: "You are registrated. Please login"});
        }
      });
    }
  });
}
