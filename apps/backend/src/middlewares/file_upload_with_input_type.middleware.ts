import { Response, NextFunction } from "express";
import { FileRequest } from "../types/requests/file.request.type";
import multer from "multer";
import { ApiError } from "../lib/api_error";
import http_status_codes from "../config/http_status_codes";

const fileUploadWithInputType = (inputType: string) => {
  return (req: FileRequest, res: Response, next: NextFunction) => {

    req.inputType = inputType;

    const fileUpload = multer({ dest: ".uploads/" });

    switch (inputType) {
    case "conversation":
      fileUpload.single("conversation")(req, res, next);
      break;
    case "document":
      fileUpload.single("document")(req, res, next);
      break;
    case "video":
      fileUpload.single("video")(req, res, next);
      break;
    default:
      return next(new ApiError("Unsupported input type", http_status_codes.BAD_REQUEST));
    }
  };
};

export default fileUploadWithInputType;