'use strict';

/**
 * Read the documentation (https://strapi.io/documentation/v3.x/concepts/controllers.html#core-controllers)
 * to customize this controller
 */

 const stripe = require('stripe')('sk_test_51LjKcjDGXEv1Ev4p3r1qftpJWwcYTYU7aklFPIWQK3RdzGXGhjvHDBXz0ttEdbLmAjFY4yHNWybY81SskwSKR5Ay00vcMFvfnl');


module.exports = {

  create: async (ctx) => {
    const {address, amount, items, token } = JSON.parse(ctx.request.body);
    const charge = await stripe.charges.create({
      amount: amount,
      currency: 'jpy',
      source: token,
      description: `Order ${new Date()} by {ctx.state.user._id}`,
    }); 

    const order = await strapi.services.order.create({
      user: ctx.state.user._id,
      charge_id: charge.id,
      amount: amount,
      address,
      items,
    });

    return order;
  },
};
