/*
Test-4
Name: Raskirat Singh Kohli
Student ID: 149660219
Email: rkohli21@myseneca.ca
URL: https://sore-puce-pocketbook.cyclic.app/
*/
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
    res.sendFile(path.join(__dirname,"/finalViews/home.html"));
  });
  app.get("/register", function(req,res){
    res.sendFile(path.join(__dirname,"/finalViews/register.html"));
  });
  app.post("/register", function(req,res){
     final.register(req.body)
    .then((data) => { res.send(data.email + "registered successfully. <br> <a href='/'>Go Home</a>") })
    .catch((err) => { res.send(err) });
  });
  app.get("/signIn", function(req,res){
    res.sendFile(path.join(__dirname,"/finalViews/signIn.html"));
  });
  app.post("/signIn", function(req,res){
     final.signIn(req.body)
    .then((data) => { res.send(data.email + "signed in successfully. <br> <a href='/'>Go Home</a>") })
    .catch((err) => { res.json({message: err}) });
  });
  app.get("*", function(req,res){
    res.send("Not Found");
  });
  final.startDB()
  .then(() => {app.listen(HTTP_PORT, onHttpStart)})
  .catch(function(reason){
    console.log(reason);
  });