// Exprss libery
import express from "express";
import bodyParser from "body-parser"; // ใช้ในการแกะ req 

// routes
import profileRouter from "./routes/profileRoutes";
import productRouter from "./routes/productRoutes"
import masterRouter from "./routes/masterRoutes"
var cors = require('cors');

export function createApp() {
  // use Express
  const app = express();

  // app.use(express.urlencoded({ extended: true }));

  app.use(cors());

  app.use(bodyParser.json())

  // use API
  app.use("/api/profile", profileRouter);
  app.use('/api/product', productRouter);
  app.use('/api/master', masterRouter);
  app.use("/images", express.static('src/images'));

  return app;
}