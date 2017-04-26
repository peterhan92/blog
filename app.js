const express = require("express"),
bodyParser = require("body-parser"),
mongoose = require("mongoose"),
methodOverride = require("method-override"),
app = express()

const staticAssets = __dirname + "/public"

// APP CONFIG
mongoose.connect("mongodb://localhost/restful_blog_app");
app
	.set("view engine", "ejs")
	.use(express.static("public"))
	.use(bodyParser.urlencoded({extented: true}))
	.use(methodOverride("_method"))

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
	// INDEX ROUTE
	.get("/blogs", function(req, res) {
		Blog.find({}, function(err, blogs) {
			if (err) {
				console.log("ERROR!");
			} else {
				res.render("index", {blogs: blogs});
			}
		})
	})
	// NEW ROUTE
	.get("/blogs/new", function(req, res) {
		res.render("new");
	})
	// POST ROUTE
	.post("/blogs", function(req, res) {
		Blog.create(req.body.blog, function(err, newBlog) {
			if (err) {
				res.render("new");
			} else {
				res.redirect("/blogs");
			}
		})
	})
	// SHOW ROUTE
	.get("/blogs/:id", function(req, res) {
		Blog.findById(req.params.id, function(err, foundBlog) {
			if (err) {
				res.redirect("/blogs");
			} else {
				res.render("show", {blog: foundBlog});
			}
		})
	})
	// EDIT ROUTE
	.get("/blogs/:id/edit", function(req, res) {
		Blog.findById(req.params.id, function(err, foundBlog) {
			if (err) {
				res.redirect("/blogs")
			} else {
				res.render("edit", {blog: foundBlog})
			}
		})
	})
	// UPDATE ROUTE
	.put("/blogs/:id", function(req, res) {
		Blog.findByIdAndUpdate(req.params.id, req.body.blog, function(err, updatedBlog) {
			if (err) {
				res.redirect("/blogs");
			} else {
				res.redirect("/blogs/" + req.params.id);
			}
		})
	})

app.listen(3000, function() {
		console.log("Listening on port 3000");
	})