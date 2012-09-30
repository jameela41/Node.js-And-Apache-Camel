
/**
 * Module dependencies.
 */

var express = require("express"),
    routes = require("./controllers"),
    _ = require("underscore");

var config = {
    websiteName: "Alan's Website",
    motto: "Alan's Website's Motto",
    email: "alan@website.com"
}

var app = module.exports = express.createServer();

// Configuration
_.each(config, function(value, key) { app.locals[key] = value; });

app.configure(function(){
  app.set("views", __dirname + "/views");
  app.set("view engine", "ejs");
  app.set('view options', { open : '<?', close : "?>"});

  app.use(express.bodyParser());
  app.use(express.methodOverride());
  app.use(express.cookieParser());
  app.use(express.session({ secret: "9e515910-0a7c-11e2-892e-0800200c9a66" }));
  app.use(app.router);
  app.use(express.static(__dirname + "/public"));
});

app.configure("development", function(){
  app.use(express.errorHandler({ dumpExceptions: true, showStack: true }));
});

app.configure("production", function(){
  app.use(express.errorHandler());
});

// User
app.use(function(req, res, next){
  //  res.locals.user = req.user;
    next();
});

// Routes

app.get("/", routes.index.handle);
app.get("/viewAllProducts", routes.viewAllProducts.handle);
app.get("/login", routes.viewLogin.handle);
app.get("/shoppingCart", routes.shoppingCart.handle);

app.post("/validateLogin", routes.validateLogin.handle);


app.listen(3003, function createServer(){
  console.log("Express server listening on port %d in %s mode", app.address().port, app.settings.env);
});
