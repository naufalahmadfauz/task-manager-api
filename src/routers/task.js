const express = require('express');
const router = new express.Router();
const Task = require('../models/tasks');
const auth = require('../middleware/auth')

router.get('/tasks',auth, async (req, res) => {
    const match = {}
    const sort = {}
    if(req.query.completed){
        match.completed = req.query.completed === 'true'
    }
    if(req.query.sortBy){
        const parts = req.query.sortBy.split(':');
        sort[parts[0]] = parts[1] === 'desc' ? -1 : 1
    }
    try {

        // var tasks = await Task.find({owner:req.user._id})
        await req.user.populate({
            path: 'tasks',
            match,
            options:{
                limit : parseInt(req.query.limit),
                skip : parseInt(req.query.skip),
                sort
            }
        }).execPopulate();
        res.status(200).send(req.user.tasks);
    }catch (e) {
        res.status(404).send();
    }

    // Task.find({}).then((tasks)=>{res.send(tasks)}).catch((e)=>{res.status(404).send()})
});

router.get('/tasks/:id',auth,async (req, res) => {
    const _id = req.params.id;
    try {

        const task = await Task.findOne({_id,owner:req.user._id})
        if(!task){
            return res.status(404).send()
        }
        res.status(200).send(task)

    }catch (e) {
        res.status(500).send();
    }

    // Task.findById(_id).then((task)=>{if(!task){return res.status(404).send()}res.send(task)}).catch((e)=>{res.status(500).send()})
});

router.post('/tasks', auth, async (req, res) => {
    const task = new Task({
        ...req.body,
        owner: req.user._id
    })
    try{
        await task.save()
        res.status(201).send(task)
    }catch (e) {
        res.status(400).send(e);
    }
});

router.patch('/tasks/:id',auth,async (req,res)=>{
    var updates = Object.keys(req.body)
    var allowedupdates = ['description','completed'];
    var isValidatorValid = updates.every((update)=>allowedupdates.includes(update))
    if(!isValidatorValid){
        return res.status(400).send("Bad Request!")
    }
    try {
        var task = await Task.findOne({_id:req.params.id,owner:req.user._id})


        // var task = await Task.findByIdAndUpdate(req.params.id,req.body,{new:true,runValidators:true})
        if(!task){
            return res.status(404).send("No Match!")
        }
        updates.forEach((update)=>{
            task[update] = req.body[update]
        })

        await task.save();
        res.status(200).send("Data Edited!");
    }catch (e) {
        res.status(500).send(e);
    }

})

router.delete('/tasks/:id',auth,async (req,res)=>{
    try {
        // const task = await Task.findByIdAndDelete(req.params.id)

        const task = await Task.findOneAndDelete({_id:req.params.id,owner:req.user.id})
        if(!task){
            return res.status(404).send('Not Found!');
        }
        res.status(200).send(task)
    }catch (e) {
        res.status(500).send('error');
    }
})

module.exports = router;