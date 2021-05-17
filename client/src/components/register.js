import React, { useState} from 'react'
import Loader from '../components/Loader'
import { Col, Row,Button, Form, Alert} from 'react-bootstrap'
import { Link ,useHistory} from 'react-router-dom'
const Register = () => {

    
    const [name, setname] = useState('')
    const [email,setEmail]=useState('')
    const [password,setPassword]=useState('')
    const [confirmPassword,setConfirmPassword]=useState('')
    const [error, seterror] = useState(null)
    const [loading, setloading] = useState(false)

    const submitHandler=()=>{

    }

    return (
        <div className="wrapper">
            <div>
                <h1>Sign Up</h1>
            </div>
            {error && <Alert variant="danger">{error}</Alert>}
            {loading && <Loader></Loader>}
            <Form onSubmit={submitHandler}>
                <Form.Group controlId='name'>
                    <Form.Control 
                        type='text' 
                        placeholder="Enter Name" 
                        value={name} 
                        onChange={(e)=>setname(e.target.value)}
                    >
                    </Form.Control>
                </Form.Group>
                <Form.Group controlId='email'>
                    <Form.Control 
                        type='email' 
                        placeholder="Enter Email" 
                        value={email} 
                        onChange={(e)=>setEmail(e.target.value)}
                    >
                    </Form.Control>
                </Form.Group>
                <Form.Group controlId='password'>
                    <Form.Control 
                        type='password' 
                        placeholder="Enter password" 
                        value={password} 
                        onChange={(e)=>setPassword(e.target.value)}
                    >
                        
                    </Form.Control>
                </Form.Group>
                <Form.Group controlId='confirmpassword'>
                    <Form.Control 
                        type='password' 
                        placeholder="Renter password" 
                        value={confirmPassword} 
                        onChange={(e)=>setConfirmPassword(e.target.value)}
                    >
                    </Form.Control>
                </Form.Group>
                <Button type="submit" variant="primary" disabled={loading} >Sign In</Button>
            </Form>
            <Row className="py-3">
                <Col>
                    Already have an account ?{' '} 
                    <Link to='/login'>Login</Link>
                </Col>
            </Row>
        </div>          
    )
}

export default Register
