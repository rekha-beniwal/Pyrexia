import axios from "axios";
import { BASE_URL } from "../BaseUrl";
import img from "../Images/Logo.png";


export const checkoutHandler = async (amount, userEmail, eventName, callback, navigate) => {
  try {
    const { data: { key } } = await axios.get(`${BASE_URL}/api/getkey`);
    const { data: { order } } = await axios.post(`${BASE_URL}/api/checkout`, { amount });

    const options = {
      key,
      amount: order.amount,
      currency: "INR",
      name: "Pyrexia",
      description: "Aiims Rishikesh Fest",
      image: { img },
      order_id: order.id,
      callback_url: `${callback}`,
      prefill: {
        name: "",
        email: userEmail,
        contact: "",
      },
      notes: {
        address: "Aiims Rishikesh",
      },
      theme: {
        color: "#001f3f",
      },
      handler: async function (response) {
        // Capture the payment response from Razorpay
        const paymentData = {
          razorpay_order_id: response.razorpay_order_id,
          razorpay_payment_id: response.razorpay_payment_id,
          razorpay_signature: response.razorpay_signature,
          amount:amount,
          email: userEmail,
          eventName:eventName,
        };

        // Send payment data and additional details to your backend
        try {
          const result = await axios.post(`${callback}`, paymentData);
          // console.log("Payment verified:", result.data);
          navigate("/profile");

        } catch (error) {
          console.log("Error verifying payment:",error);
        }
      },
      modal: {
        ondismiss: function () {
          alert("Payment popup closed.");
        },
      },
    };

    const razor = new window.Razorpay(options);
    razor.open();
  } catch (error) {
    alert("Error in checkoutHandler:", error);
  }
};
