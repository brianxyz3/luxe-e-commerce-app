const express = require("express");
const nodemailer = require("nodemailer");
const cors = require("cors");
const catchAsync = require("../shared/utlis/catchAsync");
require("dotenv").config();

const app = express();
app.use(cors());
app.use(express.json());


app.post(
  "/notification/orderConfirmation",
  catchAsync(async (req, res) => {
    const {
      cart,
      _id,
      name,
      email,
      deliveryAddress,
      totalAmount,
      paymentOption,
    } = req.body;

    const orderConfirmationEmail = {
        user: `
        <body style="padding: 10px">
            <p>Hi ${name},</p>
            <p>Thank you for shooping on Luxe!</p>
            <p>Your order {order_id} has been confirmed successfully.</p>
            <p>
                It will be packed and shipped as soon as possible. You will receive
                a notification from us once the item(s) are ready fro delivery.
            </p>
            <div>
                Please note:
                <ul style="margin-start: 50px; font-size: 10px">
                    <li>
                        You can pay with your card or bank transfer at the time of
                        delivery; simply inform our delivery agent when your order is
                        being delivered.
                    </li>
                    <li>
                        You can track yoyr Luxe order through your personal Luxe account
                        by <a href="http://localhost:8000/">clicking here</a>. If you
                        would like to cancel your order{" "}
                        <a href="http://localhost:8000/profile/orderHistory">
                            click here
                        </a>
                        . Please note your order can only be canceled prior to being
                        shipped.
                    </li>
                    <li>
                        If you ordered multiple items, you may receive them on different
                        days. this is because they are sold by different sellers on our
                        platform and we want to make each item available to you as soon
                        as possible after recieving it.
                    </li>
                </ul>
            </div>
            <div style="display: flex; gap: 5px">
                <div style="weight: 45%; padding: 5px; border-style: solid; border-size: 3px; border-color: #808080">
                    <p>
                    <strong>Estimated delivery date(s)</strong>
                    </p>
                    <p>Between </p>
                </div>
                <div style="weight: 45%; padding: 5px; border-style: solid; border-size: 3px; border-color: #808080">
                    <p>
                    <strong>Delivery address</strong>
                    </p>
                    <p>${deliveryAddress}</p>
                </div>
            </div>
            <main>
                <strong>You ordered for:</strong>
                <table>
                    <thead>
                    <tr>
                        <th>ITEM</th>
                        <th>QUANTITY</th>
                        <th>PRICE</th>
                    </tr>
                    </thead>
                    <tbody>
                    ${cart.map((item) => (
                        <tr>
                        <td>{item.productName}</td>
                        <td>{item.units}</td>
                        <td>{item.price}</td>
                        </tr>
                    ))}
                    </tbody>
                </table>

                <div style="display: flex; justify-content: space-between; padding: 5px">
                    <p>DELIVERY FEES</p>
                    <p>$150</p>
                </div>

                <div style="display: flex; justify-content: space-between; padding: 5px">
                    <p>TOTAL</p>
                    <p>${totalAmount}</p>
                </div>

                <div style="display: flex; justify-content: space-between; padding: 5px">
                    <p>PAYMENT METHOD</p>
                    <p>${paymentOption}</p>
                </div>
            </main>

            <footer>
                <p>Happy Shopping!</p>
                <p>Warm Regards,</p>
                <p>Luxe Nigeria Team.</p>
            </footer>
        </body>`
    }
    


    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: email,
      subject: `Your Luxe Store Order ${_id} has been Confirmed.`,
      text: `Hi ${name},\nThank you for shopping on Luxe\nYour order ${_id} has been confirmed successfully.\nIt will be packed and shipped as soon as possible. You will receive a notification from us once the item(s) are available for collection from ${deliveryAddress}.\n\nHappy Shopping!\nWarm Regards,\nLuxe Team.`,
      html: orderConfirmationEmail.user,
    };

    try {
      await transporter.sendMail(mailOptions);
      res.status(200).json({ message: "Email sent successfully!" });
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: "Email failed to send!" });
    }
  })
);

app.listen(5005, () => console.log("Server running on port 5005"));