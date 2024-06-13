const Review = require("../models/review");
const Ticket = require("../models/ticket");

//Create a review for a ticket.
const createTicketReview = (req, res, next) => {
  const ticket_id = req.params.ticket_id;

  Ticket.findById(ticket_id, function (err, ticket) {
    if (err) {
      return res.status(500).send({
        error_message: err.message,
      });
    }
    if (ticket === null) {
      return res.status(404).json({ message: "Ticket is not found" });
    } 
    var review = new Review(req.body);
    review.ticket = ticket_id;
    review.save();
    ticket.review = review._id;
    ticket.save();
    res.status(201).json({
      "reviews ": review,
      message: "The Review has been created!",
    });
  });
};

//Return  asingle review for a ticket.
const getSpecificReviewForATicket = (req, res, next) => {
  const review_id = req.params.review_id;
  const ticket_id = req.params.ticket_id;
  console.log(ticket_id);
  console.log(review_id);

  Ticket.findOneById(ticket_id, function (err, ticket) {
    if (err) {
      return res.status(500).send({
        error_message: err.message,
      });
    }
    if (ticket === null) {
      return res.status(404).json({ message: "Ticket is not found" });
    }
    Review.findById(review_id, function (err, review) {
      if (err) {
        return res.status(500).send({
          error_message: err.message,
        });
      }
      if (review === null) {
        return res.staus(404).json({ message: "The review is not found!" });
      }
      if (ticket_id != review.ticket) {
        return res
          .staus(404)
          .json({ message: "This review does not belong to this ticket!" });
      }

      res.status(200).json({ "reviews ": review });
    });
  });
};

// return all reviews
const getAllReviewsForATicket = (req, res, next) => {
  const ticket_id = req.params.ticket_id;
  Ticket.findById(ticket_id, function (err, ticket) {
    if (err) {
      return res.status(500).send({ error_message: err.message });
    }
    if (ticket === null) {
      return res
        .status(404)
        .json({ message: "There are no review for this ticket!" });
    }
    Review.find({ ticket: { $eq: ticket_id } }, function (err, review) {
      if (err) {
        return res.status(500).send({ error_message: err.message });
      }
      if (review === null) {
        return res
          .status(404)
          .json({ message: "There are no review for this ticket!" });
      }
      res.status(200).json({ "reviews ": review });
    });
  });
};

//Delete all reviews for a ticket.
const deleteAllReviews = (req, res, next) => {
  const ticket_id = req.params.ticket_id;
  const review_id = req.params.review_id;

  Ticket.findById(ticket_id).exce(function (err, ticket) {
    if (err) {
      return res.status(500).send({ error_message: err.message });
    }
    if (ticket === null) {
      return res.status(404).json({ message: "Ticket is not found!" });
    }

    Ticket.deleteMany({ review: { $eq: review_id } }, function (err, ticket) {
      if (err) {
        return res.status(500).send();
      }
      if (ticket === null) {
        return res
          .staus(404)
          .json({ message: "There are no review for this ticket!" });
      }
      res.status(200).json({ "message ": "Sucessfully deleted !" });
    });
  });
};

//Delete one review of a specific ticket
const deleteOneReview = (req, res, next) => {
  const ticket_id = req.params.ticket_id;
  const review_id = req.params.review_id;
  console.log(ticket_id);
  console.log(review_id);

  Ticket.findById(ticket_id, function (err, ticket) {
    if (err) {
      return next(err);
    }
    if (ticket === null) {
      return res.status(404).json({ "message ": "ticket is not found!" });
    }

    Review.findOneAndDelete({ _id: review_id }, function (err, review) {
      if (err) {
        return res.status(500).send({
          error_message:
            err.message || "Some error occurred while creating the Programe.",
        });
      }
      if (review === null) {
        return res.status(404).json({ "message ": "Review is not found!" });
      }

      // for the ticket change for the 'review' attribute to null and save it
      ticket.review = ""
      ticket.save()
      
      res.status(200).json({ review, message: "Successfully Deleted" });
    });
  });
};

//Edit a review of a ticket that means updating with put
const editReview = (req, res, next) => {
  const ticket_id = req.params.ticket_id;
  const review_id = req.params.review_id;

  Review.findById(review_id, function (err, review) {
    if (review === null) {
      return res.status(400).json({ message: "Review is not found!" });
    }
    if (ticket_id != review.ticket) {
      return res
        .status(404)
        .json({ message: "This review does not belong to this ticket" });
    }
    review.comment_text = req.body.comment_text;
    review.rate = req.body.rate;
    review.date = req.body.date;
    review.save();
    res.status(200).json({ "Reviews ": review });
  });
};

// update the review with given ID
const updateReviewWithPatch = (req, res, next) => {
  const ticket_id = req.params.ticket_id;
  const review_id = req.params.review_id;

  Ticket.findById(ticket_id).exce(function (err, ticket) {
    if (err) {
      return res.status(500).send({
        error_message:
          err.message || "Some error occurred while creating the Programe.",
      });
    }
    if (ticket === null) {
      return res.status(404).json({ message: "Ticket is not found!" });
    }

    Review.findOneAndUpdate(review_id).exce(function (err, review) {
      if (err) {
        return res.status(500).send({
          error_message:
            err.message || "Some error occurred while creating the Programe.",
        });
      }
      if (review === null) {
        return res.status(404).json({ message: "review not found" });
      }
      if (ticket_id != review.ticket) {
        return res
          .status(404)
          .json({ message: "This review does not belong to this ticket" });
      }
      review.comment_text = req.body.comment_text || review.comment_text;
      review.rate = req.body.rate || review.rate;
      review.date = req.body.date || review.date;

      review.save();
      res.status(200).json(review);
    });
  });
};

module.exports = {
  createTicketReview,
  getSpecificReviewForATicket,
  getAllReviewsForATicket,
  deleteAllReviews,
  deleteOneReview,
  editReview,
  updateReviewWithPatch,
};
