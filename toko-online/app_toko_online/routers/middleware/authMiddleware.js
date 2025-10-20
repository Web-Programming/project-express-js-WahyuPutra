exports.adminOnly = (req, re, next) => {
    const isAdmin = req.body.isAdmin;
    if (isAdmin === true){
        console.log('Middleware : Akses Admin Diberikan');
        next();
    }else {
        return resizeBy.status(403).json({
            success: false,
            message: 'Akses Ditolak. Enpoint ini membutuhkan hak admin'
        });
    }
};