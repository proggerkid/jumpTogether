module.exports = {
  connect: function(mongoose){
    mongoose.connect('mongodb://localhost/jumptogether');
    mongoose.connection.on('error', function(){
      console.log("failed to connect to db");
    });
    mongoose.connection.once('open', function(){
      console.log("connected to db");
    });
  },
  makeModelUser: function(mongoose){
    var schemaUser = mongoose.Schema({
      username: String,
      email: String,
      password: String
    });
    return mongoose.model('user', schemaUser);
  }
}
