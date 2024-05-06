const imagenModel = require("../models/imagen");
const handleHTTPError = require("../utils/handleErrors");
const PUBLIC_URL = process.env.PUBLIC_URL;
const MEDIA_PATH = `${__dirname}/../public`;
const fs = require("fs");

const obtenerImagenes = async (req, res) => {
  try {
    const data = await imagenModel.find({});
    res.send({ data: data });
  } catch (e) {
    handleHTTPError(res, `ERROR_LIST_IMAGES= ${e}`);
  }
};
const ObtenerImagen = async (req, res) => {
  try {
    const { id } = req.params;//matchedData
    console.log(req.params);
    const data = await imagenModel.findById(id);

    res.send({ data });
  } catch (error) {
    console.log(error);
    handleHTTPError(res, `ERROR_GET_IMAGEN = ${error}`);
  }
};
const registrarImagen = async (req, res) => {
  try {
    const { body, file } = req;
    const fileData = {
      filename: file.filename,
      url: `${PUBLIC_URL}/${file.filename}`,
    };
    const data = await imagenModel.create(fileData);
    res.send({ data });
  } catch (error) {
    handleHTTPError(res, `ERROR_CREATE_IMAGEN = ${error}`);
  }
};

const eliminarImagen =async (req, res) => {
    try {
      const {id,...body} =req.params
      const dataFile = await imagenModel.findById({_id:id})
      await imagenModel.deleteOne({_id:id})
      console.log(dataFile);
      const {filename} = dataFile
      const filePath = `${MEDIA_PATH}/${filename}`
      await fs.unlinkSync(filePath)
      const data = {filePath,deleted:1}
      console.log('Imagen eliminada')
      res.send({data})
      
    } catch (error) {
      handleHTTPError(res,`ERROR_DELETE_IMAGEN = ${error}`)
    }
  };

module.exports = { obtenerImagenes, ObtenerImagen, registrarImagen, eliminarImagen };