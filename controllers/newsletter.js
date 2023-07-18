const Newsletter = require("../models/newsletter");

async function suscribeEmail(req, res) {
  const { email } = req.body;
  if (!email) res.status(400).send({ msg: "Email obligatorio" });

  const newsletter = new Newsletter({
    email: email.toLowerCase(),
  });

  try {
    await newsletter.save();
    res.status(200).send({ msg: "Email registrado" });
  } catch (error) {
    res.status(400).send({ msg: "El email ya esta registrado" });
  }
}

async function getEmails(req, res) {
  const { page = 1, limit = 10 } = req.query;
  const options = {
    page: parseInt(page),
    limit: parseInt(limit),
  };
  try {
    const response = await Newsletter.paginate({}, options);
    res.status(200).send(response);
  } catch (error) {
    res.status(400).send({ msg: "Error al obtener los emails" });
  }
}

async function deleteEmail(req, res) {
  const { id } = req.params;
  Newsletter.findByIdAndDelete(id)
    .then(() => {
      res.status(200).send({ msg: "Email eliminado" });
    })
    .catch(() => {
      res.status(400).send({ msg: "Error al eliminar el email" });
    });
}

module.exports = { suscribeEmail, getEmails, deleteEmail };
