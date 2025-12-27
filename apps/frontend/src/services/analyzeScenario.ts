import config from "@/config/config";

const analyzeScenario = async (scenario: string) => {
  const username = sessionStorage.getItem("username");
  const response = await fetch(config.ANALYZE_SCENARIO_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      authorization: `Bearer ${sessionStorage.getItem("accessToken")}`
    },
    body: JSON.stringify({ scenario, username }),
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new Error(errorData.message || "Unexpected Error");
  }

  return await response.json();
};

export default analyzeScenario;
