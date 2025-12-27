import { Express } from "express";
import authRoutes from "../routes/auth.routes";
import analyzeRoutes from "../routes/analyze.routes";
import chatRoutes from "../routes/chat.routes";
import verifyToken from "../middlewares/verify_token.middleware";

export default function routesLoader(app: Express) {
  app.use("/api/auth", authRoutes);
  app.use(verifyToken);
  app.use("/api/analyze", analyzeRoutes);
  app.use("/api/chat", chatRoutes);
}