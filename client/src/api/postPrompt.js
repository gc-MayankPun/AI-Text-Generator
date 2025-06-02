export const postPrompt = async (message) => {
  try {
    const response = await fetch("http://localhost:3000/api/send-prompt", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ message }),
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
