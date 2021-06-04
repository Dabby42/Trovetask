import asyncHandler from '../middleware/asyncHandler';
import Payment from '../models/Payment';
import User from '../models/User';
import {initializePayment, verifyPayment} from '../utils/payments';

export const payLoan = (asyncHandler(async (req, res) => {
    const {amount, email} = req.body;
    const { firstName, _id } = req.user;
    const form = {
        amount: amount*100,
        email,
        metadata:{
            user : firstName
        }
    }
    const user = await User.findById({_id});
    user.loanAmount = String(parseInt(user.loanAmount, 10) - parseInt(amount, 10));
    await user.save();
    initializePayment(form, (err, body)=>{
       const response = JSON.parse(body);
        return res.status(200).json({
            status: 200,
            success: true,
            data: response,
            message: 'Loan payment initialized successfully'
        })
    });

}));

export const verifyPay = ( (req,res) => {
    const ref = req.query.reference;
    verifyPayment(ref, asyncHandler(async (error,body)=>{
        let response = JSON.parse(body);
        
        const {reference, amount, customer:{email}, metadata:{user}} = response.data;
        let newPayment = {reference, amount, email, user}
        const payment = new Payment(newPayment);
        await payment.save();

        return res.status(200).json({
            status: 200,
            success: true,
            data: newPayment,
            message: 'Payment verified successfully'
        })
    }));
    
});