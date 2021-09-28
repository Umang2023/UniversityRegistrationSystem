const mongoose = require('mongoose')
const { ObjectId } = mongoose.Schema.Types
const announcementSchema = new mongoose.Schema({
    title:{
        type:String
    },
    department:{
        type:String,
    },
    content:{
        type:String
    },
    date:{
        type:Date,
        default:Date.now
    },
    postedBy:{
        type:ObjectId,
        ref:'User'
    },
})

const Announcement = mongoose.model('Announcement' , announcementSchema);
module.exports = Announcement