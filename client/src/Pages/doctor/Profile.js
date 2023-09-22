import React, { useEffect, useState } from 'react'
import Layout from './../../components/Layout';
import {useSelector, useDispatch } from 'react-redux';
import axios from 'axios';
import { useNavigate, useParams} from 'react-router-dom'
import { } from 'react-router-dom';
import { Input,Col,Form, Row, TimePicker,message} from 'antd';
import { hideLoading, showLoading } from '../../redux/features/alertSlice';
import moment from 'moment'

const Profile = () => {
    const {user} = useSelector(state => state.user)
    const [doctor, setDoctor] = useState(null)
    const params = useParams()
    const dispatch = useDispatch()
    const navigate = useNavigate()


    // update doctor profile
    const handleFinish = async(values) => {
        try {
            dispatch(showLoading())
            const res = await axios.post('http://localhost:8080/api/v1/doctor/updateProfile', 
            {...values, userId:user._id,
                timings:[
                    moment(values.timings[0]).format("HH:mm"),
                    moment(values.timings[1]).format("HH:mm"),
                ]
            },{
                headers:{
                    Authorization: `Bearer ${localStorage.getItem('token')}`
                }
            }
            )
            dispatch(hideLoading())
            if(res.data.success){
                message.success(res.data.message)
                navigate('/')
            }else{
                message.error(res.data.success)
            }
        } catch (error) {
            dispatch(hideLoading())
            console.log(error)
            message.error('Something Went Wrong')
        }
    }
    //getDoc Details
    const getDoctorInfo = async () => {
        try {
            const res = await axios.post('http://localhost:8080/api/v1/doctor/getDoctorInfo',
            {userId: params.id},
            {
                headers:{
                    Authorization: `Bearer ${localStorage.getItem('token')}`
                }})
                if(res.data.success){
                    setDoctor(res.data.data)
                }
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        getDoctorInfo();
    }, [])
  return (
    <Layout>
        <h1>Manage Profile</h1>
        {doctor && (
             <Form layout='vertical' onFinish={handleFinish} className='m-5' initialValues={{
                ...doctor,
                timings:[
                    moment(doctor.timings[0], "HH:mm"),
                    moment(doctor.timings[1], "HH:mm")
                ]
             }}>
             <h5 className='text-dark'>Personal Details</h5>
                 <Row gutter={20}>
                     <Col xs={24} md={24} lg={8}>
                         <Form.Item label="First Name" name="firstName">
                             <Input type='text' placeholder='Enter Your First Name' required />
                         </Form.Item>
                     </Col>
                     <Col xs={24} md={24} lg={8}>
                         <Form.Item label="Last Name" name="lastName">
                             <Input type='text' placeholder='Enter Your Last Name' required />
                         </Form.Item>
                     </Col>
                     <Col xs={24} md={24} lg={8}>
                         <Form.Item label="Phone Number" name="phone">
                             <Input type='text' placeholder='Enter Your Phone Number' required />
                         </Form.Item>
                     </Col>
                     <Col xs={24} md={24} lg={8}>
                         <Form.Item label="Address" name="address">
                             <Input type='text' placeholder='Enter Your Address' required />
                         </Form.Item>
                     </Col>
                     <Col xs={24} md={24} lg={8}>
                         <Form.Item label="Email" name="email">
                             <Input type='text' placeholder='Enter Your Email' required />
                         </Form.Item>
                     </Col>
                 </Row>
                 <h5 className='text-dark'>Professional Details</h5>
                 <Row gutter={20}>
                     <Col xs={24} md={24} lg={8}>
                         <Form.Item label="Specialization" name="specialization">
                             <Input type='text' placeholder='Enter Your Specialization' required />
                         </Form.Item>
                     </Col>
                     <Col xs={24} md={24} lg={8}>
                         <Form.Item label="Experience" name="experience">
                             <Input type='text' placeholder='Enter Your Experience' required />
                         </Form.Item>
                     </Col>
                     <Col xs={24} md={24} lg={8}>
                         <Form.Item label="Fees Per Consaltation" name="feesPerConsaltation">
                             <Input type='text' placeholder='Enter Your feesPerConsaltation' required />
                         </Form.Item>
                     </Col>
                     <Col xs={24} md={24} lg={8}>
                         <Form.Item label="Adhaar Number " name="adharnumber">
                             <Input type='text' placeholder='1234-1234-1234' required />
                         </Form.Item>
                     </Col>
                     <Col xs={24} md={24} lg={8}>
                         <Form.Item label="Timeings" name="timings">
                            <TimePicker.RangePicker format="HH:mm"/>
                         </Form.Item>
                     </Col>
                 </Row>
                 <div className='d-flex justify-content-center'>
           <Col xs={12} md={12} lg={8}>
               <button className='btn btn-primary form-btn' type='submit'>Update</button>
           </Col>
         </div>
             </Form>
        )}
    </Layout>
  )
}

export default Profile