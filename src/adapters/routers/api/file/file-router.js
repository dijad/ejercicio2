const { Router } = require('express');

const fileUpload = require('express-fileupload');

const { handleFiles } = require('../../../../usecases/files-usecases')

function handlerFileRouter() {
  const router = Router();

  router.post('/api/file/count-words', fileUpload({
      useTempFiles : true,
      tempFileDir : './uploads'
  }), async (req, res) => {
    try {

      if (req.files) {

        const response = await handleFiles(req.files);
        res.status(200).send({ status: true, data: response });

      } else {
        res.status(200).send({ status: false, data: 'Es necesario cargar un archivo' });
      }

    } catch (err) {
      const errBody = {
        status: false,
        data: {
         message: err.message,
         url: req.originalUrl
        }
      }
      console.error("Backend response ->", JSON.stringify(errBody, null, 3))
      res.status(err.statusCode || 500).send(errBody)
    }
  });

  router.post('/api/file/find-word', fileUpload({
      useTempFiles : true,
      tempFileDir : './uploads'
  }), async (req, res) => {
    try {
      if (req.files && req.query.word) {

        const word = req.query.word;

        const response = await handleFiles(req.files, word);
        res.status(200).send({ status: true, data: response });

      } else {
        res.status(200).send({ status: false, data: 'Es necesario cargar un archivo e ingresar una palabra' });
      }

    } catch (err) {
      const errBody = {
        status: false,
        data: {
         message: err.message,
         url: req.originalUrl
        }
      }
      console.error("Backend response ->", JSON.stringify(errBody, null, 3))
      res.status(err.statusCode || 500).send(errBody)
    }
  });

  return router;
}

module.exports = handlerFileRouter;
