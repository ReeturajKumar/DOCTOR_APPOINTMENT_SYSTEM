import React from 'react';
import { Form, Input, message } from 'antd';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { showLoading, hideLoading } from '../redux/features/alertSlice';
import axios from 'axios';

const Loginpage = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    // ...

const onFinishHandler = async (values) => {
    try {
        dispatch(showLoading());
        const res = await axios.post('http://localhost:8080/api/v1/user/login', values);
        dispatch(hideLoading());

        if (res.data.success) {
            localStorage.setItem("token", res.data.token);
            message.success("Login Successfully");
            navigate('/');
        } else {
            message.error(res.data.message || "Login failed");
        }
    } catch (error) {
        dispatch(hideLoading());
        console.error(error);

        if (error.response) {
            if (error.response.status === 401) {
                message.error('Please Check Your Email or Password');
            } else if (error.response.status === 500) {
                message.error('Server error. Please try again later.');
            } else {
                message.error('An error occurred. Please try again.');
            }
        } else if (error.request) {
            message.error('No response from the server. Please try again later.');
        } else {
            message.error('Something Went Wrong');
        }
    }
};

// ...


    return (
        <div className='form-container'>
            <Form layout='vertical' onFinish={onFinishHandler} className='register-form'>
                <h1 className='text-center'>Login Form</h1>
                <Form.Item label="Email" name="email" rules={[{ type: 'email', message: 'Please enter a valid email' }]}>
                    <Input type='email' />
                </Form.Item>
                <Form.Item label="Password" name="password" rules={[{ message: 'Please enter your password' }]}>
                    <Input type='password' />
                </Form.Item>
                <Link to="/register" className='m-4'>Sign Up</Link>
                <button className='btn btn-primary' type='submit'>Login</button>
            </Form>
        </div>
    );
};

export default Loginpage;
