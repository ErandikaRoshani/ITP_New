const mongoose = require('mongoose');


const performSchema = new mongoose.Schema({
    stdNIC:{
        type:String,
        required:true
    },
    subject:{
        type:String,
        required:true
    },
    course:{
        type:String,
        required:true
    },
    uploadDate:{
        type: Date,
        default: Date.now
    },
    assignmentCode:{
        type:String,
        required:true
    },
    result:{
        type: Number,
        required:true,
    },
    userID:{
        type: String,
        required: true
    }

});

const perform = mongoose.model('Performance', performSchema);
module.exports = perform;

