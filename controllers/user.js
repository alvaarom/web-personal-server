const User = require("../models/user");
const bycrypt = require("bcryptjs");

async function getMe(req, res) {
  const { user_id } = req.user;

  const response = await User.findById(user_id);
  if (!response) {
    res.status(400).send({ msg: "No se ha encontrado usuario" });
  } else {
    res.status(200).send(response);
  }
}

async function getUsers(req, res) {
  const { active } = req.query;
  let response = null;

  if (active === undefined) {
    response = await User.find();
  } else {
    response = await User.find({ active });
  }

  res.status(200).send(response);
}

async function createUser(req, res) {
  const { password } = req.body;
  const user = new User({ ...req.body, active: false });

  const salt = bycrypt.genSaltSync(10);
  const hashPassword = bycrypt.hashSync(password, salt);
  user.password = hashPassword;

  if (req.files.avatar) {
    //TODO:
    console.log("Procesar avatar");
  }

  user
    .save()
    .then((user) => {
      res.status(200).send(user);
    })
    .catch(() => {
      res.status(500).send({ msg: "Error al crear el usuario" });
    });
}

module.exports = { getMe, getUsers, createUser };
