import React from 'react';

export const _createPaystackPopup = async (email, amount, transactionId, resolvePayment) => {
  let handler = await window.PaystackPop.setup({
    key: process.env.REACT_APP_PAYSTACK_KEY,
    email,
    amount,
    currency: "NGN",
    ref: transactionId, 
    callback: function(response){
        resolvePayment(response);
        // let r = await response;
        console.log(response);
        return Promise.resolve(response);
        // alert('success. transaction ref is ' + response.reference);
    },
    onClose: function(){
        return null;
        // alert('window closed');
    }
  });
  handler.openIframe();
};