var Ticket = require("../models/ticket");
const reviewsController = require("../controllers/reviews");
const destinationsController = require("../controllers/destinations");

// create a new ticket
const addTicket = (req, res, next) => {
  var ticket = new Ticket(req.body);
  ticket.save(function (err, ticket) {
    if (err) {
      return res.status(500).send({ error_message: err.message });
    }
    res.status(201).json(ticket);
  });
};


//return all the ticket
const getAllTickets = (req, res, next) => {
  Ticket.find(function (err, tickets) {
    if (err) {
      return res.status(500).send({ error_message: err.message });
    }
    if (tickets === null) {
      return res.status(404).json({ message: "Tickets are empty!" });
    }

    res.status(200).json({ tickets: tickets });
    }).populate([{
        path: 'destinations._id',
        model: 'destinations'
    }
     ])
 }

// Delete all tickets
const deleteAllTicket = (req, res, next) => {
  Ticket.deleteMany(function (err, tickets) {
    if (err) {
      return res.status(500).send({
        error_message:
          err.message || "Some error occurred while creating the Programe.",
      });
    }
    if (tickets === null) {
      return res.status(404).json({ message: "Tickets are empty" });
    }
    res.status(200).json({ message: "Successfully Deleted", status: 200 });
  });
};
// Delete a ticket with given ID

const deleteTicket = (req, res, next) => {
  const ticket_id = req.params.ticket_id;
  console.log(ticket_id);

  Ticket.findOneAndDelete(ticket_id, function (err, ticket) {
    if (err) {
      return res.status(500).send({
        error_message:
          err.message || "Some error occurred while creating the Programe.",
      });
    }
    if (ticket === null) {
      return res.status(404).json({ message: "Ticket not found!" });
    }
    // status code
    res.status(200).json({ ticket, message: "Successfully Deleted" });
  });
};

// return a ticket

const getTicket = (req, res, next) => {
  const ticket_id = req.params.ticket_id;
  console.log(ticket_id);

  Ticket.findById(ticket_id, function (err, ticket) {
    if (err) {
      return res.status(500).send({
        error_message:
          err.message || "Some error occurred while creating the Programe.",
      });
    }
// Ticket.find({ destination: destination._id }).exec(function (err, tickets) {
//        if (err) return handleError(err);
//     console.log('The stories are an array: ', stories);
//   });

    if (ticket === null) {
      return res.status(404).json({ message: "Ticket is not found " });
    }
    res.status(200).json({ tickets: ticket });
  });
};
// update the ticket with given ID
const updateTicketWithPut = (req, res, next) => {
  const ticket_id = req.params.ticket_id;
  Ticket.findOneAndReplace(ticket_id).exec(function (err, ticket) {
    if (err) {
      return res.status(500).send({
        error_message: err.message,
      });
    }
    if (ticket === null) {
      return res.status(400).json({ message: "Ticket not found" });
    }
    ticket.price = req.body.price;
    ticket.time = req.body.time;
    ticket.save();
    // status code
    res.status(200).json({ ticket, message: "The ticket has been updated" });
  });
};

// Partially update the ticket with given ID
const updateTicketWithPatch = (req, res, next) => {
  const ticket_id = req.params.ticket_id;

  Ticket.findOneAndUpdate(ticket_id).exec(function (err, ticket) {
    if (err) {
      return res.status(500).send({
        error_message:
          err.message || "Some error occurred while creating the Programe.",
      });
    }
    if (ticket === null) {
      return res.status(404).json({ message: "Ticket not found" });
    }
    ticket.price = req.body.price || ticket.price;
    ticket.time = req.body.time || ticket.time;
    ticket.save();
    // status code
    res.status(200).json({ ticket, message: "The ticket has been updated" });
  });
};

module.exports = {
  addTicket,
  getAllTickets,
  deleteAllTicket,
  deleteTicket,
  getTicket,
  updateTicketWithPut,
  updateTicketWithPatch,
};

var express = require("express");
const router = require("express").Router();

//tickets endpint
router.post("/", addTicket);
router.get("/", getAllTickets);
router.delete("/", deleteAllTicket);
router.delete("/:ticket_id", deleteTicket);
router.get("/:ticket_id", getTicket);
router.patch("/:ticket_id", updateTicketWithPatch);
router.put("/:ticket_id", updateTicketWithPut);


//reviews endpoint
router.post("/:ticket_id/reviews", reviewsController.createTicketReview);
router.get("/:ticket_id/reviews", reviewsController.getAllReviewsForATicket);
router.get(
  "/:ticket_id/reviews/:review_id",
  reviewsController.getSpecificReviewForATicket
);
router.put("/:ticket_id/reviews/:review_id", reviewsController.editReview);
router.patch(
  "/:ticket_id/reviews/:review_id",
  reviewsController.updateReviewWithPatch
);

router.delete(
  "/:ticket_id/reviews/:review_id",
  reviewsController.deleteOneReview
);
router.delete(
  "/:ticket_id/reviews/:review_id",
  reviewsController.deleteAllReviews
);
// Destinations endpoint
router.post(
  "/:ticket_id/destinations",
  destinationsController.createTicketDestination
);
router.get(
  "/:ticket_id/destinations",
  destinationsController.getAllDestinationForAnTicket
);
router.get(
  "/:ticket_id/destinations/:destination_id",
  destinationsController.getSpecificDestinationForAticket
);
router.put(
  "/:ticket_id/destinations/:destination_id",
  destinationsController.updateDestinationWithPut
);
router.patch(
  "/:ticket_id/destinations/:destination_id",
  destinationsController.updateDestinationWithPatch
);
router.delete(
  "/:ticket_id/destinations/:destination_id",
  destinationsController.deleteDestination
);

module.exports = router;
