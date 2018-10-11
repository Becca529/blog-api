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
        return res.status(400).send(missingReqFieldsMessage);
    }
    //create blog post and update status to 201
    const post = BlogPosts.create (req.body.title, req.body.content, req.body.author, req.body.publishDate)
    res.status(201).json(post);
});

router.put('/:id', jsonParser, (req, res) =>{
    const misMatchtedIDs = validateMatchingIDs(req);
    const requiredFields = ['title', 'content', 'author', 'publishDate'];
    const missingReqFieldsMessage = validateReqFields(requiredFields, req);
   
    //checks if matching ids
    if (misMatchtedIDs){
        return res.status(400).send(misMatchtedIDs);
    }
    //validate fields and send status message if error
    if (missingReqFieldsMessage){
        console.error(missingReqFieldsMessage);
        return res.status(400).send(missingReqFieldsMessage);
        
    }
    //update blog post and send successful status
    console.log(`Updating blog post \`${req.params.id}\``);
    BlogPosts.update({
          id: req.params.id,
          title: req.body.title,
          body: req.body.body,
          author: req.body.author,
          publishDate: req.body.publishDate
        });
    return res.status(204).end();

});

router.delete('/:id', (req, res) => {
    BlogPosts.delete(req.params.id);
    console.log(`Deleted blog list \`${req.params.ID}\``);
    res.status(204).end();
});

function validateReqFields(requiredFields, req){
    //for (const index of requiredFields) {
    for (let i=0; i<requiredFields.length; i++) {
    const field = requiredFields[i];
        if (!(field in req.body)) {
            const message = `Missing \`${field}\` in request body`
            console.error(message);
            return message;
            }
          }
        return null;
};


function validateMatchingIDs (req) {
    return req.paras.id !== req.body.id ? `Request path id (${req.params.id}) and request body id (${req.body.id}) must match` : null;
  };


module.exports = router;