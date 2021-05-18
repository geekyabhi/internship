import React, { useState } from 'react'
import axios from 'axios'
const DataItem = ({currentUser,dataitem,temp2,settemp2}) => {
    const [alert, setalert] = useState(null)
    const [loading, setloading] = useState(null)
    const [success, setsuccess] = useState(null)
    const deleteItem=async()=>{
        const config = {
            headers: {
            'Content-type':'application/json',
            Authorization:`Bearer ${currentUser.token}` 
            },
        }
        try{    
            setloading(true)
            const {data}=await axios.delete(`http://localhost:5000/api/data/${dataitem._id}`,config)
            setsuccess(data.success)
            setalert(data.message)
            setloading(false)
            if(temp2)
            settemp2(false)
            else
            settemp2(true)
        }catch(e){
            console.log(e)
            setloading(false)
            setalert('Some error occured')
        }
    }
    const {userName,mobileNumber,email,address}=dataitem
    return (
        <div className="dataitem-wrapper">
            <div className="details">
                <div className="detail">
                    <div className="question">Username</div>
                    <div className="answer">{userName}</div>
                </div>
                <div className="detail">
                    <div className="question">Mobile Number</div>
                    <div className="answer">{mobileNumber}</div>
                </div>
                <div className="detail">
                    <div className="question">Email</div>
                    <div className="answer">{email}</div>
                </div>
                <div className="detail">
                    <div className="question">Address</div>
                    <div className="answer">{address}</div>
                </div>
            </div>
            <div className="deleteButton">
                {success===false?<div className="inform fail">{alert}</div>:null}
                <button onClick={deleteItem} disabled={loading}>Delete</button>
            </div>
        </div>
    )
}

export default DataItem
