const express = require("express");
const NewsletterController = require("../controllers/newsletter");
const md_auth = require("../middlewares/authenticated");

const api = express.Router();

api.post("/newslatter", NewsletterController.suscribeEmail);

module.exports = api;
