const createExpressApp = require('./adapters/express');

const handlerFileRouter = require('./adapters/routers/api/file/file-router');

let routers = [
  handlerFileRouter
];

createExpressApp(routers);
