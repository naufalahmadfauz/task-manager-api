const app = require('./app')

const port = process.env.PORT;

app.listen(port,()=>{
    console.log('Server is up on port',port);
});



























// const multer = require('multer')
// const upload = multer({
//     dest:'images',
//     limits : {
//         fileSize: 1048576
//     },
//     fileFilter(req,file,cb){
//
//         if(!file.originalname.match(/\.(doc|docx)$/)){
//             return cb(new Error('Please Upload A Word Document!'))
//         }
//         cb(undefined,true)
//
//         // cb(new Error('File Must Be PDF'))
//         // cb(undefined,true)
//         // cb(undefined,false)
//     }
// })
//
// app.post('/upload',upload.single('upload'),(req,res)=>{
//     res.send()
// },(error,req,res,next)=>{
//     res.status(400).send({error:error.message})
// })