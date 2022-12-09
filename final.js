var mongoose = require("mongoose");
const bcrypt = require('bcryptjs');
var exports = module.exports = {};
var Schema = mongoose.Schema;
var finalUsers = new Schema({
  "email":  {
    "type": String,
    "unique": true
  },
  "password": String
});
function space(str){
    return str === null || str.match(/^ *$/) !== null;
}
let fin;
let db1 = mongoose.createConnection(`mongodb+srv://test4:123@test4.wpdlxy0.mongodb.net/t4?retryWrites=true&w=majority`);
exports.startDB = function () {
    return new Promise((resolve, reject) => {
        db1.on('error', (err)=>{
            reject(err);
          });
          db1.once('open', ()=>{
            console.log("DB CONNECTION SUCESSFUL");
            fin = db1.model("users", finalUsers);
            resolve();
          }); 
    });
  };
  exports.register = function(us){
    return new Promise(function(resolve,reject){
        if (space(us.password) || space(us.email))
            reject("Error: email or password cannot be empty.");
        else{
            var newUser = new fin(us);
            console.log(newUser);
        bcrypt.genSalt(10, function(err, salt) { 
        bcrypt.hash(newUser.password, salt, function(er, hash) { 
        if (!er){
            newUser.password = hash;
            newUser.save((err) => {
            if(err) {
                if(err == 11000)
                reject(`Error: ${newUser.email} already exists`);
                else
                reject("Error: cannot create the user.")
            } else {
                    resolve(newUser);
            }
            });
        }
    });
    });
}
})
}
exports.signIn = function(us){
    return new Promise(function(resolve,reject){
        fin.findOne({email : us.email}).exec().then(function(user){
            if (user){
                bcrypt.compare(us.password, user.password).then(function(isMatch){
                    if (isMatch == false){
                        reject(`Incorrect password for user ${us.email}`);
                    }
                    else{ 
                        resolve(user);
                    }
                 })
            }
            else{
               reject(`Cannot find the user: ${us.email}`);
            }
        }).catch(function(err){
                reject(`Cannot find the user: ${us.email}`);
        });
    })
}
