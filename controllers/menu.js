const Menu = require("../models/menu");

function createMenu(req, res) {
  const menu = new Menu(req.body);
  menu
    .save()
    .then((data) => {
      res.status(200).send(data);
    })
    .catch(() => {
      res.status(400).send("Error al crear el menu");
    });
}

async function getMenus(req, res) {
  const { active } = req.query;
  let response = null;
  if (active === undefined) {
    response = await Menu.find().sort({ order: "asc" });
  } else {
    response = await Menu.find({ active }).sort({ order: "asc" });
  }

  if (!response) {
    res.status(400).send({ msg: "No se ha encontrado ningun menu" });
  } else {
    res.status(200).send(response);
  }
}

function updateMenu(req, res) {
  const { id } = req.params;
  const menuData = req.body;

  Menu.findByIdAndUpdate({ _id: id }, menuData)
    .then((data) => {
      data;
      res.status(200).send({ msg: "Actualizacion correcta" });
    })
    .catch(() => {
      res.status(400).send({ msg: "Error al actualizar el menu" });
    });
}

async function deleteMenu(req, res) {
  const { id } = req.params;
  Menu.findByIdAndDelete(id)
    .then(() => {
      res.status(200).send({ msg: "Menu eliminado" });
    })
    .catch(() => {
      res.status(400).send({ msg: "Error al eliminar el menu" });
    });
}

module.exports = { createMenu, getMenus, updateMenu, deleteMenu };
