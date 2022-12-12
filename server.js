const express = require('express');
const bcrypt = require("bcrypt-nodejs")
const cors = require("cors")
const knex = require('knex')
const register =require('./controllers/register')
const signin = require('./controllers/signin');
const profile = require('./controllers/profile');
const image = require('./controllers/image')
const port = process.env.PORT || 3000
const db = knex({
    client: 'pg',
    connection: process.env.PG_CONNECTION_STRING,
    searchPath:['knex','public'],
      
    
  });



const app = express();
app.use(express.urlencoded({extended: false}));
app.use(express.json());
app.use(cors());
app.get('/',(req,res)=>{
    res.set('Access-Control-Allow-Origin', '*');
    res.send({ "msg": "This has CORS enabled 🎈" })});


// app.get('/cors', (req, res) => {
// res.set('Access-Control-Allow-Origin', '*');
// res.send({ "msg": "This has CORS enabled 🎈" })
// })

app.post('/signin',cors(),(req,res)=>{signin.handleSignin(req,res,db,bcrypt)});

app.post('/register',cors(),(req,res)=>{register.handleRegister(req,res,db,bcrypt)});

app.get('/profile/:id',cors(),(req,res)=>{profile.handleProfile(req,res,db,bcrypt)});
//     database.users.forEach(user=>{
//         if (user.id ===id){
//             found=true;
//             return res.json(user)
//         }
//     })
//     if(!found){
//         res.status(400).json('no user found')
//     }
// })
app.put('/image',cors(),(req,res)=>{ image.handleImg(req,res,db ) });
app.post('/imageurl',cors(),(req,res)=>{image.handleApiCall(req,res,db)});
// bcrypt.hash("bacon", null, null, function(err, hash) {
//     // Store hash in your password DB.
// });

// // Load hash from your password DB.
// bcrypt.compare("bacon", hash, function(err, res) {
//     // res == true
// });
// bcrypt.compare("veggies", hash, function(err, res) {
//     // res = false
// });
    
app.listen(port,()=>{
    console.log(`app is running on port ${port}`);
})
