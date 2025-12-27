import config from "@/config/config";

const analyzeConversation = async (conversation: File) => {
  const username = sessionStorage.getItem("username");
  const formData = new FormData();
  formData.append("conversation", conversation);
  formData.append("username", username as string);

  console.log("object");

  const response = await fetch(config.ANALYZE_CONVERSATION_URL, {
    method: "POST",
    headers: {
      authorization: `Bearer ${sessionStorage.getItem("accessToken")}`
    },
    body: formData
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message || "Unexpected Error");
  }

  const result = await response.json();
  return result;
};

export default analyzeConversation;