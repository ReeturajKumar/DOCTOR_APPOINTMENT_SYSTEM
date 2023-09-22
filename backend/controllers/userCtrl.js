const userModel = require("../models/userModels");
const bcrypt = require("bcryptjs");
const jwt = require('jsonwebtoken')
const doctorModel = require('../models/doctorModel')
const appointmentModel = require('../models/appoitmentModel')
const moment = require('moment')

// register callback
const registerController = async (req, res) => {
    try {

        const existingUser = await userModel.findOne({ email: req.body.email });
        if (existingUser) {
            return res.status(200).send({ message: "User Already Exists", success: false });
        }

        const password = req.body.password;
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        req.body.password = hashedPassword;
        const newUser = new userModel(req.body);

        await newUser.save();
        res.status(201).send({ message: 'Registered Successfully', success: true });
    } catch (error) {
        console.error(error);
        
        let errorMessage = 'Registration failed. Please try again later.';
        if (error.name === 'ValidationError') {
            errorMessage = 'Validation error. Please check your input data.';
        } else if (error.code === 11000) {
            errorMessage = 'Email already exists. Please use a different email address.';
        }
        res.status(500).send({ success: false, message: errorMessage });
    }
};





//LOGIN CALLBACK
const loginController = async (req, res) => {
    try {
        const user = await userModel.findOne({ email: req.body.email });
        if (!user) {
            return res.status(404).send({ message: 'User not found', success: false });
        }

        const isMatch = await bcrypt.compare(req.body.password, user.password);
        if (!isMatch) {
            return res.status(401).send({ message: 'Invalid email or password', success: false });
        }

        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET_KEY, { expiresIn: '1h' });
        res.status(200).send({ message: 'Login Success', success: true, token });
    } catch (error) {
        console.error(error);
        // Handle different types of errors and provide clear messages.
        let errorMessage = 'Login failed. Please try again later.';
        if (error.name === 'ValidationError') {
            errorMessage = 'Validation error. Please check your input data.';
        } else {
            errorMessage = `Error in login Controller: ${error.message}`;
        }
        res.status(500).send({ message: errorMessage, success: false });
    }
};


const authController = async(req,res) => {
    try {
        const user = await userModel.findById({_id:req.body.userId})
        user.password = undefined;
        if (!user){
            return res.status(200).send({
                message: 'User Not Found',
                success: false
            })
        }else{
            res.status(200).send({
                success:true,
                data:user
            });
        }
    } catch (error) {
        console.log(error)
        res.status(500).send({
            message: 'auth error',
            success:false,
            error
        })
    }
};

//Apply DOCTOR CTRL
const applyDoctorController = async(req,res) => {
    try {
        const newDoctor = await doctorModel({...req.body, status: 'pending'})
        await newDoctor.save()
        const adminUser = await userModel.findOne({isAdmin:true})
        const notification = adminUser.notification
        notification.push({
            type:'apply-doctor-request',
            message: `${newDoctor.firstName} ${newDoctor.lastName} Has Applied For A Doctor Account`,
            data:{
                doctorId: newDoctor._id,
                name: newDoctor.firstName + " " + newDoctor.lastName,
                onclickPath: '/admin/doctors'
            }
        })
        await userModel.findByIdAndUpdate(adminUser._id,{notification})
        res.status(201).send({
            success: true,
            message: 'Doctor Account Applied Successfully'
        })
    } catch (error) {
        console.log(error)
        res.status(500).send({
            success:false,
            error,
            message:'Error While Applying for Doctor'
        })
    }
};


//notification controller 
const getAllNotificationController = async (req, res) => {
    try {
        const user = await userModel.findOne({ _id: req.body.userId });
        if (!user) {
            return res.status(404).send({
                success: false,
                message: 'User not found',
            });
        }
        const seenNotifications = user.seennotification.concat(user.notification);
        user.seennotification = seenNotifications;
        user.notification = [];
        const updatedUser = await user.save();
        res.status(200).send({
            success: true,
            message: 'All notifications marked as read',
            data: updatedUser,
        });
    } catch (error) {
        console.log(error);
        res.status(500).send({
            message: 'Error in handling notifications',
            success: false,
            error,
        });
    }
};

// delete notification  
const deleteAllNotificationController = async (req, res) => {
    try {
        const user = await userModel.findOne({ _id: req.body.userId });
        user.notification = [];
        user.seennotification = [];
        const updatedUser = await user.save();
        updatedUser.password = undefined;

        res.status(200).send({
            success: true,
            message: 'Notification Deleted',
            data: updatedUser,
        });
    } catch (error) {
        console.error(error);
        res.status(500).send({
            success: false,
            message: 'Unable to delete all notifications',
            error: { message: error.message },
        });
    }
};


//getAll Doctors 
const getAllDoctorsController = async (req,res) => {
    try {
        const doctors = await doctorModel.find({status:'approved'})
        res.status(200).send({
            success: true,
            message: "Doctors List Fetched Successfully",
            data: doctors,
        })
    } catch (error) {
        console.log(error)
        res.status(500).send({
            success: false,
            error,
            message: 'Error While Fetching Doctor'
        })
    }
}


// BOOK APPOITMENTS 
const bookAppointmentController = async (req, res) => {
    try {
        req.body.status ="pending"
        const newAppointment = new appointmentModel(req.body)
        await newAppointment.save()
        const user = await userModel.findOne({_id: req.body.doctorInfo.userId})
        user.notification.push({
            type:'New-Appointment-Request',
            message:`A new Appointment Request from ${req.body.userInfo.name}`,
            onclickPath: "/user/appointments"
        });
        await user.save();
        res.status(200).send({
            success: true,
            message:"Appointment Book Successfully"
        })
    } catch (error) {
        console.log(error)
        res.status(500).send({
            success:false,
            error,
            message:'Error While Booking Appointment'
        })
    }
};




// // booking bookingAvaibilityController
// const bookingAvaibilityController = async(req,res) => {
//     try {
//         const date = moment(req.body.date, 'DD-MM-YYYY').toISOString();
//         const fromTime = moment(req.body.time, 'HH:mm').subtract(1, 'hours').toISOString();
//         const toTime = moment(req.body.time, 'HH:mm').add(1, 'hours').toISOString();
//         const doctorId = req.body.doctorId;
//         const appointments = await appointmentModel.find({
//             doctorId,
//             date,
//             time: {
//                 $gte: fromTime,
//                 $lte: toTime
//             }
//         });
//         if (appointments.length > 0) {
//             return res.status(200).send({
//                 message: 'Appointments not Available at This Time',
//                 success: false, 
//             });
//         } else {
//             return res.status(200).send({
//                 success: true,
//                 message: "Appointment Available"
//             });
//         }
//     } catch (error) {
//         console.error(error);
//         res.status(500).send({
//             success: false,
//             error: error.message, 
//             message: 'Error in Booking'
//         });
//     }
// };



// appointments Sction 

const userAppoitmentsController = async (req,res) => {
    try {
        const appoitments = await appointmentModel.find({userId:req.body.userId})
        res.status(200).send({
            success: true,
            message: "Users Appoitmenst Fetch Successfully",
            data: appoitments
        });
    } catch (error) {
        console.log(error)
        res.status(500).send({
            success: false,
            error,
            message: 'Error in user Authentication'
        })
    }
}



///




module.exports = {
    loginController, 
    registerController, 
    authController,
    applyDoctorController,
    getAllNotificationController,
    deleteAllNotificationController,
    getAllDoctorsController,
    bookAppointmentController,
    // bookingAvaibilityController,
    userAppoitmentsController,
};
