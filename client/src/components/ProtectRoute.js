// protect.js
import React, { useEffect } from 'react';
import { Navigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { hideLoading, showLoading } from '../redux/features/alertSlice';
import axios from 'axios';
import { setUser } from '../redux/features/userSlice';

export default function ProtectRoute({ children }) {
  const dispatch = useDispatch();
  const user = useSelector(state => state.user.user); // Update user state path

  const getUser = async () => {
    try {
      dispatch(showLoading());
      const res = await axios.post(
        '/api/v1/user/getUserData',
        {},
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`
          }
        }
      );
      dispatch(hideLoading());
      if (res.data.success) {
        dispatch(setUser(res.data.data));
      } else {
        return <Navigate to="/login" />; e
      }
    } catch (error) {
      dispatch(hideLoading());
      console.log(error);
    }
  }

  useEffect(() => {
    if (!user) {
      getUser();
    }
  }, [user]); 

  if (localStorage.getItem('token')) {
    return children;
  } else {
    return <Navigate to="/login" />;
  }
}
