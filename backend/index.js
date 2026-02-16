import express from "express";
import axios from "axios";
import dotenv from "dotenv";
import cors from "cors";


dotenv.config();

const app = express();

app.use(cors())
app.use(express.json()); // ✅ REQUIRED
app.use(express.urlencoded({ extended: true }));


// 🔐 Get M-Pesa OAuth Token
async function getAccessToken() {
  const auth = Buffer.from(
    `${process.env.CONSUMER_KEY}:${process.env.CONSUMER_SECRET}`
  ).toString("base64");

  const response = await axios.get(
    "https://sandbox.safaricom.co.ke/oauth/v1/generate?grant_type=client_credentials",
    {
      headers: {
        Authorization: `Basic ${auth}`
      }
    }
  );

  return response.data.access_token;
}
// success screen route
app.get("/success", (req, res) => {
  const now = new Date();

  // Convert to Kenya local time (UTC +3)
  let kenyaHour = now.getUTCHours() + 3;
  if (kenyaHour >= 24) kenyaHour -= 24; // wrap around 24h

  // Determine period
  const period = kenyaHour >= 5 && kenyaHour < 18 ? "morning" : "evening";

  res.send(`
    <html>
      <body style="font-family:sans-serif;text-align:center;padding:40px">
        <h2>✅ Request Sent</h2>
        <p style="color:#0f9d58;font-weight:600;">You have successfully entered the ${period} bet.</p>
      </body>
    </html>
  `);
});



app.get("/pay/1100", (req, res) => {
  res.send(`
    <!DOCTYPE html>
    <html lang="en">
      <head>
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>Pay KES 1,000</title>
        <style>
          body {
            margin: 0;
            min-height: 100vh;
            display: flex;
            align-items: center;
            justify-content: center;
            background: linear-gradient(135deg, #0f9d58, #34a853);
            font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
          }

          .card {
            background: #ffffff;
            padding: 32px 28px;
            border-radius: 14px;
            width: 100%;
            max-width: 360px;
            box-shadow: 0 20px 40px rgba(0, 0, 0, 0.15);
            text-align: center;
          }

          h2 {
            margin: 0 0 10px;
            color: #0f9d58;
            font-size: 26px;
          }

          p {
            margin: 0 0 24px;
            color: #555;
            font-size: 14px;
          }

          input {
            width: 100%;
            padding: 14px;
            font-size: 16px;
            border-radius: 8px;
            border: 1px solid #ccc;
            outline: none;
            margin-bottom: 20px;
          }

          input:focus {
            border-color: #0f9d58;
          }

          button {
            width: 100%;
            padding: 14px;
            font-size: 18px;
            font-weight: 600;
            border: none;
            border-radius: 10px;
            background: #0f9d58;
            color: white;
            cursor: pointer;
          }

          button:hover {
            background: #0c7c46;
          }

          .footer {
            margin-top: 18px;
            font-size: 12px;
            color: #888;
          }
        </style>
      </head>

      <body>
        <div class="card">
          <h3>Pay KES 1,000</h3>
          <h3>Kitty Classic at Muthaiga</h3>
          <p>Enter your M-Pesa number to continue</p>

          <form method="POST" action="/pay/1100">
            <input
              name="phone"
              placeholder="2547XXXXXXXX"
              required
            />

            <button type="submit">
              Pay with M-Pesa
            </button>
          </form>

          <div class="footer">
            Secure M-Pesa Express Payment
          </div>
        </div>
      </body>
    </html>
  `);
});


// 💰 STK Push
const normalizePhone = (phone) => {
  if (phone.startsWith("0")) {
    return "254" + phone.slice(1);
  }
  return phone;
};

app.post("/pay/1100", async (req, res) => {
  try {
    const { phone } = req.body; // 2547XXXXXXXX
    if (!phone) {
      return res.status(400).json({ error: "Phone number required" });
    }

    const timestamp = new Date()
      .toISOString()
      .replace(/[-T:\.Z]/g, "")
      .slice(0, 14);

    const password = Buffer.from(
      `${process.env.SHORTCODE}${process.env.PASSKEY}${timestamp}`
    ).toString("base64");

    const accessToken = await getAccessToken(); // ✅ FIX

    const response = await axios.post(
      "https://sandbox.safaricom.co.ke/mpesa/stkpush/v1/processrequest",
      {
        BusinessShortCode: process.env.SHORTCODE,
        Password: password,
        Timestamp: timestamp,
        TransactionType: "CustomerPayBillOnline",
        Amount: 1,
        PartyA: normalizePhone(phone),
        PartyB: process.env.SHORTCODE,
        PhoneNumber: normalizePhone(phone),
        CallBackURL: process.env.CALLBACK_URL,
        AccountReference: "Kitty Classic",
        TransactionDesc: "KES 1100 Payment"
      },
      {
        headers: {
          Authorization: `Bearer ${accessToken}`
        }
      }
    );

 res.redirect("/success");

  } catch (error) {
    console.error(error.response?.data || error.message);
    res.status(500).json({
      success: false,
      error: "Payment initiation failed"
    });
  }
});

// 🚀 Start server
const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
