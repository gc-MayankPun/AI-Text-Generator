import { postPrompt } from "../api/postPrompt";
import { useInput } from "../context/InputContext";
import { useMutation } from "@tanstack/react-query";
import { useMessage } from "../context/MessageContext";

const usePromptHandler = () => {
  const { inputRef, outputRef } = useInput();
  const { setChats } = useMessage();

  const mutation = useMutation({
    mutationFn: postPrompt,
    onSuccess: (data) => {
      if (outputRef.current) {
        inputRef.current.value = "";
        setChats((prev) => [
          ...prev,
          {
            type: "bot",
            success: data.success,
            message: data?.message,
            image: data?.image,
          },
        ]);
      }
    },
    onError: (error) => {
      setChats((prev) => [
        ...prev,
        {
          type: "bot",
          success: false,
          message:
            error.status === 429
              ? "Too many requests! Please wait and try again."
              : error.message || "Something went wrong!",
        },
      ]);
    },
  });

  const sendPrompt = (event, toolType) => {
    event.preventDefault();

    if (inputRef.current) {
      const prompt = inputRef.current.value.trim();
      if (!prompt) return;
      setChats((prev) => [...prev, { type: "self", message: prompt }]);

      // mutation.mutate(prompt);
      mutation.mutate({ message: prompt, toolType });
    }
  };

  return { sendPrompt, isPending: mutation.isPending };
};

export default usePromptHandler;
