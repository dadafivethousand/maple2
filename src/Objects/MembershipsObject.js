  const Memberships = {adult:[
    {type: '1 Week Free Trial', price: 0,     billed: 'No commitment trial', paymentLink: 'https://buy.stripe.com/8wMbMr5jPdV9dHO004', promo: false, free: true },
    {type: '6 Month Membership', price: 800,     billed: 'one time payment', paymentLink: 'https://buy.stripe.com/8wMbMr5jPdV9dHO004', promo: true, free: false },
    {type: 'Monthly Membership', price: 170, cancel: 'Cancel any time', billed: 'per month', paymentLink: 'https://buy.stripe.com/28o5o327D3gv47e147', promo: false, free: false },
    {type: 'Single Class', price: 30,  billed: 'One time payment', paymentLink: 'https://buy.stripe.com/4gw4jZ9A57wLavC6op', promo: false, free: false },
  ], 
kids:
 [
    {type: 'Monthly', price: 200, billed: 'every month', cancel: 'Cancel any time'},
    {type: '3 Months ', price: 580, billed: 'every 3 months' , cancel: 'Cancel any time' }, // Equivalent to $210/month
    {type: '6 Months', price: 1000, billed: 'every 6 months',  cancel: 'Cancel any time'}, // Equivalent to $200/month
    {type: '12 Months', price: 1800, billed: 'every 12 months', cancel: 'Cancel any time' }, // Equivalent to ~$183/month
    {type: 'One Class', price: 25,   },
    {type: '10 Classes', price: 200  },
],



}

export default Memberships;
