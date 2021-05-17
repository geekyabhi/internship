const mongoose =require('mongoose')
const DataSchema = mongoose.Schema(
    {
        user:{
            type: mongoose.Schema.Types.ObjectId,
            required: true,
            ref: 'User',
        },
        userName:{
            type: String,
            required: true,
        },
        mobileNumber:{
            type: String,
            required: true,
        },
        email:{
            type: String,
            required: true,
        },
        address:{
            type: String,
            required: true,
        }
    },
    {
        timestamps: true,
    }
)

const Data = mongoose.model('Data', DataSchema)
module.exports=Data