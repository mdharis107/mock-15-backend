const { TicketModel } = require("../models/Ticket.modle");

const postTicket = async (req, res) => {
  const { category, title, message, userId } = req.body;
  const ticket = new TicketModel({
    category,
    title,
    message,
    userId,
  });

  try {
    await ticket.save();
    res.send("Ticket Created");
  } catch (err) {
    console.log(err);
    res.send("Something went wrong");
  }
};

const getTicket = async (req, res) => {
//   const { category } = req.body;
  const tickets = await TicketModel.find();
  res.send(tickets);
};

module.exports = { postTicket, getTicket };
