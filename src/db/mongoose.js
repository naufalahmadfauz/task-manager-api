const mongoose = require('mongoose');
const validator = require('validator');

mongoose.connect(process.env.MONGODB_URL,{useNewUrlParser:true,useCreateIndex:true});





// ,{nae:{},ds:{},dsa:{}}

//
// const task = new Tasks({description:'           Buy New Motherboard',completed:true});
// task.save().then((result)=>{console.log(task)}).catch((error)=>{console.log(error)});

// const user = new User({name:'Josh',email:'chu@gmail.com   ',age: 18,password:'satuduatigaempat      '});
// user.save().then((result)=>{console.log(user)}).catch((error)=>{console.log(error)});

// const User = mongoose.model('User',{
//     name:{
//         type:String
//     },
//     age:{
//         type:Number
//     }
// });
//
// const me =new User({name:'Naufal',age:'john'});
//
// me.save().then((result)=>{console.log(me)}).catch((error)=>{console.log('Error',error)});