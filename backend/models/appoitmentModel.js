const mongoose = require('mongoose')

const appoitmentSchema = new mongoose.Schema({
    userId:{
        type: String,
        required: true,
    },
    doctorId:{
        type: String,
        required: true,
    },
    doctorInfo:{
        type: String,
        required: true,
    },
    name:{
        type: String,
        required: true,
    },
    date:{
        type: String,
        required: true,
    },
    status:{
        type: String,
        required: true,
        default: 'pending',
    },
    time:{
        type: String,
        required: true,
    },

}, {timestamps:true})

const appointmentModel = mongoose.model('appointments', appoitmentSchema);

module.exports = appointmentModel;