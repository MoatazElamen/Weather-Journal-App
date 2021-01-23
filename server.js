// Setup empty JS object to act as endpoint for all routes
let projectData  = {};
// Require Express to run server and routes
const express= require('express')
const bodyParser = require('body-parser')
const path = require('path')
// Start up an instance of app

/* Middleware*/
//Here we are configuring express to use body-parser as middle-ware.
const app = express()
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Cors for cross origin allowance
const Cors = require('cors');
app.use(Cors())
// Initialize the main project folder
app.use(express.static('website'));

app.get('/',(req,res)=>{
    res.sendFile(path.join(__dirname+'/website/index.html'))
})
app.get('/mostrecent' ,(req,res)=>{
    res.json(projectData)
})
app.post('/',(req,res)=>{
    const data = req.body
    projectData = data
    res.json(projectData)
})

app.listen(8000,()=>{
    console.log('app is working on port 8000')
})

// Setup Server