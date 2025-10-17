//const mongoose = require("mongoose");
const mongoose = require("mongoose"); 
// buat schema user
const UserSchema = new mongoose.Schema({
    // tidak perlu buat properti id karena akan dibuat otomatis 
    // dengan nama _id
    username:{
        type : String,
        required: [true, "Username Harus Di Isi"],
        trim: true,
        unique: true,
    },
    email:{
        type : String,
        required: [true, "Email Harus Di Isi"],
        unique: true,
        match: [
            /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
            "Harap Isi alamat Email yang Valid"
        ]
    },
    password:{
        type : String,
        required: [true, "Password harus di isi"],
        select: false,
        minlength: [6, "Min 6"],
    },
    address:{
        type : String,
    },
    isAdmin:{
        type : Boolean,
        default : false,
    },
    createat:{
        type : Date,
        default: Date.now,
    },
});

const User = mongoose.model('User',UserSchema);

module.exports = User;