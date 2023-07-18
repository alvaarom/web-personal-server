const Course = require("../models/course");
const image = require("../utils/image");

async function createCourse(req, res) {
  const course = new Course(req.body);
  const imagePath = image.getFilePath(req.files.miniature);
  course.miniature = imagePath;
  try {
    const response = await course.save();
    res.status(200).send(response);
  } catch (error) {
    res.status(400).send({ msg: "No se pudo crear el curso" });
  }
}

async function getCourses(req, res) {
  const { page = 1, limit = 10 } = req.query;

  const options = {
    page: parseInt(page),
    limit: parseInt(limit),
  };

  try {
    const response = await Course.paginate({}, options);
    res.status(200).send(response);
  } catch (error) {
    res.status(400).send({ msg: "Error al buscar los cursos" });
  }
}

async function updateCourse(req, res) {
  const { id } = req.params;
  const courseData = req.body;

  if (req.files.miniature) {
    const imagePath = image.getFilePath(req.files.miniature);
    courseData.miniature = imagePath;
  }
  try {
    const response = await Course.findByIdAndUpdate({ _id: id }, courseData);
    res.status(200).send({ msg: "Actualizacion correcta" });
  } catch (error) {
    res.status(400).send({ msg: "Error al actualizar el curso" });
  }
}

async function deleteCourse(req, res) {
  const { id } = req.params;
  Course.findByIdAndDelete(id)
    .then(() => {
      res.status(200).send({ msg: "Curso eliminado" });
    })
    .catch(() => {
      res.status(400).send({ msg: "Error al eliminar el curso" });
    });
}

module.exports = { createCourse, getCourses, updateCourse, deleteCourse };
