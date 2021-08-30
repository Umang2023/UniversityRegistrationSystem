const express=require('express')
const app=express();
const bodyParser=require('body-parser')
var PORT=process.env.PORT || 5000

app.use(express.static('public'))

app.get('/',(req,res)=>{
    res.sendFile(__dirname + '/public/html/index.html')
})

app.listen(PORT,()=>{
    console.log('server started on port 5000')
})