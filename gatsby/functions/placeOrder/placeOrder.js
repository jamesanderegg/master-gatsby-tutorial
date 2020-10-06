const nodemailer = require('nodemailer');

function generateOrderEmail({ order, total }) {
  return `<div>
  <h2>Your Recent order for ${total}</h2>
  <p>Your order will be ready in the next 20 minutes</p>
  <ul>
  ${order
    .map(
      (item) => `<li>
    <img src="${item.thumbnail}" alt="${item.name}"/>
    ${item.size} ${item.name} - ${item.price}
  </li>`
    )
    .join('')}
  </ul>
  <p> Your total is <strong>$${total}</strong> due at pickup.</p>
  <style>
    ul {
      list-style: none;
    } {</style>
  </div>`;
}
// create transport for node mailer

const transporter = nodemailer.createTransport({
  host: process.env.MAIL_HOST,
  port: 587,
  auth: {
    user: process.env.MAIL_USER,
    pass: process.env.MAIL_PASS,
  },
});

function wait(ms = 0) {
  return new Promise((resolve, reject) => {
    setTimeout(resolve, ms);
  });
}

exports.handler = async (event, context) => {
  await wait(2000);
  const body = JSON.parse(event.body);
  console.log(body);
  // validate the data coming in is correct
  const requiredFields = ['email', 'name', 'order'];
  // using for each will create another function scope so we dont use
  for (const field of requiredFields) {
    console.log(`Checking ${field}`);
    if (!body[field]) {
      return {
        statusCode: 400,
        body: JSON.stringify({
          message: `Oops! your missing the ${field} field)`,
        }),
      };
    }
  }
  // make sure they actually have items in the order
  if (!body.order.length) {
    return {
      statusCode: 400,
      body: JSON.stringify({
        message: `Why would you order nothing?!`,
      }),
    };
  }
  // send the email

  // send the succerss or error message
  // test send an email
  const info = await transporter.sendMail({
    from: "Slick's Slices <slick@example.com>",
    to: `${body.name} <${body.email}> orders@example.com`,
    subject: 'New Order!',
    html: generateOrderEmail({ order: body.order, total: body.total }),
  });
  console.log(info);
  return {
    statusCode: 200,
    body: JSON.stringify({ message: 'Success' }),
  };
};
