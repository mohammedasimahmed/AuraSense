import http_status_codes from "../config/http_status_codes";
import analyzeFile from "../lib/analyze_file";
import { ApiError } from "../lib/api_error";

// eslint-disable-next-line no-undef
const analyzeFileService = async (file: Express.Multer.File | undefined, inputType: string, chatPrompt?: string) => {
  if (!file || !file.path || !file.filename) {
    throw new ApiError("File Missing", http_status_codes.BAD_REQUEST);
  }

  return await analyzeFile(file, inputType, chatPrompt);
};

export default analyzeFileService;