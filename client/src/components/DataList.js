import axios from 'axios'
import React,{useEffect, useState}  from 'react'
import DataItem from './DataItem'
import Loader from './Loader'

const DataList = ({currentUser,temp}) => {

    const [temp2, settemp2] = useState(false)
    const [datalist, setdatalist] = useState([])
    const [, seterror] = useState(null)
    const [, setalert] = useState(null)
    const [loading, setloading] = useState(null)
    const [success, setsuccess] = useState(null)

    useEffect(() => {
        const getdata=async ()=>{        
            const config = {
                headers: {
                'Content-type':'application/json',
                Authorization:`Bearer ${currentUser.token}` 
                },
            }
            try{
                setloading(true)
                const {data}=await axios.get('http://localhost:5000/api/data',config)
                setsuccess(data.success)
                setdatalist(data.data)
                setalert(data.message)
                setloading(false)
            }catch(e){
                console.log(e)
                seterror('Unable to Load')
                setloading(false)
            }
        }
        getdata()
        
        // eslint-disable-next-line
    }, [temp,temp2])

    return (
        <>
            {
                loading?<Loader></Loader>:
                !success?<div>Failed to load</div>:
                <div className="list">
                <ul>
                    {datalist.map(dataitem=><DataItem key={dataitem.id} currentUser={currentUser} dataitem={dataitem} temp2={temp2} settemp2={settemp2}></DataItem>)}
                </ul>
                </div>
            }
        </>
    )
}

export default DataList