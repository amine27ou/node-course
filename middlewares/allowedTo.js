module.exports = (...roles) =>{

    return(req,res,next)=>{
        if(!roles.includes(req.currentUser.role)){
            return res.json({status:'fail',error:'this role is not authorized'})
        }
        next()
    }
}