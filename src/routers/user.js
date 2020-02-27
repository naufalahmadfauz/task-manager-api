const express = require('express');
const router = new express.Router();
const User = require('../models/users');
const auth = require('../middleware/auth')
const multer = require('multer')
const sharp = require('sharp')
const { sendWelcomeEmail, sendCancelationEmail } = require('../emails/account')

router.post('/users', async (req, res) => {
    const user = new User(req.body);
    try {
        await user.save();
        const token = await user.generateAuthToken();
        res.status(201).send({user,token});
        sendWelcomeEmail(user.name,user.email)
    }catch (e) {
        res.status(400).send(e)
    }
});


router.post('/users/login',async (req,res)=>{
    try {
        const user = await User.findByCredentials(req.body.email,req.body.password)
        const token = await user.generateAuthToken();
        res.send({user,token})
    }catch (e) {
        res.status(400).send(e)
    }
});

router.get('/users/me', auth, async (req, res) => {
    res.send(req.user)
});

router.post('/users/logout',auth,async (req,res)=>{
    try {
        req.user.tokens = req.user.tokens.filter((token)=>{
            return token.token !== req.token
        })
        await req.user.save()
        res.send()
    }catch (e) {
        res.status(500).send()
    }
})

router.post('/users/logoutAll',auth,async (req,res)=>{
    try {
        req.user.tokens = []
        await req.user.save()
        res.send()
    }catch (e) {
        res.status(500).send()
    }
})

router.patch('/users/me',auth,async (req,res)=>{
    const updates = Object.keys(req.body)
    const allowedupdates = ['name','email','password','age']
    const isValidOperation = updates.every((update)=> allowedupdates.includes(update))
    if(!isValidOperation){
        return res.status(400).send({errors:"Invalid Updates"})
    }

    try {
        updates.forEach((update)=> req.user[update] = req.body[update]);
        await req.user.save();
        res.send(req.user);
    }catch (e) {
        res.status(400).send(e);
    }
})
router.delete('/users/me',auth,async (req,res)=>{
    try {
        sendCancelationEmail(req.user.name,req.user.email)
        await req.user.remove()
        res.status(200).send(req.user);
    }catch (e) {
        res.status(500).send();
    }
})

const upload = multer({
    limits: {
        fileSize: 1048576
    },
    fileFilter(req, file, cb) {
        if(!file.originalname.match(/\.(jpg|jpeg|png)$/)){
            return cb(new Error('Please Upload An Image For Avatar'))
        }
        cb(undefined,true)
    }
})
router.post('/users/me/avatar',auth, upload.single('avatar'),async (req,res)=>{
    const buffer = await sharp(req.file.buffer).resize({width:250,height:250}).png().toBuffer()
    req.user.avatar = buffer
    await req.user.save()
    res.send();
},(error,req,res,next)=>{
    res.status(400).send({error: error.message})
})

router.delete('/users/me/avatar',auth,async (req,res)=>{
    req.user.avatar = undefined;
    await req.user.save()

    res.status(200).send();
})

router.get('/users/:id/avatar',async (req,res)=>{
    try {
        const user = await User.findById(req.params.id)
        if(!user || !user.avatar){
            throw new Error()
        }
        res.set('Content-Type','image/png')
        res.send(user.avatar)
    }catch (e) {
        res.status(404).send();
    }
})

module.exports = router