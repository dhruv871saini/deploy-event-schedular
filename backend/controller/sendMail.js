import nodemailer from "nodemailer";
import dotenv from "dotenv";
import eventModel from "../models/eventModels.js";

dotenv.config();

// transporter create karege ki nodemailer ki service and auth ek object me aa jaye
const transporter = nodemailer.createTransport({
  service: "Gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
  // debug:true,
});

const sendEmail = async (eventid) => {
  try {
    const event = await eventModel
      .findById(eventid)
      .populate("userId", "userEmail");

    if (!event || !event.userId) {
      console.log("Event or userId not found");
      return;
    }

    const { userEmail } = event.userId;
    const { names, date, time, location, description, category } = event;

    if (!names || !date || !time || !location || !description) {
      console.log("Event details are incomplete, email not sent");
      return;
    }


    // Configure mail options
    const mailOptions = {
      // from: `Event Reminder <${process.env.EMAIL_USER}>`,
      from: `Event Reminder <dhruvsaini871@gmail.com>`,
      to: userEmail,
      subject: `Reminder: ${names}`,
      html: `
                <h3>Event Reminder</h3>
                <p><b>Event Name:</b> ${names}</p>
                <p><b>Date:</b> ${(new Date(date)).toDateString()}</p>
                <p><b>Time:</b> ${time}</p>
                <p><b>Location:</b> ${location}</p>
                <p><b>Description:</b> ${description}</p>
                 <p><b>Category:</b> ${category}</p>
            `,
    };

    // Send the email
    const info = await transporter.sendMail(mailOptions);
    console.log("Email sent successfully:", info.messageId);
  } catch (error) {
    console.error("Error sending email:", error);
  }
};

export default sendEmail;
