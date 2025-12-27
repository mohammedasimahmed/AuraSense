import config from "@/config/config";

const analyzeChat = async (chatPrompt: string) => {
    const username = sessionStorage.getItem("username");
    const response = await fetch(config.ANALYZE_CHAT_URL, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            authorization: `Bearer ${sessionStorage.getItem("accessToken")}`
        },
        body: JSON.stringify({ chatPrompt, username }),
    });

    if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.message || "Unexpected Error");
    }

    return await response.json();
};

export default analyzeChat;
