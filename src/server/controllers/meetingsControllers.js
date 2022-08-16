const getAllMeetings = (req, res, next) => {
  res.status(200).json({ message: "Llego aqui la request" });
};

module.exports = getAllMeetings;
