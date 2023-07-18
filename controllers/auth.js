const User = require("../models/user");
const bcrypt = require("bcryptjs");
const jwt = require("../utils/jwt");

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
    active: false,
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

function login(req, res) {
  const { email, password } = req.body;
  if (!email) res.status(400).send({ msg: "El email es obligatorio" });
  if (!password) res.status(400).send({ msg: "La password es obligatoria" });

  const emailLowerCase = email.toLowerCase();

  User.findOne({ email: emailLowerCase })
    .then((user) => {
      bcrypt
        .compare(password, user.password)
        .then((check) => {
          if (!check) res.status(400).send({ msg: "Contraseña incorrecta" });
          if (!user.active) res.status(400).send({ msg: "Usuario inactivo" });
          res.status(200).send({
            access: jwt.createAccessToken(user),
            refresh: jwt.createRefreshToken(user),
          });
        })
        .catch((err) => res.status(500).send({ msg: "Error del servidor" }));
    })
    .catch((err) => res.status(500).send({ msg: "No se encontro el usuario" }));
}

function refreshAccessToken(req, res) {
  const { token } = req.body;

  if (!token) res.status(400).send({ msg: "Token requerido" });

  const { user_id } = jwt.decode(token);
  User.findOne({ _id: user_id })
    .then((user) =>
      res.status(200).send({
        accessToken: jwt.createAccessToken(user),
      })
    )
    .catch(() => res.status(500).send({ msg: "Error del servidor" }));
}

module.exports = { register, login, refreshAccessToken };
