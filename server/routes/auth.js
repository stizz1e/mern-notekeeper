const express = require('express');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const router = express.Router();

router.post('/register', async (req, res) => {
    try {
        const {username, password} = req.body;
        const exists = await User.findOne({username});
        if (exists) return res.status(400).json({message: 'User already exists'});

        const user = new User({username, password});
        await user.save();

        res.status(201).json({message: 'User created'});
    } catch (err) {
        res.status(500).json({message: 'Server error'});
    }
});

router.post('/login', async (req, res) => {
    try{
        const {username, password} = req.body;
        const user = await User.findOne({username});
        if(!user)  return res.status(400).json({message: 'Invalid credentials'});

        const isMatch = await user.comparePassword(password);
        if(!isMatch) return res.status(400).json({message: 'Invalid credentials'});

        const token = jwt.sign({id: user._id}, process.env.JWT_SECRET, {expiresIn: '1h'});
        res.json({token});
    }catch (err){
        res.status(500).json({message: 'Server error'});
    }
});

module.exports = router;