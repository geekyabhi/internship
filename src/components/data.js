import React, { useState } from 'react'
import { Button, Form} from 'react-bootstrap'
import {useHistory} from 'react-router-dom'
import axios from 'axios'
import Loader from './Loader'
import DataList from './DataList'
import NavBar from './NavBar'
const Data = ({currentUser}) => {
    const history=useHistory()
    const [temp, settemp] = useState(false)
    const [email, setemail] = useState(null)
    const [userName, setuserName] = useState(null)
    const [mobileNumber, setmobileNumber] = useState(null)
    const [address, setaddress] = useState(null)
    const [alert, setalert] = useState(null)
    const [loading, setloading] = useState(null)
    const [success, setsuccess] = useState(null)

    if(!currentUser){
        history.push('/login')
    }


    const submitHandler=async (e)=>{
        e.preventDefault()
        const config = {
            headers: {
            'Content-type':'application/json',
            Authorization:`Bearer ${currentUser.token}` 
            },
        }
        try{
            setloading(true)
            // const {data}=await axios.post('http://localhost:5000/api/data',{email,userName,mobileNumber,address},config)
            const {data}=await axios.post('https://pure-river-17146.herokuapp.com/api/data',{email,userName,mobileNumber,address},config)
            
            setsuccess(data.success)
            setalert(data.message)
            setloading(false)
            if(temp)
                settemp(false)
            else
                settemp(true)
        }catch(e){
            console.log(e)
            setloading(false)
            setalert('Some error occured')
        }
    }


    return (
        <>
        <NavBar></NavBar>
        <div className="data-wrapper">
            <div className="tab1">
                <div className="table">
                    <div>
                        <h1>Add Data</h1>
                    </div>
                    {success===true?<div className="inform success">{alert}</div>:null}
                    {success===false?<div className="inform fail">{alert}</div>:null}
                    {loading && <Loader></Loader>}
                    <Form>
                        <Form.Group controlId='userName' >
                            <Form.Control 
                                type='userName' 
                                placeholder="Enter userName" 
                                value={userName} 
                                onChange={(e)=>setuserName(e.target.value)}
                            >
                            </Form.Control>
                        </Form.Group>
                        <Form.Group controlId='mobileNumber' >
                            <Form.Control 
                                type='mobileNumber' 
                                placeholder="Enter mobileNumber" 
                                value={mobileNumber} 
                                onChange={(e)=>setmobileNumber(e.target.value)}
                            >
                            </Form.Control>
                        </Form.Group>
                        <Form.Group controlId='email' >
                            <Form.Control 
                                type='email' 
                                placeholder="Enter Email" 
                                value={email} 
                                onChange={(e)=>setemail(e.target.value)}
                            >
                            </Form.Control>
                        </Form.Group>
                        <Form.Group controlId='address'>
                            <Form.Control 
                                type='address' 
                                placeholder="Enter address" 
                                value={address} 
                                onChange={(e)=>setaddress(e.target.value)}
                            >
                                
                            </Form.Control>
                        </Form.Group>
                    </Form>
                    <Button type="submit" variant="primary" disabled={loading} onClick={submitHandler}>Submit</Button>
                </div>
            </div>    
            <div class="tab2">
                {/* <h2>Data</h2> */}
                <DataList currentUser={currentUser} temp={temp}></DataList>            
            </div>
        </div>
    </>
    )
}

export default Data
