const express=require('express')
const mongoose=require('mongoose')
const ejs=require('ejs')
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

app.post('/add',async(req,res)=>{
    const {data}=req.body 
    const newInput=new Input({
        text:data,
        date:Date.now()
    })
    await newInput.save()
    res.status(200).json({success:true})

})

app.delete('/delete/:id',async(req,res)=>{
    const {id}=req.params;
    
    await Input.findByIdAndDelete(id)
    res.status(200).json({success:true})

})

app.put('/edit/:id',async(req,res)=>{
    const {id}=req.params;
    
    const {text}=req.body
    const update=await Input.findByIdAndUpdate(id,{text:text,date:new Date()},{new:true})
    if(!update){
       return res.status(404).json({success:false})

    }
    res.status(200).json({success:true})
})

app.put('/toggle/:id',async(req,res)=>{
    const {id}=req.params;
    const {completed}=req.body;
    const update=await Input.findByIdAndUpdate(id,{completed:completed})
    if(!update){
        return res.status(404).json({success:false})
    }
    res.status(200).json({success:true})
})
app.listen(3000,()=>console.log('server started'))


