const mongoose = require('mongoose');

const TodoSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    body: {
        type: String,
        required: true
    },
    timestamp:{ 
        type: Date,
        default: new Date
    },
    due:{
        type: Date,
        required: true
    },
    user_id:{
        type: String,
        required: true
    }
});

const Todo = mongoose.model('Todo', TodoSchema);
module.exports = Todo;