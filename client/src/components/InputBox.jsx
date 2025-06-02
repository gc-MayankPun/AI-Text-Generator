import { FaArrowUp } from "react-icons/fa6";
import { useInput } from "../context/InputContext";
import { FaStop, FaImage } from "react-icons/fa";
import { IoPencil } from "react-icons/io5";
import { useCallback, useState } from "react";

const InputBox = ({ sendPrompt, isPending }) => {
  const [toolType, setToolType] = useState("TEXT");

  const changeToolType = useCallback(() => {
    setToolType((prev) => (prev === "TEXT" ? "IMAGE" : "TEXT"));
  }, []);

  return (
    <form
      onSubmit={(e) => sendPrompt(e, toolType)}
      className="w-[55%] p-2 rounded-md absolute bottom-[1.5rem] right-[50%] translate-x-[50%] z-10 bg-[var(--textarea-bg-color)]"
    >
      <Input
        sendPrompt={sendPrompt}
        isPending={isPending}
        toolType={toolType}
      />
      <Toolbar
        isPending={isPending}
        toolType={toolType}
        changeToolType={changeToolType}
      />
    </form>
  );
};

const Input = ({ sendPrompt, isPending, toolType }) => {
  const { inputRef } = useInput();

  const handleResize = () => {
    if (inputRef.current) {
      inputRef.current.style.height = "auto";
      const maxRows = 5;
      const lineHeight = 24;
      const maxHeight = lineHeight * maxRows;
      const scrollHeight = inputRef.current.scrollHeight;

      inputRef.current.style.overflowY =
        scrollHeight > maxHeight ? "auto" : "hidden";
      inputRef.current.style.height = `${Math.min(scrollHeight, maxHeight)}px`;
    }
  };

  const handleKeyDown = (event) => {
    if (event.key === "Enter" && !event.shiftKey) {
      event.preventDefault();
      sendPrompt(event, toolType);
      if (inputRef.current) inputRef.current.style.height = "fit-content";
    }
  };

  return (
    <textarea
      ref={inputRef}
      name="message"
      id="message"
      rows={1}
      disabled={isPending}
      className="resize-none w-full outline-none py-2 px-2 rounded-md"
      placeholder={
        toolType === "TEXT"
          ? "Enter your prompt here..."
          : "Describe your image..."
      }
      onKeyDown={handleKeyDown}
      onInput={handleResize}
    ></textarea>
  );
};

const Toolbar = ({ isPending, toolType, changeToolType }) => {
  return (
    <div className="flex justify-between">
      <button
        disabled={isPending}
        className="text-[1.3rem] px-2 cursor-pointer transition-all duration-500 ease-in-out hover:text-black"
        onClick={changeToolType}
        type="button"
      >
        {toolType === "TEXT" ? (
          <IoPencil title="Generate content" />
        ) : (
          <FaImage title="Generate image" />
        )}
      </button>
      <button
        type="submit"
        disabled={isPending}
        className="h-[1.8rem] w-[1.8rem] bg-[var(--send-button-bg-color)] rounded-[50%] flex items-center justify-center cursor-pointer transition-all duration-500 ease-in-out hover:bg-blue-200 hover:text-black"
      >
        {isPending ? <FaStop /> : <FaArrowUp />}
      </button>
    </div>
  );
};

export default InputBox;
