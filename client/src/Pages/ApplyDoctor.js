import React from 'react';
import Layout from '../components/Layout';
import { Col, Form, Input, Row, TimePicker, message} from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { showLoading, hideLoading } from '../redux/features/alertSlice';
import axios from 'axios';
import moment from 'moment';

const ApplyDoctor = () => {
  const { user } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Validation adhar number
  const validateAdhaarNumber = (_, value) => {
    if (value && !/^\d{12}$/.test(value)) {
      return Promise.reject();
    }
    return Promise.resolve();
  };

  // validate phone number
  const validatePhoneNumber = (_, value) => {
    if (value && !/^\d{10}$/.test(value)) {
      return Promise.reject();
    }
    return Promise.resolve();
  };


  // validating DOCTOR ID
  const validateDoctorID = (rule, value, callback) => {
    const regex = /^[A-Za-z0-9]{6}$/;
    if (!regex.test(value)) {
      callback();
    } else {
      callback();
    }
  };

  const handleFinish = async (values) => {
    try {
      dispatch(showLoading());
      const res = await axios.post(
        'http://localhost:8080/api/v1/user/apply-doctor',
        {
          ...values,
          userId: user._id,
          timings: [
            moment(values.timings[0]).format('HH:mm'),
            moment(values.timings[1]).format('HH:mm'),
          ],
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        }
      );
      dispatch(hideLoading());
      if (res.data.success) {
        message.success(res.data.message);
        navigate('/');
      } else {
        message.error(res.data.message);
      }
    } catch (error) {
      dispatch(hideLoading());
      console.error(error);
      message.error('Something Went Wrong');
    }
  };

  return (
    <Layout>
      <h1 className='text-center'>APPLY FOR DOCTOR ROLE</h1>
      <Form layout='vertical' onFinish={handleFinish} className='m-5'>
        <h5 className='text-dark'>Personal Details</h5>
        <Row gutter={20}>
          <Col xs={24} md={24} lg={8}>
            <Form.Item label="First Name" name="firstName" rules={[{ message: 'Please enter your First Name' }]}>
              <Input placeholder='Enter Your First Name' />
            </Form.Item>
          </Col>
          <Col xs={24} md={24} lg={8}>
            <Form.Item label="Last Name" name="lastName" rules={[{message: 'Please enter your Last Name' }]}>
              <Input placeholder='Enter Your Last Name' />
            </Form.Item>
          </Col>
          <Col xs={24} md={24} lg={8}>
            <Form.Item
              label="Phone Number"
              name="phone"
              rules={[
                { validator: validatePhoneNumber },
              ]}
            >
              <Input placeholder="Enter Your Phone Number" />
            </Form.Item>
          </Col>
          <Col xs={24} md={24} lg={8}>
            <Form.Item label="Address" name="address" rules={[{message: 'Please enter your Address' }]}>
              <Input placeholder='Enter Your Address' />
            </Form.Item>
          </Col>
          <Col xs={24} md={24} lg={8}>
            <Form.Item label="Email" name="email" rules={[{message: 'Please enter your Email' }]}>
              <Input placeholder='Enter Your Email' />
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
                <Form.Item
                label="Adhaar Number"
                name="adharnumber"
                rules={[
                { message: 'Please enter Adhaar Number' },
                { validator: validateAdhaarNumber },
                ]}
                >
                <Input type="text" placeholder="123412341234" required />
                </Form.Item>
            </Col>
            <Col xs={24} md={24} lg={8}>
        <Form.Item label="Doctor ID" name="unic"
        rules={[{
              validator: validateDoctorID,
            },]}
        >
        <Input type="text" placeholder="Enter Your Doctor ID" />
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
          <button className='btn btn-primary form-btn' type='submit'>Submit</button>
      </Col>
    </div>
        </Form>
    </Layout>
  );
};

export default ApplyDoctor;
