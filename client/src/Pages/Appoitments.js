import React, { useState , useEffect} from 'react'
import Layout from '../components/Layout'
import axios from 'axios'
import { Table } from 'antd';
import moment from 'moment'

const Appoitments = () => {

    const [appointments, setAppoitments] = useState()
    const [doctors, setDoctors] = useState([]);
    const getAppointments = async () => {
        try {
            const res = await axios.get('http://localhost:8080/api/v1/user/user-appointments',
            {
                headers:{
                    Authorization: `Bearer ${localStorage.getItem("token")}`
                }
            })
            if(res.data.success){
                setAppoitments(res.data.data)
            }
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        getAppointments()
    }, [])

    const columns = [
        {
            title: 'Booking ID',
            dataIndex: '_id'
        },
        {
            title: 'Date & Time',
            dataIndex: 'date',
            render: (text,record) => (
                <span>
                    {moment(record.date).format("DD-MM-YYYY")} &nbsp;
                    {moment(record.time).format("HH:mm")}
                </span>
            )
        },
        {
            title: 'Status',
            dataIndex: 'status',
        }
    ]

  return (
    <Layout>
        <h1>
        Appoitments List
        <Table columns={columns} dataSource={appointments}/>
        </h1>
    </Layout>
  )
}

export default Appoitments