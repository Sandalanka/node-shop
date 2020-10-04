const mongoose =require('mongoose');
const Order =require('../model/order');
const Product =require('../model/product');


exports.all_order_get=(req,res,next)=>{
    Order.find()
    .select('product quantity _id')
    .populate('product','name')
    .exec()
    .then(doc=>{
        res.status(200).json({
            count:doc.length,
            orders:doc.map(doc=>{
                return{
                    _id:doc._id,
                    product:doc.product,
                    quantity:doc.quantity,
                    request:{
                        type:'GET',
                        url:'http://localhost:3300/order/'+doc._id
                    }
                }
            })
        });
    }).catch(err=>{
        res.status(500).json({
            error:err
        })
    });
};


exports.order_add=(req,res,next)=>{
    Product.findById(req.body.product)
    .exec()
    .then(product=>{
        // if(!product){
        //     return res.status(404).json({
        //         messgae:'Product Not Found'
        //     })
        // }
            const order=new Order({
            _id:new mongoose.Types.ObjectId,
            product:req.body.productId,
            quantity:req.body.quantity
            });
            return order.save()
                        .then(result=>{
                            res.status(200).json({
                            message:'Order Add Successfull',
                            Ordercreated:{
                            _id:result._id,
                            product:result.product,
                            quantity:result.quantity
                            },
                            request:{
                                type:'POST',
                                url:'http://localhost:3300/order/'+result._id
                            }
                        })
                    })
    .catch(err=>{
        res.status(500).json({
                            error:err
                        })
                    })
                
            })
};


exports.one_order_get=(req,res,next)=>{
    
    Order.findById(req.params.OrderId)
    .exec()
    .then(result=>{
        if(!result){
            res.status(404).json({
                message:'Order ID Not Found'
            })
        }else{
            res.status(200).json({
                order:result,
                request:{
                    type:"GET",
                    url:'http://localhost:3300/order/'
                }
            })
        }
        
    })
    .catch(err=>{
        res.status(404).json({
            error:err
        })
    })
};


exports.order_update=(req,res,next)=>{
    res.status(200).json({
        message:'Order PATCH method is working'
    })
};


exports.order_delete=(req,res,next)=>{
    Order.remove({_id:req.params.orderId})
    .exec()
    .then(result=>{
        //res.status(404).json(result);
        if(result.deletedCount==0){
            return res.status(404).json({
                message:'Order ID Not Found'
            })
        }else{
            res.status(200).json({
                message:'Order Delete Successfull!',
                request:{
                    type:"DELETE",
                    url:'http://localhost:3300/order/'
                }
            })
        }
        
    })
    .catch(err=>{
        res.status(404).json({
            error:err
        })
    })
};