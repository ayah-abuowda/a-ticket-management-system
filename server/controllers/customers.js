var express = require("express");
var Customer = require("../models/customer");
const bcrypt = require("bcrypt");


// create new customer
const addCustomer = (req, res, next) => {
  var newCustomer = new Customer(req.body);
  Customer.findOne({ username: req.body.username }).then((customer) => {
    if (customer) {
      return res
        .status(500)
        .json({ message: "Customername is already taken " });
    }
    newCustomer.save(function (err, customer) {
      if (err) {
        return res.status(500).send({
          errpr: err,
          error_message:
            err.message || "Some error occurred while creating the Programe.",
        });
      }

      res
        .status(201)
        .json({ customer, message: "The customer has been created!" });
    });
  });
};

// return a customer
const getCustomer = (req, res, next) => {
  const customer_id = req.params.customer_id;
  console.log(customer_id);

  Customer.findById(customer_id, function (err, customer) {
    if (err) {
      return res.status(500).send({
        error_message:
          err.message || "Some error occurred while creating the Programe.",
      });
    }
    if (customer === null) {
      return res.status(404).json({ message: "Customer is not found " });
    }
    res.status(201).json({ customer: customer }); // returns the response in JSON format.
  });
};

// return a customer that already have created (sigin screen)
const loginCustomer = (req, res, next) => {
  const username = req.body.username;
  const password = req.body.password;

  Customer.findOne({ username, password }, function (err, customer) {
    if (err) {
      return res.status(500).send({
        error_message:
          err.message || "Some error occurred while creating the Programe.",
      });
    }
    res.status(200).json({ message: "Welcome to our system", username, customer }); // returns the response in JSON format.
  });
};


// return all the customer
const getAllCustomers = (req, res, next) => {
  Customer.find(function (err, customer) {
    if (err) {
      return res.status(500).send({
        error_message:
          err.message || "Some error occurred while creating the Programe.",
      });
    }
    if (customer === null) {
      return res
        .status(404)
        .json({ message: "There are no registed customers!" });
    }
    res.status(200).json({ customers: customer });
  });
};

// Delete a customer with given ID
const deleteCustomer = (req, res, next) => {
  const customer_id = req.params.customer_id;
  Customer.findOneAndDelete({ _id: customer_id }, function (err, customer) {
    if (err) {
      return res.status(500).send({
        error_message:
          err.message || "Some error occurred while creating the Programe.",
      });
    }
    if (customer === null) {
      return res.status(404).json({ message: "Customer not found!" });
    }
    // status code
    res
      .status(200)
      .json({ customers: customer, "message ": "Sucessfully deleted !" });
  });
};

// Delete all customers
const deleteAllCustomer = (req, res, next) => {
  Customer.deleteMany(function (err, customers) {
    if (err) {
      return res.status(500).send({
        error_message:
          err.message || "Some error occurred while creating the Programe.",
      });
    }
    if (customers === null) {
      return res.status(404).json({ message: "customers are empty" });
    }
    res.status(200).json({ "message ": "Sucessfully deleted !" });
  });
};

// update the customer with given ID
const updateCustomerWithPut = (req, res, next) => {
  const customer_id = req.params.customer_id;
  console.log(customer_id);

  Customer.findOneAndReplace(customer_id, function (err, customer) {
    //findOneAndReplace
    if (err) {
      return res.status(500).send({
        error_message:
          err.message || "Some error occurred while creating the Programe.",
      });
    }
    if (customer === null) {
      return res.status(404).json({ message: "customer not found" });
    }
    customer.name = req.body.name;
    customer.username = req.body.username;
    customer.email = req.body.email;
    customer.password = req.body.password;

    customer.save();
    // status code
    res
      .status(200)
      .json({ customer, message: "The customer has been updated" });
  });
};

// Partially update the customer with given ID
const updateCustomerWithPatch = (req, res, next) => {
  const customer_id = req.params.customer_id;
  Customer.findOneAndUpdate(customer_id).exec(function (err, customer) {
    // findOneAndUpate
    if (err) {
      return res.status(500).send({
        error_message:
          err.message || "Some error occurred while creating the Programe.",
      });
    }
    if (customer === null) {
      return res.status(404).json({ message: "Customer not found" });
    }
    customer.name = req.body.name || customer.name;
    customer.username = req.body.userName || customer.username;
    customer.email = req.body.email || customer.email;
    customer.password = req.body.password || customer.password;

    customer.save();
    // status code
    res
      .status(200)
      .json({ customer, message: "The customer has been updated" });
  });
};

module.exports = {
  addCustomer,
  getCustomer,
  deleteCustomer,
  getAllCustomers,
  updateCustomerWithPut,
  updateCustomerWithPatch,
  loginCustomer,
};

var express = require("express");
const router = require("express").Router();

router.post("/register", addCustomer);
router.post("/signin", loginCustomer);
router.get("/", getAllCustomers);
router.get("/:customer_id", getCustomer);
router.patch("/:customer_id", updateCustomerWithPatch);
router.put("/:customer_id", updateCustomerWithPut);
router.delete("/:customer_id", deleteCustomer);
router.delete("/", deleteAllCustomer);


module.exports = router;
