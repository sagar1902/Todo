const express = require('express');
const router = express.Router();
// const mongoose = require('mongoose');
const User = require('../models/User');

router.post('/login', async(req, res)=>{
    try{
        if(!req.body.username || !req.body.password){throw({user:req.body.username?false:true, password:req.body.password?false:true})}
        const result = await User.find({username: req.body.username, password: req.body.password});
        if(result.length!==1){throw({user:true, password:true})}
        return res.status(200).send({id:result[0]._id});
        //res.status(200).send({})
    }catch(error){return res.status(400).send({error})}
});


router.post('/register', async(req, res)=>{
    try{
        if(!req.body.username || !req.body.password){throw({user:(req.body.username?false:true), password:(req.body.password?false:true)})}
        const user = new User({
            username: req.body.username,
            password: req.body.password
        })
        await user.save();
        return res.status(201).send({message: 'done'});
    }catch(error){return res.status(400).send({error})}
});


module.exports = router;