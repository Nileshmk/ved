const User = require('../models/user-model');
const mongoose = require('mongoose');
const Razorpay = require('razorpay');
var instance = new Razorpay({
  key_id: 'rzp_test_W4PXH8CkVovTDh',
  key_secret: 'keT42g75lXsG7IciGu5nFGPU',
});

instance.payments.capture('123',1,'INR')
.then((res)=>{
  console.log(res);
}).catch(
  console.error
);