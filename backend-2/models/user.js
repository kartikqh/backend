const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    firstName: {
      type: String,
      default:""
    },
    lastName: {
      type: String,
      default:""
    },
    licenseNumber:{
      type: String,
      unique: true,
      default:""
    },
    dob:{
      type: String,
      default:""
    },
    age: {
      type: String,
      default:""
    },
    userName:{
      type: String,
      unique: true
    },
    password:String,
    userType:String,
    carDetails: {
      make: {
        type: String,
        default:""
      },
      model: {
        type: String,
        default:""
      },
      year: {
        type: String,
        default:""
      },
      plateNumber: {
        type: String,
        unique: true
      },
    },
    appointment_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Appointment'   
      },
  });
module.exports = mongoose.model('User', userSchema);
