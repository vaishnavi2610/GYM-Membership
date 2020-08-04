//imports
const express = require('express');
const router = express.Router();
//authentication
const { ensureAuthenticated } = require('../config/auth')

//about us
router.get('/',ensureAuthenticated,(req,res)=>{
    res.render("home",{user:req.user});//details passing to home
});

//details page
router.get('/details',ensureAuthenticated,(req,res)=>{
    res.render("mydetails",{user:req.user});//details page
});

//payment page
router.get('/payment',ensureAuthenticated,(req,res)=>{
    res.render("payment",{user:req.user});//payment page
});

//making payment
router.post('/payment',ensureAuthenticated,(req,res)=>{
    const { accno, cvv, amount} = req.body;//details from user
    let errors = []//0errors
    if(accno.match(/^[0-9]+$/) === null || accno.length !== 16){
        errors.push({msg:'Enter Valid ACCNo.It should be 16 Digits.'})
    }
    if(cvv.match(/^[0-9]+$/) === null || cvv.length !== 3){
        errors.push({msg:'Enter Valid CVV.It should be 3 Digits.'})
    }
    if(amount.match(/^[0-9]+$/) === null){
        errors.push({msg:'Select Valid Training Type.'})
    }

    if(errors.length>0){
        res.render("payment",{
            accno,
            cvv,
            amount,
            errors//sendings errors
        })
    }else{
        errors.push({msg:"Payment Succesfull."})
        res.render("payment",{
            errors//payment successful
        })
    }
})

module.exports = router;