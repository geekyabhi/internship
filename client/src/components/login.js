import React, { useState } from 'react'
import { Col, Row,Button, Form, Alert} from 'react-bootstrap'
import { Link ,useHistory} from 'react-router-dom'

const Login = () => {

    const [email, setemail] = useState(null)
    const [password, setpassword] = useState(null)
    const [error, seterror] = useState(null)
    const [loading, setloading] = useState(null)

    const submitHandler=async (e)=>{
        e.preventDefault()
        try{
            setloading(true)
            const data=await axios.post('http://localhost:5000/api/users/login',{email,password})
            data.data?localStorage.setItem('user',JSON.stringify(data.data)):localStorage.setItem('user','')
            seterror(data.error)
            setloading(false)
            history.push('/')
        }catch(e){
            console.log(e)
            setloading(false)
            seterror('Error in login',e)
        }
    }

    return (
        <div className="wrapper">
            <div>
                <h1>Sign Up</h1>
            </div>
            <Form onSubmit={submitHandler}>
                    <Form.Group controlId='email' >
                        <Form.Control 
                            type='email' 
                            placeholder="Enter Email" 
                            value={email} 
                            onChange={(e)=>setemail(e.target.value)}
                        >
                        </Form.Control>
                    </Form.Group>
                    <Form.Group controlId='password'>
                        <Form.Control 
                            type='password' 
                            placeholder="Enter password" 
                            value={password} 
                            onChange={(e)=>setpassword(e.target.value)}
                        >
                            
                        </Form.Control>
                    </Form.Group>
                    <Button type="submit" variant="primary" disabled={loading}>Sign In</Button>
                </Form>
                <Row className="py-3">
                    <Col>
                        New Customer ?{' '} 
                        <Link to='/register'>Register</Link>
                    </Col>
                </Row>
        </div>
    )
}

export default Login
