const http =require('http');
const port =process.env.PORT||3300;
const app=require('./app');
const serve =http.createServer(app);
serve.listen(port);