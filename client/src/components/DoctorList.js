import React from 'react';
import { useNavigate } from 'react-router-dom';

const DoctorList = ({doctor}) => {
    const navigate = useNavigate()
  return (
    <>
    <div className='card m-1' 
    style={{cursor: "pointer"}}
    onClick={() => navigate(`/doctor/book-appointment/${doctor._id}`)}>
        <div className='card-header'>
            Mr.{doctor.firstName} {doctor.lastName}
        </div>
        <div className='card-body'>
            <p>
                <b>Specialization :- </b> {doctor.specialization}
            </p>
            <p>
                <b>Experience :- </b> {doctor.experience}
            </p>
            <p>
                <b>Fees-Per-Consaltation :- </b> {doctor.feesPerConsaltation}
            </p>
            <p>
                <b>Timing :- </b> {doctor.timings[0]} - {doctor.timings[1]}
            </p>
        </div>
    </div>
    </>
  )
}

export default DoctorList