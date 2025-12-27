import { Response, NextFunction, Request } from "express";
import http_status_codes from "../config/http_status_codes";
import chatService from "../services/chat.service";

async function chatController(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  try {
    const { username, chatPrompt } = req.body;

    console.log(username, chatPrompt);

    const chatResponse = await chatService(username, chatPrompt);

    res.status(http_status_codes.OK).json({
      chat_response: chatResponse
    });

  } catch (error) {
    console.log("random");
    console.log(error);
    next(error);
  }
}

export default chatController;