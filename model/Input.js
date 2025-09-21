const mongoose=require('mongoose')

const inputScheam=new mongoose.Schema({
    text:{type:String},
    completed:{type:Boolean,default:false},
    date:{type:Date,default:Date.now()}
})

const Input=mongoose.model('Input',inputScheam)
module.exports=Input

    