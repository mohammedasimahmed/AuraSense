import { GoogleAIFileManager, FileState } from "@google/generative-ai/server";
import { GoogleGenerativeAI } from "@google/generative-ai";
import config from "../config/config";
import instructionMap from "./instruction_map";

// eslint-disable-next-line no-undef
const analyzeFile = async (file: Express.Multer.File, inputType: string, chatPrompt?: string) => {
  const instruction = chatPrompt ? chatPrompt : instructionMap.get(inputType) as string;
  const genAI = new GoogleGenerativeAI(config.API_KEY);
  const model = genAI.getGenerativeModel({
    model: "gemini-2.5-flash",
  });

  const fileManager = new GoogleAIFileManager(config.API_KEY);

  // Upload the file and specify a display name.
  const uploadResponse = await fileManager.uploadFile(file.path, {
    mimeType: file.mimetype,
    displayName: file.filename,
  });

  // View the response.
  console.log(
    `Uploaded file ${uploadResponse.file.displayName} as: ${uploadResponse.file.uri}`
  );

  // Upload the video file using the File API
  // uploadResponse = ...
  const { name } = uploadResponse.file;

  // Poll getFile() on a set interval (10 seconds here) to check file state.
  let fileData = await fileManager.getFile(name);
  while (fileData.state === FileState.PROCESSING) {
    process.stdout.write(".");
    // Sleep for 10 seconds
    await new Promise((resolve) => setTimeout(resolve, 10_000));
    // Fetch the file from the API again
    fileData = await fileManager.getFile(name);
  }

  if (fileData.state === FileState.FAILED) {
    throw new Error("File processing failed.");
  }

  // When file.state is ACTIVE, the file is ready to be used for inference.
  console.log(`File ${fileData.displayName} is ready for inference as ${fileData.uri}`);
  console.log(instructionMap.get(inputType) as string);
  const result = await model.generateContent([
    {
      fileData: {
        mimeType: uploadResponse.file.mimeType,
        fileUri: uploadResponse.file.uri,
      },
    },
    {
      text: instruction,
    },
  ]);

  console.log(result.response.text());

  // await fs.unlink(file.path);

  // Handle the response of generated text
  return result.response.text();
};

export default analyzeFile;
