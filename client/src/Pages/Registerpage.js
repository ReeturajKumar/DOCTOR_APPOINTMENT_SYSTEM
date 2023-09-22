import React from 'react';
import '../Styles/style.css';
import { Form, Input, message } from 'antd';
import { useDispatch } from 'react-redux';
import { showLoading, hideLoading } from '../redux/features/alertSlice';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';

const Registerpage = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const onFinishHandler = async (values) => {
        const { email } = values;
    
        if (!email || !email.endsWith('@gmail.com')) {
            message.error('Please enter a valid Gmail address to register.');
            return;
        }
        try {
            dispatch(showLoading());
            const res = await axios.post('http://localhost:8080/api/v1/user/register', values);
            dispatch(hideLoading());
            if (res.data.success) {
                message.success('Register Successfully');
                navigate('/login');
            } else {
                message.error(res.data.message);
            }
        } catch (error) {
            dispatch(hideLoading());
            console.log(error);
            message.error('Something Went Wrong');
        }
    };

    return (
        <>
            <div className='form-container'>
                <Form layout='vertical' onFinish={onFinishHandler} className='register-form'>
                    <h1 className='text-center'> Create an Account</h1>
                    <Form.Item label='Name' name='name'>
                        <Input type='text' required />
                    </Form.Item>
                    <Form.Item label='Email' name='email'>
                        <Input type='email' required />
                    </Form.Item>
                    <Form.Item label='Password' name='password'>
                        <Input type='password' required />
                    </Form.Item>
                    <Link to='/login' className='m-4'>
                        Sign In
                    </Link>
                    <button className='btn btn-primary' type='submit'>
                        Register
                    </button>
                </Form>
            </div>
        </>
    );
};

export default Registerpage;
