const doctorModel = require('../models/doctorModel')
const userModel = require('../models/userModels')


const getAllUsersController = async(req,res) => {
    try {
        const users = await userModel.find({})
        res.status(200).send({
            success:true,
            message:'users data list ',
            data:users
        })
    } catch (error) {
        console.log(error)
        res.status(500).send({
            success:false,
            message:'error While fetching users data ',
            error
        })
    }
}

const getAllDoctoreController = async(req,res) => {
    try {
        const doctors = await doctorModel.find({})
        res.status(200).send({
            success:true,
            message:'doctor data list',
            data:doctors
        })
    } catch (error) {
        console.log(error)
        res.status(500).send({
            success:false,
            message:'error While fetching doctors data ',
            error
        })
    }
}

// account status change 
const changeAccountStatusCOntroller = async (req,res) => {
    try {
        const {doctorId, status} = req.body
        const doctor = await doctorModel.findByIdAndUpdate(doctorId,{status})
        const user = await userModel.findOne({_id:doctor.userId})
        const notification = user.notification
        notification.push({
            type: "doctor-account-request-updated",
            message: `Your Doctor Account Request Has ${status}`,
            onclickPath: '/notification'
        })
        user.isDoctor = status === 'approved' ? true : false;
        await user.save()
        res.status(201).send({
            success: true,
            message: "Account status Updated",
            data: doctor,
        })
    } catch (error) {
        console.log(error)
        res.status(500).send({
            success: false,
            message: 'Error in Account Status ',
            error
        })
    }
}


module.exports = {getAllUsersController,getAllDoctoreController,changeAccountStatusCOntroller,}