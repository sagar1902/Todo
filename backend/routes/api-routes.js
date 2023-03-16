const express = require('express');
const router = express.Router();
// const mongoose = require('mongoose');
const Todo = require('../models/Todo');



router.get('/:user_id', async (req, res) => {
    search_results = await Todo.find({user_id: req.params.user_id});
    if (search_results) {
        return res.status(200).send(JSON.stringify({ search_results }));
    } else {
        return res.status(400).send({ message: 'nothing here' })
    }
});


router.post('/:user_id', async (req, res) => {
    try {
        if(!req.body.title || !req.body.body || !req.params.user_id){throw('invalid request')}
        let time = new Date(req.body.due);
        const new_todo = new Todo({
            title: req.body.title,
            body: req.body.body,
            due: time.toString(),
            user_id:req.params.user_id
        });
        await new_todo.save();
        console.log('created', req.body.title)
        return res.status(200).send({ message: 'done' });
    } catch (error) {
        return res.status(500).send(JSON.stringify({ error }));
    }
});


router.put('/:id', async (req, res, next) => {
    try{
        if(!req.params.id){throw('invalid user')}
        Todo_id = req.params.id;
        title = req.body.title;
        body = req.body.body;
        due = req.body.due;
        let result = await Todo.updateOne({_id:Todo_id}, {title, body, due});
        res.status(200).send(result)
    }catch(error){
        res.status(400).send({error});
    }
});


router.delete('/:id', async (req, res, next) => {
    try {
        console.log(req.params)
        post_id = req.params.id;
        if (!post_id) throw ({ error: 'no id provided' });
        result = await Todo.deleteOne({ _id: post_id });
        if(result.deletedCount!==1){throw('DB Error')}
        console.log('deleted')
        return res.status(200).send(JSON.stringify({ message: 'done' }));
    } catch (error) {
        return res.status(400).send(JSON.stringify(error));
    }
});


module.exports = router;