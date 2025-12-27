import React, { RefObject } from "react";
import Button from "../ui/Button";
import FileInput from "../ui/FileInput";

type AnalyzeInputSectionProps = {
    selected: number;
    analyzeInput: () => void;
    inputToAnalyzeRef: React.RefObject<HTMLTextAreaElement | HTMLInputElement | null>;
};

const AnalyzeInputSection = ({ selected, analyzeInput, inputToAnalyzeRef }: AnalyzeInputSectionProps) => {
  return (
    <>
      <div className="w-1/2 h-full flex flex-col gap-2">
        <div className="w-full h-full">
          {
            selected === 1 ?
              (
                <textarea ref={inputToAnalyzeRef as RefObject<HTMLTextAreaElement>} placeholder="Enter Your Scenario" className="w-full h-full bg-gray-300 text-gray-700 p-2 rounded" />
              )
              :
              (
                <FileInput fileInputRef={inputToAnalyzeRef as RefObject<HTMLInputElement>} />
              )
          }
        </div>
        <Button clickHandler={analyzeInput}>
                    Analyze
        </Button>
      </div>
    </>
  );
};

export default AnalyzeInputSection;