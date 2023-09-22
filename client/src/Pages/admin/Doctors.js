import React, { useEffect, useState } from 'react';
import Layout from './../../components/Layout';
import axios from 'axios';
import { Table, message } from 'antd';

const Doctors = () => {
  const [doctors, setDoctors] = useState([]);

  // Get doctors
  const getDoctors = async () => {
    try {
      const response = await axios.get('http://localhost:8080/api/v1/admin/getAllDoctors', {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });

      const { success, data } = response.data;

      if (success) {
        setDoctors(data);
      } else {
        message.error('Failed to fetch doctors');
      }
    } catch (error) {
      console.error('Error fetching doctors:', error);
      message.error('Something went wrong');
    }
  };

  // handle account
  const handleAccountStatus = async (record, status) => {
    try {
      const res = await axios.post('http://localhost:8080/api/v1/admin/changeAccountStatus',
        {
          doctorId: record._id,
          userId: record.userId,
          status: status,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        }
      );
      if (res.data.success) {
        message.success(res.data.message);
      }
    } catch (error) {
      message.error('Something Went Wrong');
    }
  };

  useEffect(() => {
    getDoctors();
    // Include getDoctors as a dependency to prevent multiple API requests.
  }, []);

  const columns = [
    {
      title: 'Name',
      dataIndex: 'name',
      render: (text, record) => (
        <span>{`${record.firstName} ${record.lastName}`}</span>
      ),
    },
    {
      title: 'Experience',
      dataIndex: 'experience',
    },
    {
      title: 'Adhar Number',
      dataIndex: 'adharnumber',
    },
    {
      title: 'Status',
      dataIndex: 'status',
    },
    {
      title: 'Email',
      dataIndex: 'email',
    },
    {
      title: 'Phone Number',
      dataIndex: 'phone',
    },
    {
      title: 'Location',
      dataIndex: 'address',
    },
    {
      title: 'Actions',
      dataIndex: 'actions',
      render: (text, record) => (
        <div className='d-flex'>
          {record.status === 'pending' ? (
            <button
              className='btn btn-success'
              onClick={() => handleAccountStatus(record, "approved")}
            >
              Approve
            </button>
          ) : (
            <button className="btn btn-danger" onClick={() => handleAccountStatus(record, "rejected")}>
              Reject
            </button>
          )}
        </div>
      ),
    },
  ];

  return (
    <Layout>
      <h1 className='center m-2'>Doctors List</h1>
      <Table columns={columns} dataSource={doctors} />
    </Layout>
  );
};

export default Doctors;
