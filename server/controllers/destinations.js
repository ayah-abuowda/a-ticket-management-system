const Destination = require("../models/destination");
const Ticket = require("../models/ticket");

const createTicketDestination = (req, res, next) => {
  const ticket_id = req.params.ticket_id;

  Ticket.findById(ticket_id, function (err, ticket) {
    if (err) {
      return res.status(500).send({ error_message: err.message });
    }
    if (ticket === null) {
      return res.status(404).json({ message: "Ticket is not found" });
    }
    var destination = new Destination(req.body);
    destination.ticket = ticket_id;
    destination.save();
    ticket.destination = destination._id;
    ticket.save();
    res.status(201).json({
      "destinations ": destination,
      message: "The Destination has been created!",
    });
  });
};

const getAllDestinationForAnTicket = (req, res, next) => {
  const ticket_id = req.params.ticket_id;

  Destination.find({ ticket: { $eq: ticket_id } }, function (err, destination) {
    if (err) {
      return res.status(500).send({ error_message: err.message });
    }
    if (destination === null) {
      return res
        .staus(404)
        .json({ message: "There are no destination for this ticket!" });
    }
    res.status(200).json({ "destinations ": destination });
  });
};

const getSpecificDestinationForAticket = (req, res, next) => {
  const destination_id = req.params.destination_id;
  const ticket_id = req.params.ticket_id;
  console.log(destination_id);
  console.log(ticket_id);

  Destination.findById(destination_id, function (err, destination) {
    if (err) {
      return res.status(500).send({ error_message: err.message });
    }
    if (destination === null) {
      return res.status(404).json({ message: "Destination is not found!" });
    }
    if (ticket_id != destination.ticket) {
      return res.status(404).json({
        "message ": "This ticket does not belong to this destination ",
      });
    }
    res.status(200).json({ "destinations ": destination });
  });
};

const deleteDestination = (req, res, next) => {
  const destination_id = req.params.destination_id;
  const ticket_id = req.params.ticket_id;

  Destination.findOneAndDelete(
    { _id: destination_id },
    function (err, destination) {
      if (err) {
        return res.status(500).send({ error_message: err.message });
      }
      if (destination === null) {
        return res
          .status(404)
          .json({ "message ": "Destination is not found!" });
      }
      if (ticket_id != destination.ticket) {
        return res
          .status(404)
          .json({ message: "This ticket does not belong to this destination" });
      }

      res.status(200).json({ "message ": "Sucessfully deleted !" });
    }
  );
};

const deleteAllDestinationForAnTicket = (req, res, next) => {
  const ticket_id = req.params.ticket_id;
  const destination_id = req.params.destination_id;

  Destination.findById(destination_id).exce(function (err, destination) {
    if (err) {
      return res.status(500).send({ error_message: err.message });
    }
    if (destination === null) {
      return res.status(404).json({ message: "Ticket is not found!" });
    }
    Ticket.deleteMany(
      { destination: { $eq: destination_id } },
      function (err, ticket) {
        if (err) {
          return res.status(500).send();
        }
        if (destination === null) {
          return res
            .staus(404)
            .json({ message: "There are no destination for this ticket!" });
        }
        if (ticket_id != destination.ticket) {
          return res.status(404).json({
            message: "This ticket does not belong to this destination",
          });
        }
        res.status(200).json({ "message ": "Sucessfully deleted !" });
      }
    );
  });
};

// update the ticket destination with given ID

const updateDestinationWithPut = (req, res, next) => {
  const destination_id = req.params.destination_id;
  const ticket_id = req.params.ticket_id;

  Destination.findById(destination_id, function (err, destination) {
    if (err) {
      return res.status(500).send({
        error_message:
          err.message || "Some error occurred while creating the Programe.",
      });
    }
    if (destination === null) {
      return res.status(400).json({ message: "Destination not found!" });
    }
    // if(ticket_id != destination.ticket){
    //     return res.status(404).json({"message" : "This ticket does not belong to this destination"});
    // }

    destination.streetName = req.body.streetName;
    destination.streetNumber = req.body.streetNumber;
    destination.postCode = req.body.postCode;
    destination.city = req.body.city;
    destination.save();
    res.status(200).json({ destinations: destination });
  });
};

const updateDestinationWithPatch = (req, res, next) => {
  const destination_id = req.params.destinaion_id;
  const ticket_id = req.params.ticket_id;

  Destination.findById(destination_id).exce(function (err, destination) {
    if (err) {
      return res.status(500).send({
        error_message:
          err.message || "Some error occurred while creating the Programe.",
      });
    }
    if (destination === null) {
      return res.status(404).json({ "message ": "destiantion not found!" });
    }
    if (ticket_id != destination.ticket) {
      return res
        .staus(404)
        .json({ "message ": "This ticket is not belong to this ticket" });
    }
    destination.streetName = req.body.streetName || destination.streetName;
    destination.streetNumber =
      req.body.streetNumber || destination.streetNumber;
    destination.postCode = req.body.postCode || destination.postCode;
    destination.city = req.body.city || destination.city;

    destination.save();
    res.status(201).json({ destinations: destination });
  });
};
module.exports = {
  createTicketDestination,
  getAllDestinationForAnTicket,
  getSpecificDestinationForAticket,
  deleteAllDestinationForAnTicket,
  deleteDestination,
  updateDestinationWithPut,
  updateDestinationWithPatch,
};
