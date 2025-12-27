import config from "@/config/config";

const analyzeVideo = async (video: File) => {
  const username = sessionStorage.getItem("username");
  const formData = new FormData();
  formData.append("video", video);
  formData.append("username", username as string);

  const response = await fetch(config.ANALYZE_VIDEO_URL, {
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

export default analyzeVideo;
