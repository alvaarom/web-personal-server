const User = require("../models/user");
const bycrypt = require("bcryptjs");
const image = require("../utils/image");

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

function createUser(req, res) {
  const { password } = req.body;
  const user = new User({ ...req.body, active: false });

  const salt = bycrypt.genSaltSync(10);
  const hashPassword = bycrypt.hashSync(password, salt);
  user.password = hashPassword;

  if (req.files.avatar) {
    const imagePath = image.getFilePath(req.files.avatar);
    user.avatar = imagePath;
  }

  user
    .save()
    .then((user) => {
      res.status(200).send(user);
    })
    .catch(() => {
      res.status(400).send({ msg: "Error al crear el usuario" });
    });
}

function updateUser(req, res) {
  const { id } = req.params;
  const userData = req.body;

  if (userData.password) {
    const salt = bycrypt.genSaltSync(10);
    const hashPassword = bycrypt.hashSync(userData.password, salt);
    userData.password = hashPassword;
  } else {
    delete userData.password;
  }

  if (req.files.avatar) {
    const imagePath = image.getFilePath(req.files.avatar);
    userData.avatar = imagePath;
  }

  User.findByIdAndUpdate({ _id: id }, userData)
    .then((data) => {
      data;
      res.status(200).send({ msg: "Actualizacion correcta" });
    })
    .catch(() => {
      res.status(400).send({ msg: "Error al actualizar el usuario" });
    });
}

function deleteUser(req, res) {
  const { id } = req.params;
  User.findByIdAndDelete(id)
    .then(() => {
      res.status(200).send({ msg: "Usuario eliminado" });
    })
    .catch(() => {
      res.status(400).send({ msg: "Error al eliminar el usuario" });
    });
}

module.exports = { getMe, getUsers, createUser, updateUser, deleteUser };
