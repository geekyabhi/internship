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
        let error=`${e}`.split(":")
        let message
        if(error[0]==='Error'){
            message=error[1]
        }else{
            message='Failed to create'
        }
        res.json({success:false,message:message})
        res.status(400)
    }
}

const getAllData=async(req,res)=>{
    try{
        const user=req.user._id
        const data=await Data.find({user})
        res.status(201).json({success:true,message:'Data fetched',data:data})
    }catch(e){
        console.log(e)
        let error=`${e}`.split(":")
        let message
        if(error[0]==='Error'){
            message=error[1]
        }else{
            message='Failed to load data'
        }
        res.json({success:false,message:message})
        res.status(400)
    }
}

const getData=async(req,res)=>{
    try{
        const _id=req.params.id
        const user=req.user._id
        const data=await Data.find({user,_id})
        if(!data){
            res.json({success:false,message:'Data not found',error:`${e}`})
            return
        }
        res.status(201).json({success:true,message:'Data Found',data:data})
    }catch(e){
        console.log(e)
        let error=`${e}`.split(":")
        let message
        if(error[0]==='Error'){
            message=error[1]
        }else{
            message='Failed to load data'
        }
        res.json({success:false,message:message})
        res.status(400)
    }
}

const deleteData=async(req,res)=>{
    try{
        const _id=req.params.id
        const user=req.user._id
        const data=await Data.findOne({user,_id})
        if(!data){
            res.json({success:false,message:'Data not found',error:`${e}`})
            return
        }else{
            await Data.findOneAndDelete({user,_id})
        }
        res.status(201).json({success:true,message:'Data deleted',data:data})
    }catch(e){
        console.log(e)
        let error=`${e}`.split(":")
        let message
        if(error[0]==='Error'){
            message=error[1]
        }else{
            message='Failed to delete'
        }
        res.json({success:false,message:message})
        res.status(400)
    }
}


module.exports={addData,getAllData,getData,deleteData}