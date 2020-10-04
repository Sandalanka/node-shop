const Product=require('../model/product');
const mongoose =require('mongoose');


exports.get_all_product = (req,res,next)=>{
    Product.find()
    .exec()
    .then(doc=>{
        if(doc.length >=0){
            res.status(200).json(doc);
        }else{
            res.status(404).json({message:"This Id Product Not Found"});
        }  
        
    })
    .catch(err=>{
        console.log(err)
        res.status(500).json({error:err})
    })
};



exports.product_add =(req,res,next)=>{
    const product=new Product({
        _id:new mongoose.Types.ObjectId,
        name:req.body.name,
        price:req.body.price
    });
    product.save().then(result=>{
        res.status(200).json({
            message:'Product is add Successfull',
            result:result
        })
    }).catch(err=>
        res.status(500).json(err));
};


exports.one_product_get=(req,res,next)=>{
    const id=req.params.productId;
    Product.findById(id)
            .exec()
            .then(doc=>{
                if(doc){
                    res.status(200).json(doc);
                }else{
                    res.status(404).json({message:"This Id Product Not Found"});
                }
                
            })
            .catch(err=>{
                
                res.status(500).json({error:err})
            })
};


exports.product_update=(req,res,next)=>{
    const id=req.params.productId;
    // const updateOps={};
    // const input = {
    //     name: 'Evert',
    //   } 
    // for(const ops of Object.keys(input)){
    //     updateOps[ops.propName]=ops.value;

    // }
    Product.update({_id:id},{$set:{name:req.body.newName,price:req.body.newPrice}})
    .exec()
    .then(doc=>{
            res.status(200).json(doc);
        })
    .catch(err=>{
        
        res.status(500).json({error:err})
    })
};



exports.product_delete=(req,res,next)=>{
    const id=req.params.productId;
    Product.remove({_id:id})
            .exec()
            .then(doc=>{
                if(doc){
                    res.status(200).json(doc);
                }else{
                    res.status(404).json({message:"This Id Product Not Found"});
                }
                
            })
            .catch(err=>{
                
                res.status(500).json({error:err})
            })
};