const express = require('express')
const app = express();
const mongoose = require('mongoose')
port = 3000;
require('dotenv').config() 

app.use(express.json())

const userSchema = new mongoose.Schema({
    username:{
        type: String, 
        require: true,
    },
    content: {
        type: String,
        reuire: true 
    }
})


const User = new mongoose.model("User", userSchema)

// post a blog 
app.post('/api/v1/', async (req, res) => {
    // console.log(req.body)
    // res.json(req.body)
    const blog = await User.create(req.body)
    res.status(201).json({ blog })
})


//Will get all the blog post
app.get('/api/v1/', async (req, res) => {
    const blogs = await User.find({})
    res.status(200).json({ blogs })
})


// get the specific blog post
app.get('/api/v1/:id', async (req, res) => {
    const { id: taskID } = req.params
    try{
        const task = await User.findOne({ _id: taskID });
        res.status(200).json({ task })
    }
    catch(err){
        res.send('No Such user exist');
    }
  
})

// delete a specific blog post

const start = async () => {
    try {
        // console.log(process.env.MONGO_URI)
        await mongoose.connect(process.env.MONGO_URI);
        app.listen(port, console.log(`server is listening to port ${port}`))
    } catch (error) {
        console.log('connection failed');
    }
}


start();
 