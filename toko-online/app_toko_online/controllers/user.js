var products = require('../data/products.json');
const User = require('../models/users');
//var User = require('../models/users');

const create = async (req, res) => {
  try{
    const newUser = new User({
      username: req.body.username,
      email: req.body.email,
      password: req.body.password,
      address: req.body.address,
      isAdmin: req.body.isAdmin || false
    });
    const user = await newUser.save();

    const userResponse = user.toObject();
    delete userResponse.password;

    res.status(200).json({
        status : true,
        message : "User berhasil disimpan",
        data: user
    });

    }catch(err){
      if(err.name === 'validationError'){
        res.status(400).json({
          status: false,
          message: err.message
        });
      }else if (err.code === 11000){
        res.status(400).json({
          status: false,
          message: "Username atau Email sudah terdaftar"
        });
      }else{
        res.status(500).json({
          status: false,
          message: 'Internal Server Error'
        });
      }
    }
};

const apiall = async (req, res) => {
  try{
    const users = await User.find({}).select('-password');
      res.status(200).json(
        {
          status: true,
          message: "Data User Berhasil Diambil",
          data: users
        }
      );
    }catch(err){
        res.status(500).json({
            status : false,
            message : "Gagal Memuat User"
      });
    }
};

const getById = async (req, res) => {
  try{
    const userId = req.params.id;
    const user = await User.findById(userId).select('-password');

        if(!user){
            return res.status(404).json({
                status: false,
                message: "User Tidak Ditemukan"
            });
        }
        res.status(200).json({
            status: true,
            message: "Detail User Berhasil Diambil",
            data: user
        })
    }catch(err){
        res.status(500).json({
            status: false,
            message: "Gagal Memuat Detail User"
        });
    }
};

const update = async (req, res) => {
  try{
          const user = await User.findByIdAndUpdate(req.params.id, req.body, {
              new: true,
              runValidators: true
          }).select('-password');
  
          if(!user){
              res.status(404).json({
                  status:false, 
                  message: "User Tidak Ditemukan",
              });
          }
          res.status(200).json({
              status: true, 
              message:"User Berhasil Di Update", 
              data:user
          });
      }catch(err){
          if(err.name === 'CastError'){
              res.status(400).json({
                  status: false, message: "Format ID Tidak Valid"
              });
          }else if(err.name === 'ValidationError'){
              res.status(400).json({
                  status: false, 
                  message: err.message
              });
          }else if(err.name === 11000){
              res.status(400).json({
                  status: false, 
                  message: "username atau email sudah terdaftar"
              });
          }else{
              res.status(500).json({
                  status: false, message: 'Internal Server Error'
              });
          }
      }
};

const remove = async (req, res) => {
  try{
        const user = await User.findByIdAndDelete(req.params.id);
         if(!user){
            res.status(404).json({
                status: false, message: "User Tidak Ditemukan",
            });
         }else{
            res.status(200).json({
                status: true, message: "User Berhasil Dihapus"
            });
         }
    }catch(err){
        if(err.name === 'CastError'){
            res.status(200).json({
                status: true, message: "Format ID Tidak Valid",
            });
         }else{
            res.status(500).json({
                status: false, message: "Internal Server Error"
            });
         }
    }
};

module.exports = {apiall, create, getById, update,remove};


