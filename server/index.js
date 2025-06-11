// import express from 'express';
// import mongoose from 'mongoose';
// import cors from 'cors';
// import dotenv from 'dotenv';
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');


dotenv.config();
const app = express();
app.use(cors());
app.use(express.json());

app.get('/', (req, res) => res.send('API is Working'));

mongoose.connect(process.env.MONGO_URI)
.then(() => app.listen(5000, () => console.log('Server is running')))
.catch(err => console.log(err));