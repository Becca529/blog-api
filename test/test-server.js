const chai = require('chai');
const chaiHttp = require('chai-http');

const {app, closeServer, runServer} = require('../server');

const expect = chai.expect;

chai.use(chaiHttp);

describe('BlogPosts', function (){
    Before(function(){
        return runServer();
    });

    after(function(){
        return closeServer();
    });

    //GET request tests
    it('should list blogpost on GET request', function(){
        return chai.request(app)
            .get('/users')
            .then(function(res){
                expect(res).to.have.status()
            })

    })
})