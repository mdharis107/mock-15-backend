const { Router } = require("express");
const { getTicket, postTicket } = require("../controller/ticket.controller");

const TicketController = Router()

TicketController.get("/",getTicket)

TicketController.post("/addTicket",postTicket)

module.exports = {
    TicketController
}