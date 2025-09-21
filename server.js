const express=require('express')
const mongoose=require('mongoose')
const ejs=require('ejs')
const todoRouter=require('./routes/myRoutes.js')
const app=express()
const Input=require('./model/Input.js')
app.use(express.json())
app.set('view engine','ejs')
app.get('/',async(req,res)=>{
    const data=await Input.find().sort({_id:-1})
    res.render('index',{data})
})

// mongoose.connect('mongodb://127.0.0.1:27017/inputDb')
// .then(()=>{
//     console.log('mongoDb connected')
// })
// .catch((err)=>{
//     console.error('mongoDb connection error:',err)
// })
mongoose.connect('mongodb+srv://testUser:test%40123@cluster0.icfsgud.mongodb.net/nodeTodo?retryWrites=true&w=majority&appName=Cluster0')
.then(()=>{
    console.log('mongoDb connected')
})
.catch((err)=>{
    console.error('mongoDb connection error:',err)
})

app.use('/',todoRouter)
app.listen(3000,()=>console.log('server started'))


