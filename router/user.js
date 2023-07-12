const express = require("express");
const UserController = require("../controllers/user");
const md_auth = require("../middlewares/authenticated");
const multiparty = require("connect-multiparty");

const md_upload = multiparty({ uploadDir: "./uploads/avatar" });
const api = express.Router();

api.post("/user/me", md_auth.asureAuth, UserController.getMe);
api.post("/users", md_auth.asureAuth, UserController.getUsers);
api.post("/user", [md_auth.asureAuth, md_upload], UserController.createUser);

module.exports = api;
