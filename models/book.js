const mongoose = require('mongoose');

const Schema = mongoose.Schema

let BookSchema = new Schema({
    title:{
        type:String
    },
    author:{
        type:String,
    },
    genre:{
        type:String,
    },
    available:{
        type:Number,
    }
});

module.exports=mongoose.model('Book', BookSchema)