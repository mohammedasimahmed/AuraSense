"use client";
import Card from "@/components/ui/Card";
import { useRef, useState } from "react";
import cards from "@/content/analyzeCards.json";
import AnalyzeInputSection from "@/components/sections/AnalyzeInputSection";
import AnalyzeResponseSection from "@/components/sections/AnalyzeResponseSection";
import analyzeScenario from "@/services/analyzeScenario";
import analyzeConversation from "@/services/analyzeConversation";
import analyzeDocument from "@/services/analyzeDocument";
import analyzeVideo from "@/services/analyzeVideo";

const page = () => {
  const [selected, setSelected] = useState<number>(1);
  const [loading, setLoading] = useState<boolean>(false);
  const [display, setDisplay] = useState<string[]>([]);
  const inputToAnalyzeRef = useRef<HTMLTextAreaElement | HTMLInputElement | null>(null);

  const analyzeInput = async () => {
    setLoading(true);
    switch (selected) {
    case 1: {
      const { analysis } = await analyzeScenario(inputToAnalyzeRef.current?.value as string);
      console.log("analysis");
      console.log(analysis);

      setDisplay([analysis]);

      console.log(inputToAnalyzeRef.current?.value as string);

      break;
    }
    case 2: {
      const conversation = (inputToAnalyzeRef.current as HTMLInputElement)?.files?.[0];
      if (!conversation) return;

      const { analysis } = await analyzeConversation(conversation);
      setDisplay([analysis]);

      break;
    }
    case 3: {

      const document = (inputToAnalyzeRef.current as HTMLInputElement)?.files?.[0];
      if (!document) return;

      const { analysis } = await analyzeDocument(document);
      setDisplay([analysis]);

      break;
    }
    case 4: {
      const video = (inputToAnalyzeRef.current as HTMLInputElement)?.files?.[0];
      if (!video) return;

      const { analysis } = await analyzeVideo(video);
      setDisplay([analysis]);

      break;
    }

    default:
      break;
    }
    setLoading(false);
  };

  return (
    <div className="w-screen min-h-screen p-2 sm:p-8">
      <div className="mt-20 flex flex-wrap justify-around items-center gap-6">
        {cards.map((card) => (
          <Card key={card.id} id={card.id} selected={selected} setSelected={setSelected} title={card.title} description={card.description} />
        ))}
      </div>
      <div className="mt-10 bg-gray-800 border-gray-700 rounded-2xl h-[400px] flex gap-10 p-8">
        <AnalyzeInputSection inputToAnalyzeRef={inputToAnalyzeRef} selected={selected} analyzeInput={analyzeInput} />
        <AnalyzeResponseSection display={display} setDisplay={setDisplay} loading={loading} />
      </div>
    </div>
  );
};
export default page;