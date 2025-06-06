
export const postPrompt = async ({ message, toolType, signal }) => {
  try {
    const request =
      toolType === "TEXT"
        ? "http://localhost:3000/api/send-prompt"
        : "http://localhost:3000/api/generate-image";

    const response = await fetch(request, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ message }),
      signal, // Pass signal directly
    });

    const data = await response.json();

    if (!response.ok) {
      const error = new Error(data?.error || "Request failed");
      error.status = response.status;
      throw error;
    }

    return data;
  } catch (error) {
    throw error;
  }
};