import { useState } from "react";
import axios from "axios";
import { QRCodeCanvas } from "qrcode.react";

export default function QRCodePage() {
  const [phone, setPhone] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const pay = async () => {
    if (!phone) {
      setMessage("❗ Enter your phone number");
      return;
    }

    try {
      setLoading(true);
      setMessage("");
      await axios.post("https://qrbackend-zuxt.onrender.com/pay/1100", {
      // await axios.post("https://2718-2c0f-2f00-56-f940-61b0-c123-f56-f087.ngrok-free.app/pay/1100", {
        phone
      });

      setMessage("📲 Check your phone to complete payment");
    } catch (err) {
      setMessage("❌ Payment failed. Try again.");
    } finally {
      setLoading(false);
    }
  }; 

  return (
    <div style={styles.container}>
      <h2>Pay KES 1,000</h2>

      {/* QR Code */}
      <QRCodeCanvas
      value="https://qrbackend-zuxt.onrender.com/pay/1100"
        //value="https://2718-2c0f-2f00-56-f940-61b0-c123-f56-f087.ngrok-free.app/pay/1100"
        size={220}
      />

      <p style={{ textAlign: "center", maxWidth: 260 }}>
        Scan the QR code or enter your phone number below
      </p>

      {/* Phone Input */}
      <input
        style={styles.input}
        placeholder="2547XXXXXXXX"
        value={phone}
        onChange={(e) => setPhone(e.target.value)}
      />

      {/* Pay Button */}
      <button
        onClick={pay}
        disabled={loading}
        style={styles.button}
      >
        {loading ? "Processing..." : "Pay KES 1000"}
      </button>

      {/* Status Message */}
      {message && <p>{message}</p>}
    </div>
  );
}

const styles = {
  container: {
    minHeight: "100%",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    gap: "14px"
  },
  input: {
    padding: 10,
    width: 220,
    fontSize: 16
  },
  button: {
    padding: "10px 22px",
    fontSize: 16,
    cursor: "pointer",
    background: "#11ac09",
    color: "#fff",
  }
};
