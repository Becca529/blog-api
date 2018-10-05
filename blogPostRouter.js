const express = require('express');
const router = express.Router();

const bodyParser = require('body-parser');
const jsonParser = bodyParser.json();

const {BlogPosts} = require('./models');


///create default blogposts
BlogPosts.create('Dogs', 'Who does not love dogs - terrible people', 'Your Dog', '4/1/2017')
//BlogPosts.create('title, content, author, publishDate')


router.get('/',(req, res)=> {
    res.json(BlogPosts.get());
});

//when a new blog is posted - check required fields and add new blog and return with appropriate status messages
router.post('/', jsonParser, (req, res) => {
    //validate fields and send message if error
    const requiredFields = ['title', 'content', 'author', 'publishDate'];
    const missingReqFieldsMessage = validateReqFields(requiredFields, req);
    if (missingReqFieldsMessage){
        res.status(400).send(missingReqFieldsMessage);
    }

    //create blog post and update status to 201
    const post = BlogPosts.create (req.body.title, req.body.content, req.body.author, req.body.publishDate)
    res.status(201).json(item);
});

function validateReqFields(requiredFields, req) {
    
};

router.put('/:id', jsonParser, (req, res) =>{
    
    //checks if matching ids
    //validate fields and send status message if error
    //update blog post and send successful status
    });

router.delete('/:id', (req, res) => {
    
    //checks if matching ids
    BlogPosts.delete(req.params.id);
    console.log(`Deleted blog list \`${req.params.ID}\``);
    res.status(204).end();
});