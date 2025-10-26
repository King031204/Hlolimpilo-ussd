const africastalking = require("../config/africastalking");
const sms = africastalking.SMS;

exports.sendSms = async (phoneNumber, message) => {
  try {
    await sms.send({ to: [phoneNumber], message });
    console.log(`SMS sent to ${phoneNumber}`);
  } catch (err) {
    console.error("SMS Error:", err);
  }
};

exports.alertEmergency = async (phoneNumber) => {
  const alertMessage = `Emergency alert from ${phoneNumber}. Immediate assistance required.`;
  const emergencyContacts = ["+27831234567"]; // healthcare team
  try {
    await sms.send({ to: emergencyContacts, message: alertMessage });
    console.log("Emergency alert sent");
  } catch (err) {
    console.error("Emergency alert error:", err);
  }
};
