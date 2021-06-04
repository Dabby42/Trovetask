import asyncHandler from '../middleware/asyncHandler';
import User from '../models/User';
import moment from 'moment';

var Paydown = require('paydown');

let payments_array = []
const calculator = new Paydown()
let amount;

export const takeLoan = asyncHandler(async (req, res, next) => {
    const {startDate, endDate, principal} = req.body;
    await User.findByIdAndUpdate({_id:req.user._id}, {loanAmount: principal});
    const diff = monthDiff(startDate, endDate);
    amount = parseInt(principal, 10)/(diff + 1);
    
    var init_data = {
        "start_date": `${moment(startDate).date()}.${moment(startDate).month() + 1}.${moment(startDate).year()}`,
        "end_date": `${moment(endDate).date()}.${moment(endDate).month() + 1}.${moment(endDate).year()}`,
        "principal": parseInt(principal, 10),
        "rate": 2.5,
        "recurring":{
            "amount": amount,
            "first_payment_date": `31.${moment(startDate).month() + 1}.${moment(startDate).year()}`,
            "payment_method": "equal_reduction", 
            "payment_day": 31
        }
        
    }
    let rval_obj = calculator.calculate(init_data, "", payments_array);
    for( var i = 0; i < payments_array.length; i++ )
    {
        console.log( JSON.stringify( payments_array[i] ))
    }
    return res.status(201).json({
        status: 200,
        success: true,
        data: rval_obj,
        message: 'New borrower created successfully'
    })
})

const monthDiff = (d1, d2) => {
    d1 = new Date(d1);
    d2 = new Date(d2)
    var months;
    months = (d2.getFullYear() - d1.getFullYear()) * 12;
    months -= d1.getMonth();
    months += d2.getMonth();
    return months <= 0 ? 0 : months;
}

