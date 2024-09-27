  const Memberships = {adult:[
    {type: 'Monthly', price: 220, billed: 'every month', cancel: 'Cancel any time'},
 
    {type: '3 Months ', price: 630, billed: 'every 3 months' , cancel: 'Cancel any time' }, // Equivalent to $210/month
    {type: '6 Months', price: 1200, billed: 'every 6 months',  cancel: 'Cancel any time'}, // Equivalent to $200/month
    {type: '12 Months', price: 2200, billed: 'every 12 months', cancel: 'Cancel any time' }, // Equivalent to ~$183/month
    {type: 'One Class', price: 30,   },
    {type: '10 Classes', price: 250  },
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
