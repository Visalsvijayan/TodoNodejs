const express=require('express')
const router=express.Router()
const Input=require('../model/Input.js')
router.post('/add',async(req,res)=>{
    const {data}=req.body 
    const newInput=new Input({
        text:data,
        date:Date.now()
    })
    await newInput.save()
    res.status(200).json({success:true})

})

router.delete('/delete/:id',async(req,res)=>{
    const {id}=req.params;
    
    await Input.findByIdAndDelete(id)
    res.status(200).json({success:true})

})

router.put('/edit/:id',async(req,res)=>{
    const {id}=req.params;
    
    const {text}=req.body
    const update=await Input.findByIdAndUpdate(id,{text:text,date:new Date()},{new:true})
    if(!update){
       return res.status(404).json({success:false})

    }
    res.status(200).json({success:true})
})

router.put('/toggle/:id',async(req,res)=>{
    const {id}=req.params;
    const {completed}=req.body;
    const update=await Input.findByIdAndUpdate(id,{completed:completed})
    if(!update){
        return res.status(404).json({success:false})
    }
    res.status(200).json({success:true})
})
module.exports=router