var HTTP_PORT = process.env.PORT || 8080;
var express = require("express");
var app = express();
var path = require("path");
var final = require("./final")
function onHttpStart() {
    console.log("Express http server listening on: " + HTTP_PORT);
  }
  app.use(express.json());
  app.use(express.urlencoded({extended: true}));
  app.get("/", function(req,res){
    res.sendFile('finalViews/home');
  });
  app.get("/register", function(req,res){
    res.sendFile('finalViews/register');
  });
  app.post("/register", function(req,res){
     final.register(req.body)
    .then((data) => { res.send(data + "registered successfully. <br> <a href='/'>Go Home</a>") })
    .catch((err) => { res.json({message: err}) });
  });
  app.get("/signIn", function(req,res){
    res.sendFile('finalViews/signIn');
  });
  app.post("/register", function(req,res){
     final.signIn(req.body)
    .then((data) => { res.send(data + "signed in successfully. <br> <a href='/'>Go Home</a>") })
    .catch((err) => { res.json({message: err}) });
  });
  app.get("*", function(req,res){
    res.send("Not Found");
  });