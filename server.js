var express = require("express");

var app = express();
var PORT = process.env.PORT || 3000;

var db = require("./models");
var bodyParser = require("body-parser");
var passport = require('passport');
var session = require('express-session');
var flash = require('connect-flash');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.text());
app.use(bodyParser.json({ type: "application/vnd.api+json" }));


app.use(express.static("public"));

app.use(session({
  secret: 'jbd',
  resave: false,
  saveUninitialized: true
  // cookie: { secure: true }
}));
app.use(flash());
app.use(passport.initialize());
app.use(passport.session());



require("./routes/html-routes.js")(app);
require("./routes/api-routes.js")(app);
require('./config/passport.js')(passport, db.user);



db.sequelize.sync({ force: false }).then(function() {
  app.listen(PORT, function() {
    console.log("App listening on PORT " + PORT);
  });
});
