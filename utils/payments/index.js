import asyncHandler from '../../middleware/asyncHandler';
import request from 'request';

const MySecretKey = process.env.PAYSTACK_SECRET_KEY
    
export const initializePayment = (asyncHandler (async (form, mycallback) => {
    const option = {
        url : process.env.PAYSTACK_INITIALIZE_URI,
        headers : {
            authorization: `Bearer ${MySecretKey}`,
            'content-type': 'application/json',
            'cache-control': 'no-cache'
        },
        form
    }
    const callback = (error, response, body)=>{
        return mycallback(error, body);
    }
    request.post(option, callback);
}));

export const verifyPayment = (asyncHandler ( async (ref,mycallback) => {
    const option = {
        url : process.env.PAYSTACK_VERIFY_URI + encodeURIComponent(ref),
        headers : {
            authorization: `Bearer ${MySecretKey}`,
            'content-type': 'application/json',
            'cache-control': 'no-cache'
        }
    }
    const callback = (error, response, body)=>{
        return mycallback(error, body);
    }
    request(option, callback);
}));