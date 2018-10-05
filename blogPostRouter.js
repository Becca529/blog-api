const express = require('express');
const router = express.Router();

const bodyParser = require('body-parser');
const jsonParser = bodyParser.json();

const {BlogPosts} = require('./models');


///create default blogposts
BlogPosts.create('Dogs', 'Who does not love dogs - terrible people', 'Your Dog', '4/1/2017')
//BlogPosts.create('title, content, author, publishDate')


router.get('/',(req, res)=>{
    res.json(BlogPosts.get());
});

//when a new blog is posted - check required fields and add new blog and return with appropriate status messages
router.post('/', jsonParser, (req, res) =>{
//validate fields and send message if error
//create blog post
});

router.put('/:id', jsonParser, (req, res) =>{
    
    //checks if matching ids
    //validate fields and send status message if error
    //update blog post and send successful status
    });