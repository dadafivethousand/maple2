  const Memberships = {adult:[
    {type: '1 Week Free Trial', price: 0,     billed: 'No commitment trial', paymentLink: 'https://buy.stripe.com/8wMbMr5jPdV9dHO004', promo: false, free: true },
     {type: 'Monthly Membership', price: 170, cancel: 'Cancel any time', billed: 'per month', paymentLink: 'https://buy.stripe.com/28o5o327D3gv47e147', promo: false, free: false },
    {type: 'Single Class', price: 30,  billed: 'One time payment', paymentLink: 'https://buy.stripe.com/4gw4jZ9A57wLavC6op', promo: false, free: false },
  ], 
kids:
[
  {type: '1 Week Free Trial', price: 0,     billed: 'No commitment trial', paymentLink: 'https://buy.stripe.com/8wMbMr5jPdV9dHO004', promo: false, free: true},
   {type: 'Monthly Membership', price: 160, cancel: 'Cancel any time', billed: 'per month', paymentLink: 'https://buy.stripe.com/8wMeYD9A57wL1Z63ch', promo: false, free: false},
  {type: 'Single Class', price: 30,  billed: 'One time payment', paymentLink: 'https://buy.stripe.com/4gw4jZ9A57wLavC6op', promo: false, free: false},
], 
private:
[
    {type: '1-on-1 Private', price: 140, billed: 'Per session', paymentLink: 'https://maplejiujitsu.setmore.com/', promo: false, free: false},
  {type: '2-on-1 Semi-Private', price: 180,  billed: 'Per session', paymentLink: 'https://maplejiujitsu.setmore.com/', promo: false, free: false},
], 
}

export default Memberships;
