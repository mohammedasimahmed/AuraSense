import express, { Application } from "express";
import config from "../config/config";
import cors from "cors";
import helmet from "helmet";
import cookie_parser from "cookie-parser";
import morgan from "morgan";

const expressLoader = (app: Application) => {
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));
  app.use(cookie_parser());

  app.use(
    cors({
      origin: config.FRONTEND_URLS,
      credentials: true
    })
  );

  app.use(helmet());
  app.use(morgan("tiny"));
};

export default expressLoader;