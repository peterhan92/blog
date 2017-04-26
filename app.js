const express = require("express"),
bodyParser = require("body-parser"),
mongoose = require("mongoose"),
app = express()

// APP CONFIG
mongoose.connect("mongodb://localhost/restful_blog_app");
app
	.set("view engine", "ejs")
	.use(express.static("public"))
	.use(bodyParser.urlencoded({extented: true}));

// MONGOOSE/MODEL CONFIG
var blogSchema = new mongoose.Schema({
	title: String,
	image: String,
	body: String,
	created: {type: Date, default: Date.now}
})
var Blog = mongoose.model("Blog", blogSchema);

// RESTFUL ROUTES
app
	.get("/", function(req, res) {
		res.redirect("/blogs");
	})
	.get("/blogs", function(req, res) {
		Blog.find({}, function(err, blogs) {
			if (err) {
				console.log("ERROR!");
			} else {
				res.render("index", {blogs: blogs});
			}
		})
	})

app.listen(3000, function() {
		console.log("Listening on port 3000");
	})