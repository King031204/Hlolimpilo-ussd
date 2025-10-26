// Mock in-memory database
const appointments = [];

exports.create = (phoneNumber, clinic, date) => {
  appointments.push({ phoneNumber, clinic, date });
};

exports.getByPhone = (phoneNumber) => {
  return appointments.find((a) => a.phoneNumber === phoneNumber);
};
