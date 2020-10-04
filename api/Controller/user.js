const mongoose =require('mongoose');
const User   =require('../model/user');
const bcrypt =require('bcrypt');
const jwt    =require('jsonwebtoken');


exports.signup=(req,res,next)=>{
    User.find({email:req.body.email})
    .exec()
    .then(docs=>{
        if(docs.length >=1){
            return res.status(409).json({
                message:'Email already use!'
            })
        }else{
            bcrypt.hash(req.body.password,10,(err,hash)=>{
                if(err){
                    return res.status(500).json({
                        error:err
                    });
                }else{
                    const user =new User({
                        _id:new mongoose.Types.ObjectId,
                        email:req.body.email,
                        password:hash
                    });
                    user.save()
                    .then(result=>{
                        res.status(200).json({
                            message:'User Created'
                        })
                    })
                    .catch(err=>{
                        res.status(500).json({
                            error:err
                        })
                    })
                }
            })
            
        }
    })
    .catch(err=>{
        res.status(500).json({
            error:err
        })
    })
};



exports.user_delete=(req,res,next)=>{
    User.remove({_id:req.params.userId})
    .exec()
    .then(result=>{
        res.status(200).json({
            message:'User delete Successful!'
        })
    })
    .catch(err=>{
        res.status(500).json({
            error:err
        })
    })
};


exports.login=(req,res,next)=>{
    User.find({email:req.body.email})
    .exec()
    .then(user=>{
        if(user.length < 1){
            return res.status(404).json({
                message:'Auth fail!'
            });
        }
        bcrypt.compare(req.body.password,user[0].password,(err,result)=>{
            if(err){
                return res.status(404).json({
                    message:'Auth fail!'
                });
            }
            if(result){
              const token =  jwt.sign({
                    email:user[0].email,
                    userId:user[0]._id
                },
                "secret",
                {
                    expiresIn:'1h'
                });
                return res.status(404).json({
                    message:'Auth Successful!',
                    token:token
                });
            }
            return res.status(404).json({
                message:'Auth fail!'
            });
        })
    })
    .catch(err=>{
        return res.status(500).json({
            error:err
        })
    })
};