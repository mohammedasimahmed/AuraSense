import React, { useRef } from "react";
import Loader from "../ui/Loader";
import Button from "../ui/Button";
import analyzeChat from "@/services/analyzeChat";

type AnalyzeResponseSectionProps = {
  display: string[]
  setDisplay: React.Dispatch<React.SetStateAction<string[]>>
  loading: boolean
}

const AnalyzeResponseSection = ({ display, setDisplay, loading }: AnalyzeResponseSectionProps) => {
  const chatRef = useRef<HTMLInputElement | null>(null);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    if (!chatRef.current || display.length % 2 == 0) {
      return;
    }

    const chatPrompt = chatRef.current?.value as string;

    chatRef.current.value = "";

    const { chat_response: chatResponse } = await analyzeChat(chatPrompt);

    setDisplay((prevDisplay) => [...prevDisplay, chatPrompt, chatResponse]);
    // setDisplay((prevDisplay) => [...prevDisplay, chatResponse]);
  }

  return (
    <>
      <div className="w-1/2 h-full flex flex-col gap-2">
        <div className="w-full h-full bg-gray-300 rounded p-2 font-semibold text-xl text-gray-600 overflow-auto">
          {
            loading ? (
              <Loader />
            ) : (
              display.map((item, idx) => {
                const isSystemMessage = idx % 2 === 0;

                return (
                  <div key={idx} className={`w-full ${isSystemMessage ? "" : "text-end"}`}>
                    <div>{isSystemMessage ? "System" : "User"}</div>
                    <div>{item}</div>
                  </div>
                );
              })
            )
          }

        </div>
        <form
          onSubmit={(event) => handleSubmit(event)}
          className="w-full flex mt-2"
        >
          <input
            ref={chatRef}
            placeholder="Ask queries related to your input"
            className="bg-gray-50 border border-gray-300 rounded-lg flex-1 p-1 pl-2 mr-1"
          />
          <div>
            <Button>submit</Button>
          </div>
        </form>
      </div >
    </>
  );
};

export default AnalyzeResponseSection;