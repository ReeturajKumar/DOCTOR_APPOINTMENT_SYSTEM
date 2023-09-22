import React from 'react';
import "../Styles/Layout.css";
import { adminmenu, usermenu } from '../Data/data';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';
import {Badge, message } from 'antd';

const Layout = ({ children }) => {
    const { user } = useSelector(state => state.user);
    const location = useLocation();
    const navigate = useNavigate();


    //LOgout function
    const handleLogOut = () => {
        localStorage.clear()
        message.success('Logout Successfully')
        navigate('/login')
    };



    // ================================    doctor menu start here =====================================
    const doctormenu = [
        {
            name: "Home",
            path: "/",
            icon : "fa-solid fa-house"
        },
        {
            name:'Appointments',
            path: '/doctor-appointments',
            icon: 'fa-solid fa-list'
        },
        {
            name:'Profile',
            path: `/doctor/profile/${user?._id}`,
            icon: 'fa-solid fa-user'
        },
    ];
    // =================================  doctor menu end here ====================================

    const Sidebarmenu = user?.isAdmin? adminmenu : user?.isDoctor ? doctormenu : usermenu;

    return (
        <div className='main'>
            <div className='layout'>
                <div className='sidebar'>
                    <div className='logo'><h6>DOCTOR APPOINTMENT SYSTEM</h6></div>
                    <hr />
                    <div className="menu">
                        {Sidebarmenu.map((menu) => {
                            const isActive = location.pathname === menu.path;
                            return (
                                <>
                                <div key={menu.path} className={`menu-item ${isActive && "active"}`}>
                                <i className={menu.icon}></i>
                                <Link to={menu.path}>{menu.name}</Link>
                                </div>
                             </>
                            );
                        })}
                        <div className={`menu-item`} onClick={handleLogOut}>
                        <i className="fa-solid fa-right-from-bracket"></i>
                        <Link to="/login">Logout</Link>
                        </div>
                    </div>
                </div>
                <div className='content'>
                    <div className='header'>
                        <div className='header-content' style={{cursor: "pointer"}}>
                        <Badge count={user && user.notification.length} onClick = {() => {navigate("/notification")}}>
                            <i class="fa-solid fa-bell"></i>
                        </Badge>
                            <Link to="">{user?.name}</Link>
                        </div>
                    </div>
                    <div className='body'>{children}</div>
                </div>
            </div>
        </div>
    );
};

export default Layout;
