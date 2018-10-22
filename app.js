var bodyParser   = require("body-parser"),
methodOverride   = require("method-override"),
mongoose         = require("mongoose"),
express          = require("express"),
app              = express(),
path             = require('path');


// APP CONFIG
mongoose.connect("mongodb://localhost/todos");
app.set("view engine", "ejs");
app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended: true}));
app.use(methodOverride("_method"));

// MONGOOSE/MODEL CONFIG
var todoSchema = new mongoose.Schema({
    todo: String
});
var Todo = mongoose.model("Todo", todoSchema);

//RESTFUL ROUTES
app.get("/", function(req, res) {
    res.redirect("/todos");
});

// INDEX ROUTE
app.get("/todos", function(req, res){
    Todo.find({}, function(err, todos){
        if(err){
            console.log(err);
        } else {
            res.render("index", {todos: todos});
        }
    });
});

// CREATE ROUTE
app.post("/todos", function(req, res){
    // create todo
    var theToDo = new Todo({todo: req.body.todo});
    Todo.create(theToDo, function(err, newToDo){
        if(err){
            res.render("index");
            alert("Error: " + err);
        } else {
            // then redirect to the index
            res.redirect("/todos");
        }
    });
});

//DELETE ROUTE
app.delete("/todos/:id", function(req, res){
   //destroy blog
   Todo.findByIdAndRemove(req.params.id, function(err){
       if(err){
           res.redirect("/todos");
           alert("Error: " + err);
       } else{
           //redirect somewhere
           res.redirect("/todos");
       }
   });
});

//START THE APPLICATION
app.listen(process.env.PORT, process.env.IP, function(){
    console.log("Server has started");
});
