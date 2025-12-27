import http_status_codes from "../config/http_status_codes";
import { ApiError } from "../lib/api_error";
import { userInputMap } from "../lib/user_input_map";
import analyzeFileService from "./analyze_file.service";
import analyzeScenarioService from "./analyze_scenario.service";

const chatService = async (username: string, chatPrompt: string) => {
  console.log(userInputMap.get(username)?.inputType, "r4vjj");
  const { inputType, input } = userInputMap.get(username) ?? {};

  console.log(inputType, input);

  let chatResponse;

  switch (inputType) {
    case "scenario":
      chatResponse = await analyzeScenarioService(input as string, chatPrompt);
      break;

    case "conversation":
    case "document":
    case "video":
      chatResponse = await analyzeFileService(input as Express.Multer.File, inputType, chatPrompt);
      break;

    default:
      throw new ApiError("Unsupported input type", http_status_codes.BAD_REQUEST);
  }

  return chatResponse;
};

export default chatService;