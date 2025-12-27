import { Router } from "express";
import analyzeScenarioController from "../controllers/analyze_scenario.controller";
import analyzeFileController from "../controllers/analyze_file.controller";
import fileUploadWithInputType from "../middlewares/file_upload_with_input_type.middleware";

const router = Router();

router.post("/scenario", analyzeScenarioController);
router.post("/conversation", fileUploadWithInputType("conversation"), analyzeFileController);
router.post("/document", fileUploadWithInputType("document"), analyzeFileController);
router.post("/video", fileUploadWithInputType("video"), analyzeFileController);

export default router;