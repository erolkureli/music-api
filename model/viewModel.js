const mongoose = require('mongoose');

const ViewModel = mongoose.model('comments', new mongoose.Schema({
    collectionName: {
        type: String,
        required: true,
        minlength: 5,
        maxlength: 255,
    },
    comment: {
        type: String,
        required: true,
        minlength: 5,
        maxlength: 255,
    },
    liked: {
        type: String,
        required: true,
        minlength: 1,
        maxlength: 1,
    },

}));


exports.ViewModel = ViewModel; 
