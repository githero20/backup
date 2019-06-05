import React from 'react';

export const _createPaystackPopup = async (email, amount, transactionId, resolvePayment) => {
  let handler = await window.PaystackPop.setup({
    key: 'pk_test_e35e9d7fbb05d3634556f8ace73823fc484de0a3',
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