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
    connection: {
      host : '127.0.0.1',
      user : 'postgres',
      password : 'test',
      database : 'smart-brain'
    }
  });

db.select('*').from('users').then(data=>{
    console.log(data);
});

const app = express();
app.use(express.urlencoded({extended: false}));
app.use(express.json());
app.use(cors())




app.post('/signin',(req,res)=>{signin.handleSignin(req,res,db,bcrypt)})

app.post('/register',(req,res)=>{register.handleRegister(req,res,db,bcrypt)})

app.get('/profile/:id',(req,res)=>{profile.handleProfile(req,res,db,bcrypt)})
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
app.put('/image',(req,res)=>{ image.handleImg(req,res,db ) })
app.post('/imageurl',(req,res)=>{image.handleApiCall(req,res,db)})
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