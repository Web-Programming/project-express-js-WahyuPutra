var products = require('../models/products');
var Order = require('../models/orders');
const User = require("../models/users");

// Buat rest api
const apiall = async(req, res) => {
    try{
        const order = await Order.find({});
        res.status(200).json(
            {
                status: true,
                message: "Data Order Berhasil Diambil",
                data: order
            }
        );
    }catch(err){
        res.status(500).json({
            status : false,
            message : "Gagal Memuat Order"
        });
    }
};

const create = async(req,res) =>{
    try{
        const {user, orderItems, staus, orderDate} = req.body;

        const totalAmount = orderItems.reduce(
            (sum, item) => {sum + item.priceAtorder * item.quality;
            0
    }, 0);
        // ambil data nya
        const newOrder = new Order({
            user: req.body.user,
            orderItems: req.body.orderItems,
            totalAmount: req.body.totalAmount,
            status: req.body.status,
            orderDate: req.body.orderDate
        });

        // simpan ke db
        const order = await newOrder.save();

        // kirim respon
        res.status(200).json({
            status : true,
            message : "Order berhasil disimpan",
            data: order
        });

    }catch(err){
        if(err.user === 'validationError'){
            res.status(400).json({
                status: false,
                message: err.message
            });
        }else{
            res.status(500).json({
                status: false,
                message: 'Internal Server Error'
            });
        }
    }
};

const detailorder = async(req,res) =>{
    try{
        const orderId = req.params.id;
        const order = await Order.findById(orderId);

        if(!order){
            return res.status(404).json({
                status: false,
                message: "Order Tidak Ditemukan"
            });
        }
        res.status(200).json({
            status: true,
            message: "Detail Order Berhasil Diambil",
            data: order
        })
    }catch(err){
        res.status(500).json({
            status: false,
            message: "Gagal Memuat Detail Order"
        });
    }
};

const update = async(req,res) =>{
    try{
        const { status } = req.body;

        const allowedStatus = ['Pending', 'Procesing', 'Shipped', 'Delivered', 'Cencelled'];
        if(!status || !allowedStatus.includes(status)){
            return res.status(400).json({
                status: false,
                message: "Status tidak valid"
            });
        }

        const order = await Order.findByIdAndUpdate(
            req.params.id,
            { status },
            { new: true}
        );
        if(!order){
            res.status(404).json({
                status:false,
                message: "Order Tidak Ditemukan",
            });
        }
        res.status(200).json({
            status: true, 
            message:"Order Berhasil Di Update", 
            data:order
        });
    }catch(err){
        if(err.user === 'CastError'){
            res.status(400).json({
                status: false, 
                message: "Format ID Tidak Valid"
            });
        }else if(err.user === 'ValidationError'){
            res.status(400).json({
                status: false, 
                message: err.message
            });
        }else{
            res.status(500).json({
                status: false, 
                message: 'Internal Server Error'
            });
        }
    }
};

const remove = async(req,res) =>{
    try{
        const order = await Order.findByIdAndDelete(req.params.id);
         if(!order){
            res.status(404).json({
                status: false, 
                message: "Order Tidak Ditemukan",
            });
         }else{
            res.status(200).json({
                status: true, 
                message: "Order Berhasil Dihapus"
            });
         }
    }catch(err){
        if(err.user === 'CastError'){
            res.status(200).json({
                status: true, 
                message: "Format ID Tidak Valid",
            });
         }else{
            res.status(500).json({
                status: false, 
                message: "Internal Server Error"
            });
         }
    }
};

module.exports = {apiall, create, detailorder, update,remove};