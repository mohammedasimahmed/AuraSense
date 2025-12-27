import { NextFunction, Response } from "express";
import http_status_codes from "../config/http_status_codes";
import analyzeFileService from "../services/analyze_file.service";
import { FileRequest } from "../types/requests/file.request.type";
import { userInputMap } from "../lib/user_input_map";

const analyzeFileController = async (req: FileRequest, res: Response, next: NextFunction) => {
  try {
    const { file, inputType } = req;
    console.log("file", file);
    const { username } = req.body;
    console.log(username);

    userInputMap.set(username, { inputType: inputType as string, input: file as Express.Multer.File });
    console.log(userInputMap.get(username)?.inputType);

    const analysis = await analyzeFileService(file, inputType as string);

    console.log("analysis");
    console.log(analysis);

    res.status(http_status_codes.OK).json({ analysis });
  } catch (error) {
    console.log("error");
    console.log(error);
    next(error);
  }
};

export default analyzeFileController;