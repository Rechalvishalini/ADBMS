import React, { useState } from 'react'
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Axios from 'axios'
import { useNavigate } from 'react-router-dom'
import imgbg from '../../Source/Images/Login/bg.jpg'
import './style.css'

const RegiBody = () => {
    const [userName, setUserName] = useState('');
    const [nic, setNic] = useState('');
    const [dob, setDOB] = useState('');
    const [email, setEmail] = useState('');
    const [gender, setGender] = useState('');
    const [mobile, setMobile] = useState('');
    const [address, setAddress] = useState('');

    const registerHandler = (e) => {
        (async () => {
            await fetch('http://localhost:8080/addCustomer', {
                method: 'POST',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(
                    {
                        "cus_name": userName,
                        "phone": mobile,
                        "address": address,
                        "email": email,
                        "nic": nic,
                        "gender": gender,
                        "dob": dob
                    }
                )
            });
            
        })();
        alert("User Created");
        window.location.reload();
    }
    return (
        <div className='row '>
            <div className='col-md-6'>
                <h1 className='theTopic'>SIGNUP</h1>
                <img
                    src={imgbg}
                    alt="loginBg"
                    className='signImg'
                />

            </div>
            <div className='col-md-6 signSet'>
                <div className='row'>
                    <h3>REGISTER</h3>
                </div>
                <div className='row mx-5 my-3'>
                    <div className='container'>
                        <Form autoComplete='false'>

                            <div className='row'>
                                <div className='col-md-6'>
                                    <Form.Group className="mb-3 d-flex flex-column align-items-start" controlId="formBasicEmail">
                                        <Form.Label>Name</Form.Label>
                                        <Form.Control
                                            type="text"
                                            placeholder="Enter username "
                                            name="uname"
                                            onChange={(e) => {
                                                setUserName(e.target.value)
                                            }}
                                        />
                                        <Form.Text className="text-muted">
                                            You have to use this for login
                                        </Form.Text>
                                    </Form.Group>

                                </div>
                                <div className='col-md-6'>

                                    <Form.Group className="mb-3 d-flex flex-column align-items-start" controlId="formBasicEmail">
                                        <Form.Label>NIC</Form.Label>
                                        <Form.Control
                                            type="text"
                                            placeholder="Enter your NIC"
                                            name="nic"
                                            onChange={(e) => {
                                                setNic(e.target.value)
                                            }}
                                        />
                                        <Form.Text className="text-muted">
                                            You have to use this for login
                                        </Form.Text>
                                    </Form.Group>
                                </div>
                            </div>
                            <div className='row'>
                                <div className='col-md-6'>
                                    <Form.Group className="mb-3 d-flex flex-column align-items-start" controlId="formBasicPassword">
                                        <Form.Label>DOB</Form.Label>
                                        <input
                                            type="date"
                                            className='form-control'
                                            onChange={(e) => {
                                                setDOB(e.target.value)
                                            }}
                                        />
                                        <Form.Text className="text-muted">
                                            SELECT YOUR Date of Birth
                                        </Form.Text>
                                    </Form.Group>

                                </div>
                                <div className='col-md-6'>
                                    <div className='row'>
                                        <Form.Label>Gender</Form.Label>
                                        <div className='col-md-12'>
                                            <select className='form-control' name='categ'
                                                onChange={(e) => {
                                                    setGender(e.target.value)
                                                }}
                                            >
                                                <option value='M'>Male</option>
                                                <option value='F'>Female</option>
                                            </select>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className='row'>
                                <div className='col-md-6'>
                                    <Form.Group className="mb-3 d-flex flex-column align-items-start" controlId="formBasicPassword">
                                        <Form.Label>Email</Form.Label>
                                        <Form.Control
                                            type="email"
                                            placeholder="email"
                                            name="email"
                                            onChange={(e) => {
                                                setEmail(e.target.value)
                                            }}
                                        />
                                        <Form.Text className="text-muted">
                                            Enter a valid email
                                        </Form.Text>
                                    </Form.Group>
                                </div>
                                <div className='col-md-6'>
                                    <Form.Group className="mb-3 d-flex flex-column align-items-start" controlId="formBasicPassword">
                                        <Form.Label>Mobile</Form.Label>
                                        <input
                                            type="number"
                                            placeholder="0777..."
                                            name="mobile"
                                            className='form-control'
                                            onChange={(e) => {
                                                setMobile(e.target.value)
                                            }}
                                        />
                                        <Form.Text className="text-muted">
                                            Enter a valid mobile
                                        </Form.Text>
                                    </Form.Group>
                                </div>
                            </div>
                            <Form.Group className="mb-3 d-flex flex-column align-items-start" controlId="formBasicPassword">
                                <Form.Label>Address</Form.Label>
                                <Form.Control
                                    type="text"
                                    placeholder="Address"
                                    name="address"
                                    onChange={(e) => {
                                        setAddress(e.target.value)
                                    }}
                                />
                                <Form.Text className="text-muted">
                                    Enter a valid address
                                </Form.Text>
                            </Form.Group>
                            <div className='row '>
                                <div className='col-md-12 d-flex flex-row align-items-end'>
                                    <Button variant="danger" className='mx-2' type="reset">
                                        RESET
                                    </Button>
                                    <Button variant="primary" type="button" onClick={registerHandler}>
                                        SIGNUP
                                    </Button>
                                </div>
                            </div>

                        </Form>
                    </div>
                </div>
            </div>

        </div>
    )
}

export default RegiBody
