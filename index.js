const express = require('express');
const  config = require('./config/config');

const currentConfig = config[process.env.NODE_ENV];
const {port, url} =currentConfig
const app = express()
const mongoose = require ("mongoose")
const User = require("./models/users")
const Post = require("./models/posts")
mongoose.connect(url, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log(" Db connection done successfully"));

const db = mongoose.connection
db.once("open",async() =>{
    if(await User.countDocuments().exec()>0 )return
    Promise.all([
        User.create({ name: "user1"}),
        User.create({ name: "user2"}),
        User.create({ name: "user3"}),
        User.create({ name: "user4"}),
        User.create({ name: "user5"}),
        User.create({ name: "user6"}),
        User.create({ name: "user7"}),
        User.create({ name: "user8"}),
        User.create({ name: "user9"}),
        User.create({ name: "user10"}),
        User.create({ name: "user11"}),
        User.create({ name: "user12"}),
        User.create({ name: "user13"}),
        User.create({ name: "user14"}),

    ]).then(()=>console.log("userAdded"))

    if(await Post.countDocuments().exec()>0 )return
    Promise.all([
        Post.create({ title: "Post1"}),
        Post.create({ title: "Post2"}),
        Post.create({ title: "Post3"}),
        Post.create({ title: "Post4"}),
        Post.create({ title: "Post5"}),
        Post.create({ title: "Post6"}),
        Post.create({ title: "Post7"}),
        Post.create({ title: "Post8"}),
        Post.create({ title: "Post9"}),
        Post.create({ title: "Post10"}),
        Post.create({ title: "Post11"}),
        Post.create({ title: "Post12"}),
        Post.create({ title: "Post13"}),
        Post.create({ title: "Post14"}),

    ]).then(()=>console.log("post Added"))
})
app.get('/users', paginatedResult(User), (req, res) => {
    res.json(res.paginatedResults)
})

app.get('/posts', paginatedResult(Post), (req, res) => {
    
    res.json(res.paginatedResults)
})
function paginatedResult (model) {
    console.log(model)
    return async(req, res, next) => {
    const page = parseInt(req.query.page);
    const limit = parseInt(req.query.limit);
    const startIndex = (page - 1) * limit
    const endIndex = page*limit
    const results = {}
    if(endIndex < await model.countDocuments().exec()){
        results.next ={
            page: page+1,
            limit:limit
            }
    }
    
    if(startIndex>0){
        results.previous ={
            page: page-1,
            limit:limit
            }
    
        }
        try{
            results.results = await model.find().limit(limit).skip(startIndex).exec()
        res.paginatedResults =results;
        next();
        } catch(e){
            res.status(500).json({message:e.message})
        }
        
     

    }

}
app.listen(port, () => console.log(`listen to ${port}`))
