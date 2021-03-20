const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);
const uuid = require("uuid/v4");

exports.makePayment = (req, res) => {
  const { token } = req.body;
  const idempotencyKey = uuid();

  //CREATE A CUSTOMER
  return stripe.customers
    .create({
      email: token.email,
      source: token.id,
    })
    .then((customer) => {
      //CHARGE A CUSTOMER
      stripe.charges
        .create(
          {
            amount: token.amount,
            currency: "usd",
            customer_id: customer.id,
            receipt_email: token.email,
          },
          { idempotencyKey }
        )
        .then((result) => {
          return res.status(200).json({ result });
        })
        .catch((error) => {
          return res
            .status(500)
            .json({ error: "Failed to charge the customer!" });
        });
    })
    .catch((error) => {
      return res.status(500).json({ error: "Failed to create a customer!" });
    });
};
