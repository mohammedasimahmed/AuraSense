import http_status_codes from "../config/http_status_codes";
import { ApiError } from "../lib/api_error";
import instructionMap from "../lib/instruction_map";
import llm from "../lib/llm";

const analyzeScenarioService = async (scenario: string, chatPrompt?: string) => {
  console.log("object");
  const instruction = chatPrompt ? chatPrompt : instructionMap.get("scenario") as string;

  try {
    const aiMsg = await llm.invoke([
      [
        "system", instruction
      ],
      ["human", scenario],
    ]);

    return aiMsg.content;
  } catch {
    throw new ApiError("Unexpected Error", http_status_codes.INTERNAL_SERVER_ERROR);
  }
};

export default analyzeScenarioService;