const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
require('./Employee');

app.use(bodyParser.json())

const Employee = mongoose.model('employee')

const mongoUri = "mongodb+srv://cnq:Wy9Ufm9KyvpYb7wa@cluster0.p0iam.mongodb.net/<dbname>?retryWrites=true&w=majority"

mongoose.connect(mongoUri,{
    useNewUrlParser:true,
    useUnifiedTopology:true
})

mongoose.connection.on("connected",()=>{
    console.log("Connected to mongo ")
})

mongoose.connection.on("error",(err)=>{
    console.log("Error"+err);
})

app.get('/',(req,res)=>{
    Employee.find({})
    .then(data=>{
        console.log(data)
        res.send(data)
    }).catch(err=>{
        console.log(err)
    })
    
})

app.post('/send-data',(req,res)=>{
    console.log(req.body)
    const employee = new Employee({
        name:req.body.name,
        email:req.body.email,
        phone:req.body.phone,
        salary:req.body.salary,
        picture:req.body.picture,
        position:req.body.position
    })
    employee.save()
    .then(data=>{
        console.log(data)
        res.send(data)
    }).catch(err=>{
        console.log(err)
    })
    
})

app.post('/delete',(req,res)=>{
    Employee.findByIdAndRemove(req.body.id)
    .then(data=>{
        console.log(data)
        res.send(data)
    }).catch(err=>{
        console.log(err)
    })
})

app.post('/update',(req,res)=>{
    Employee.findByIdAndUpdate(req.body.id, {
        name:req.body.name,
        email:req.body.email,
        phone:req.body.phone,
        salary:req.body.salary,
        picture:req.body.picture,
        position:req.body.position
    }).then(data=>{
        console.log(data)
        res.send(data)
    }).catch(err=>{
        console.log(err)
    })

})

app.listen(3000,()=>{
    console.log("server running")
})