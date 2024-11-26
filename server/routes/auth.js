const express=require('express');
const router=express.Router();
const User=require('../database/schema/User');
const bcrypt=require('bcrypt');
const jwt=require('jsonwebtoken');


const secretKey=process.env.JWT_AUTHENTICATION_KEY;

router.post('/signup',async(req,res)=>{
    let execution=true;
    try {
        let userisPresent=false;
        let user=await User.findOne({email:req.body.email});
        if(user){
            userisPresent=true;
            return res.status(422).json({userisPresent});
        }

        //password hashing 
        const salt= await bcrypt.genSalt(10);
        const securePassword=await bcrypt.hash(req.body.password,salt);
        user=await User.create({
            name:req.body.name,
            email:req.body.email,
            type:req.body.type,
            password:securePassword
        });

        const data={
            user:{
                id:user.id,
                type:user.type
            }
        };
        const authenticationToken=jwt.sign(data,secretKey);
        res.status(200).json({userisPresent,execution,authenticationToken});

    } catch (error) {
        
    }
});

//signin of the user
router.post('/signin',async(req,res)=>{
    let execution=true;
    try {
        let login=true;
        let user=await User.findOne({email:req.body.email});
        if(!user){
            login=false;
            res.status(404).json({login})
        }
        const comparePassword=await bcrypt.compare(req.body.password,user.password);
        if (!comparePassword) {
            return res.status(422).json({login});
        }
        const data={
            user:{
                id:user.id,
                type:user.type
            }
        };
        const authenticationToken=jwt.sign(data,secretKey);
        res.status(200).json({execution,login,authenticationToken});

    } catch (error) {
        execution=false;
        res.status(500).json({execution});
    }
});





module.exports=router;