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

module.exports = { suscribeEmail };
