const mongoose = require("mongoose")
const postsSchema = new mongoose.Schema({
    title:{
        type:String,
        required:true
    }
})
module.exports= mongoose.model("Post", postsSchema)