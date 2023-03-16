const express = require('express');
const router = express.Router();
// const mongoose = require('mongoose');
const User = require('../models/User');

router.post('/login', async(req, res)=>{
    try{
        if(!req.body.username || !req.body.password){throw('invalid request to server')}
        const result = await User.find({username: req.body.username, password: req.body.password});
        if(result.length!==1){throw('user not found')}
        return res.status(200).send({id:result[0]._id});
        //res.status(200).send({})
    }catch(error){return res.status(400).send({error})}
});


router.post('/register', async(req, res)=>{
    try{
        if(!req.body.username || !req.body.password){throw('invalid request to server')}
        const user = new User({
            username: req.body.username,
            password: req.body.password
        })
        await user.save();
        return res.status(201).send({message: 'done'});
    }catch(error){return res.status(400).send({error})}
});


module.exports = router;