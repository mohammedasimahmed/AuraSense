import { NextFunction, Request, Response } from "express";
import http_status_codes from "../config/http_status_codes";
import analyzeScenarioService from "../services/analyze_scenario.service";
import { userInputMap } from "../lib/user_input_map";

const analyzeScenarioController = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { scenario, username } = req.body;

    userInputMap.set(username, { inputType: "scenario", input: scenario as string });

    console.log(userInputMap.get(username));

    const analysis = await analyzeScenarioService(scenario);

    console.log(analysis);

    res.status(http_status_codes.OK).json({ analysis });
  } catch (error) {
    next(error);
  }
};

export default analyzeScenarioController;