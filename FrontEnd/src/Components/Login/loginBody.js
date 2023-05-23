import React, { useState } from 'react'
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Axios from 'axios'
import { useNavigate } from 'react-router-dom'
import imgbg from '../../Source/Images/Login/bg.jpg'
import './style.css'
import md5 from 'md5'

const LoginBody = () => {
    const [userName, setUserName] = useState('');
    const [password, setPassword] = useState('');
    const [userDetails, setUserDetails] = useState([]);
    const [loginStatus, setLoginStatus] = useState("");
    const nav = useNavigate();

    const loginHandler = (e) => {
        Axios.get(`http://localhost:8080/getByUser/${userName}`).then((response) => {
            setUserDetails(response.data);
        });
        userDetails.map((val)=>{
            if(userName === val.name){
                if(md5(password) === val.password){
                    if(val.post === 'admin'){
                        setLoginStatus(userName);
                        let theUser = localStorage.setItem('theUserName',userName);
                        nav('/AdminDash');
                    }else{
                        setLoginStatus(userName);
                        let theUser = localStorage.setItem('theUserName',userName);
                        let theId = localStorage.setItem('theId',val.cid);
                        nav('/');
                    }
                }else{
                    alert('password is wrong');
                }
            }else{
                alert('User name is wrong');
            }
        })
    }
    return (
        <div className='row '>
            <div className='col-md-6 loginSet'>
                <div className='row'>
                    <h3>LOGIN</h3>
                </div>
                <div className='row mx-5 my-3 d-flex flex-column justify-content-end align-items-end'>
                    <div className='container'>
                        <Form aut>
                            <Form.Group className="mb-3 mb-3 d-flex flex-column align-items-start" controlId="formBasicEmail">
                                <Form.Label>User Name</Form.Label>
                                <Form.Control
                                    type="text"
                                    placeholder="Enter username "
                                    name="uname"
                                    onChange={(e) => {
                                        setUserName(e.target.value)
                                    }}
                                />
                                <Form.Text className="text-muted">
                                    We'll never share your email with anyone else.
                                </Form.Text>
                            </Form.Group>

                            <Form.Group className="mb-3 mb-3 d-flex flex-column align-items-start" controlId="formBasicPassword">
                                <Form.Label>Password</Form.Label>
                                <Form.Control
                                    type="password"
                                    placeholder="Password"
                                    name="pw"
                                    onChange={(e) => {
                                        setPassword(e.target.value)
                                    }}
                                />
                            </Form.Group>
                            <div className='row'>
                                <div className='col-md-12 mb-3 d-flex flex-row align-items-end'>
                                    <Button variant="danger" className='mx-2' type="reset">
                                        RESET
                                    </Button>
                                    <Button variant="primary" type="button" onClick={loginHandler}>
                                        LOGIN
                                    </Button>
                                </div>
                            </div>

                        </Form>
                    </div>
                </div>
            </div>
            <div className='col-md-6'>
                <h1 className='theTopicLogin'>LOGIN</h1>
                <img
                    src={imgbg}
                    alt="loginBg"
                    className='loginImg'
                />
            </div>
        </div>
    )
}

export default LoginBody
