const Appointment = require('../models/appointmentModel');
const notificationService = require("../services/notificationService");

exports.handleUssdRequest = async (req, res) => {
  const { sessionId, phoneNumber, text } = req.body;
  const inputs = text.split("*");
  let response = "";

  if (text === "") {
    response = `CON Welcome to Hlolimpilo
1. Book Appointment
2. View Appointment
3. Medication Reminder
4. Emergency Access`;
  } else if (text === "1") {
    response = `CON Choose Clinic:
1. City Health
2. Community Clinic`;
  } else if (text.startsWith("1*1") || text.startsWith("1*2")) {
    if (inputs.length === 2) {
      response = `CON Enter preferred date (DD-MM-YYYY):`;
    } else if (inputs.length === 3) {
      try {
        const clinic = inputs[1] === "1" ? "City Health" : "Community Clinic";
        const date = inputs[2];
        await Appointment.create({ phone_number: phoneNumber, clinic, date });
        response = `END Appointment booked at ${clinic} on ${date}.`;
      } catch (err) {
        console.error('DB error', err);
        response = `END We could not book your appointment. Try again later.`;
      }
    }
  } else if (text === "2") {
    try {
      const appt = await Appointment.findOne({ phone_number: phoneNumber }).sort({ created_at: -1 }).lean();
      response = appt
        ? `END Your appointment is at ${appt.clinic} on ${appt.date}.`
        : `END No active appointment found.`;
    } catch (err) {
      console.error('DB error', err);
      response = `END Could not retrieve appointment.`;
    }
  } else if (text === "3") {
    response = `END A daily medication reminder has been activated.`;
    notificationService.sendSms(phoneNumber, "Your Hlolimpilo medication reminder is active.");
  } else if (text === "4") {
    response = `END Emergency team will contact you shortly.`;
    notificationService.alertEmergency(phoneNumber);
  } else {
    response = `END Invalid option. Please try again.`;
  }

  res.set("Content-Type", "text/plain");
  res.send(response);
};
