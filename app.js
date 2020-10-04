const express =require('express');
const app =express();
const morgan =require('morgan');
const bodyParser =require('body-parser');
const mongoose =require('mongoose');

app.use(morgan('dev'));
app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());

//databse connection 
mongoose.connect('mongodb://localhost:27017/node-shop')

//frontend access
app.use((req,res,next)=>{
    res.header("Access-Control-Allow-Origin","*");
    res.header("Access-Control-Headers","Origin,X-Requested-With,Content-Type,Accept,Authorization");
    if(res.method ==='OPTIONS'){
        res.header('Access-Control-Allow-Methods','PUT,POST,PATCH,DELETE,GET');
        return res.status(200).json({});
    }
    next();
});




//route require
const productRoute =require('./api/route/product');
const orderRoute =require('./api/route/order');
const userRoute =require('./api/route/user');

//route declaer
app.use('/product',productRoute);
app.use('/order',orderRoute);
app.use('/user',userRoute);


app.use((req,res,next)=>{
    const error =new Error('Not Found');
    error.status=404;
    next(error);

});

app.use((error,req,res,next)=>{
    res.status(error.status||500);
    res.json({
        error:{
            message: error.message
        }
    })
})
module.exports =app;