const express = require("express");
const NewsletterController = require("../controllers/newsletter");
const md_auth = require("../middlewares/authenticated");

const api = express.Router();

api.post("/newslatter", NewsletterController.suscribeEmail);
api.get("/newslatter", md_auth.asureAuth, NewsletterController.getEmails);
api.delete(
  "/newslatter/:id",
  md_auth.asureAuth,
  NewsletterController.deleteEmail
);

module.exports = api;
