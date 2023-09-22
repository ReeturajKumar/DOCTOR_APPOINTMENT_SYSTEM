import React, { useState, useEffect } from 'react';
import Layout from '../components/Layout';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { DatePicker, TimePicker, message, notification } from 'antd';
import moment from 'moment';
import { useDispatch, useSelector } from 'react-redux';
import { hideLoading, showLoading } from '../redux/features/alertSlice';

export const BookingPage = () => {
  const { user } = useSelector((state) => state.user);
  const params = useParams();
  const [doctors, setDoctors] = useState([]);
  const [date, setDate] = useState(); 
  const [time, setTime] = useState(); 
  const [paymentCompleted, setPaymentCompleted] = useState(false);

  const dispatch = useDispatch();

  const getUserdata = async () => {
    try {
      const res = await axios.post(
        'http://localhost:8080/api/v1/doctor/getDoctorById',
        { doctorId: params.doctorId },
        {
          headers: {
            Authorization: 'Bearer ' + localStorage.getItem('token'),
          },
        }
      );
      if (res.data.success) {
        setDoctors(res.data.data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleBooking = async () => {
    try {
      dispatch(showLoading());
      const res = await axios.post(
        'http://localhost:8080/api/v1/user/book-appointment',
        {
          doctorId: params.doctorId,
          userId: user._id,
          doctorInfo: doctors,
          userInfo: user,
          date: date,
          time: time,
          name: user.name,
          doctorsName: doctors.name
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
      }
    } catch (error) {
      dispatch(hideLoading());
      console.log(error);
    }
  };

  const showPaymentSuccessMessage = () => {
    notification.success({
      message: 'Payment Successful',
      description: 'Your payment has been successfully processed.',
    });
  };

  const handlePaymentComplete = () => {
   
    if (date && time) {
      setPaymentCompleted(true);
      showPaymentSuccessMessage();
    } else {
      notification.error({
        message: 'Incomplete Information',
        description: 'Please select both date and time before completing the payment.',
      });
    }
  };

  useEffect(() => {
    getUserdata();
  }, []);

  return (
    <Layout>
      <h3 className="text-center">Booking Page</h3>
      <div className="container m-4">
        {doctors && (
          <div>
            <h4> Doctor Name : - {doctors.firstName} {doctors.lastName} </h4>
            <h4> Fees Per Consaltation : - {doctors.feesPerConsaltation} </h4>
            <h4> Phone Number : - {doctors.phone} </h4>
            {doctors && doctors.timings && (
              <h4> Timings: {moment(doctors.timings[0], 'HH:mm').format('HH:mm A')} -{' '}
              {moment(doctors.timings[1], 'HH:mm').format('HH:mm A')}
              </h4>
            )}

            <div className="d-flex flex-column w-50">
              <DatePicker
                className="m-2"
                format="DD-MM-YYYY"
                value={date} 
                onChange={(value) => {
                  console.log('Date selected:', value);
                  setDate(value);
                }}
                disabledDate={(currentDate) => {
                  return currentDate && currentDate < moment().startOf('day');
                }}
              />

              <TimePicker
                format="HH:mm"
                className="m-2"
                value={time} 
                onChange={(value) => {
                  console.log('Time selected:', value);
                  setTime(value);
                }}
              />

              {paymentCompleted ? (
                <button className="btn btn-dark mt-2" onClick={handleBooking}>
                  Book Now
                </button>
              ) : (
                <button className="btn btn-primary mt-2" onClick={handlePaymentComplete}>
                  Complete Payment
                </button>
              )}
            </div>
          </div>
        )}
      </div>
    </Layout>
  );
};
