import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Layout from '../components/Layout';
import { Row } from 'antd';
import DoctorList from '../components/DoctorList';

const Homepage = () => {


  const [doctors , setDoctors] = useState([])
  const getUserdata = async () => {
    try {
      const res =  await  axios.get('http://localhost:8080/api/v1/user/getAllDoctors',
       {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
      }
      );
      if(res.data.success){
        setDoctors(res.data.data)
      }
    } catch (error) {
      console.log(error)
    }
  }
  useEffect(() => {
    getUserdata()
  }, [])


  
  return (
    <Layout>
      <h1 className='text-center'>Homepage</h1>
      <div>
      <Row>
        {doctors && doctors.map(doctor => (
          <DoctorList doctor={doctor} />
        ))}
      </Row>
      </div>
      </Layout>
      
  );
};

export default Homepage;
