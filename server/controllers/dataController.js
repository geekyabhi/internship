const Data=require('../models/dataModel')

const addData=async(req,res)=>{
    try{
        const {userName,mobileNumber,email,address}=req.body
        const user=req.user._id
        const obj=new Data({userName,mobileNumber,email,address,user})
        const createdData=await obj.save()
        res.status(201).json({success:true,message:'Data created',data:createdData})
    }catch(e){
        console.log(e)
        res.status(400).json({success:false,message:'Failed to create',error:`${e}`})
    }
}

const getAllData=async(req,res)=>{
    try{
        const user=req.user._id
        const data=await Data.find({user})
        res.status(201).json({success:true,message:'Data fetched',data:data})
    }catch(e){
        console.log(e)
        res.status(400).json({success:false,message:'Failed to load data',error:`${e}`})
    }
}

const getData=async(req,res)=>{
    try{
        const _id=req.params.id
        const user=req.user._id
        const data=await Data.find({user,_id})
        if(!data){
            res.status(400).json({success:false,message:'Data not found',error:`${e}`})
            return
        }
        res.status(201).json({success:true,message:'Data Found',data:data})
    }catch(e){
        console.log(e)
        res.status(400).json({success:false,message:'Failed to load data',error:`${e}`})
    }
}

const deleteData=async(req,res)=>{
    try{
        const _id=req.params.id
        const user=req.user._id
        const data=await Data.findOne({user,_id})
        if(!data){
            res.status(400).json({success:false,message:'Data not found',error:`${e}`})
            return
        }else{
            await Data.findOneAndDelete({user,_id})
        }
        res.status(201).json({success:true,message:'Data deleted',data:data})
    }catch(e){
        console.log(e)
        res.status(400).json({success:false,message:'Failed to delete',error:`${e}`})
    }
}


module.exports={addData,getAllData,getData,deleteData}