const User = require("../models/user");
const bcrypt = require("bcryptjs");

function register(req, res) {
  const { firstname, lastname, email, password } = req.body;
  if (!email) res.status(400).send({ msg: "El email es obligatorio" });
  if (!password) res.status(400).send({ msg: "La contraseña es obligatoria" });

  const salt = bcrypt.genSaltSync(10);
  const hashPassword = bcrypt.hashSync(password, salt);

  const user = new User({
    firstname,
    lastname,
    email: email.toLowerCase(),
    role: "user",
    active: true,
    password: hashPassword,
  });

  user
    .save()
    .then((result) => {
      res.status(200).send(result);
    })
    .catch((err) => {
      res.status(400).send({ msg: "Error al crear el usuario" });
    });
}

module.exports = { register };
