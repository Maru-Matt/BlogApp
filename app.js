//jshint esversion:6

const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const mongoose = require('mongoose');
var _ = require('lodash');

mongoose.set('strictQuery', false);
mongoose.connect("mongodb+srv://cluster0:matt@cluster0.aqcg8oz.mongodb.net/PersonalBlog", {useNewUrlParser: true});



const app = express();
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));

const homeStartingContent = "Lacus vel facilisis volutpat est velit egestas dui id ornare. Semper auctor neque vitae tempus quam. Sit amet cursus sit amet dictum sit amet justo. Viverra tellus in hac habitasse. Imperdiet proin fermentum leo vel orci porta. Donec ultrices tincidunt arcu non sodales neque sodales ut. Mattis molestie a iaculis at erat pellentesque adipiscing. Magnis dis parturient montes nascetur ridiculus mus mauris vitae ultricies. Adipiscing elit ut aliquam purus sit amet luctus venenatis lectus. Ultrices vitae auctor eu augue ut lectus arcu bibendum at. Odio euismod lacinia at quis risus sed vulputate odio ut. Cursus mattis molestie a iaculis at erat pellentesque adipiscing.";
const aboutContent = "Hac habitasse platea dictumst vestibulum rhoncus est pellentesque. Dictumst vestibulum rhoncus est pellentesque elit ullamcorper. Non diam phasellus vestibulum lorem sed. Platea dictumst quisque sagittis purus sit. Egestas sed sed risus pretium quam vulputate dignissim suspendisse. Mauris in aliquam sem fringilla. Semper risus in hendrerit gravida rutrum quisque non tellus orci. Amet massa vitae tortor condimentum lacinia quis vel eros. Enim ut tellus elementum sagittis vitae. Mauris ultrices eros in cursus turpis massa tincidunt dui.";
const contactContent = "Scelerisque eleifend donec pretium vulputate sapien. Rhoncus urna neque viverra justo nec ultrices. Arcu dui vivamus arcu felis bibendum. Consectetur adipiscing elit duis tristique. Risus viverra adipiscing at in tellus integer feugiat. Sapien nec sagittis aliquam malesuada bibendum arcu vitae. Consequat interdum varius sit amet mattis. Iaculis nunc sed augue lacus. Interdum posuere lorem ipsum dolor sit amet consectetur adipiscing elit. Pulvinar elementum integer enim neque. Ultrices gravida dictum fusce ut placerat orci nulla. Mauris in aliquam sem fringilla ut morbi tincidunt. Tortor posuere ac ut consequat semper viverra nam libero.";


const postTSchema = {
  title: String,
  body: String
}
const Post = mongoose.model("Post", postTSchema);


const posts = [];

app.get('/', function(req, res){

  Post.find({}, function(err, foundList){
    if (!err){
      res.render('home', {home_content: homeStartingContent, new_post: foundList});
    }
    
  })
})

app.get('/about', function(req, res){
  res.render('about', {about_content: aboutContent})
})

app.get('/contact', function(req, res){
  res.render('contact', {contact_content: aboutContent})
})


app.get('/compose', function(req, res){
  res.render('compose')
  res.redirect('/');
})

app.post('/compose', function(req, res){
  postTitle   = req.body.article_title;
  postContent = req.body.post;
  const post = new Post ({
    title: postTitle,
    body: postContent
  })
  post.save();
  res.redirect('/');
 
})

app.get('/posts/:post_title', function(req, res){
  const user_input = _.lowerCase(req.params.post_title);
  var post_title = "";
  var post_body = "";
  Post.find({}, function(err, foundList){
    if (!err){
      for (let i = 0; i < foundList.length; i++){
        if ( _.lowerCase(foundList[i]['title']) === user_input){
            post_title = foundList[i].title;
            post_body = foundList[i].body;
            res.render('post', {title: post_title, body: post_body})
          }
        }
      }
    })
  
  
})

app.listen(3003, function() {
  console.log("Server started on port 3000");
});
