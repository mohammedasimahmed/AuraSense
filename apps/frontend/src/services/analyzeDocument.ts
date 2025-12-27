import config from "@/config/config";

const analyzeDocument = async (document: File) => {
  const username = sessionStorage.getItem("username");
  const formData = new FormData();
  formData.append("document", document);
  formData.append("username", username as string);

  const response = await fetch(config.ANALYZE_DOCUMENT_URL, {
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

export default analyzeDocument;
