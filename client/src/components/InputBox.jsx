import { FaArrowUp } from "react-icons/fa6";
import { useInput } from "../context/InputContext";
import { FaStop, FaImage } from "react-icons/fa";
import { useCallback, useRef, useState, useEffect } from "react";
import { BsChatLeftTextFill } from "react-icons/bs";

const InputBox = ({ sendPrompt, isPending }) => {
  const [toolType, setToolType] = useState("TEXT");
  const controllerRef = useRef(null);

  // Clean up on unmount
  useEffect(() => {
    return () => {
      if (controllerRef.current) {
        controllerRef.current.abort();
      }
    };
  }, []);

  const changeToolType = useCallback(() => {
    setToolType((prev) => (prev === "TEXT" ? "IMAGE" : "TEXT"));
  }, []);

  const handleSubmit = (e) => {
    // Abort any ongoing request before starting new one
    if (controllerRef.current) {
      controllerRef.current.abort();
    }
    
    // Create new controller for this request
    controllerRef.current = new AbortController();
    sendPrompt(e, toolType, controllerRef);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="lg:w-[60%] w-[90%] p-2 rounded-md absolute bottom-[1.5rem] right-[50%] translate-x-[50%] z-10 bg-[var(--textarea-bg-color)]"
    >
      <Input
        toolType={toolType}
        isPending={isPending}
        handleSubmit={handleSubmit}
      />
      <Toolbar
        isPending={isPending}
        toolType={toolType}
        changeToolType={changeToolType}
        controllerRef={controllerRef}
      />
    </form>
  );
};

const Input = ({ isPending, toolType, handleSubmit }) => {
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
      handleSubmit(event);
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

const Toolbar = ({ isPending, toolType, changeToolType, controllerRef }) => {
  return (
    <div className="flex justify-between">
      <button
        type="button"
        disabled={isPending}
        className="text-[1.3rem] px-2 cursor-pointer transition-all duration-500 ease-in-out hover:text-black"
        onClick={changeToolType}
      >
        {toolType === "TEXT" ? (
          <BsChatLeftTextFill title="Generate content" />
        ) : (
          <FaImage title="Generate image" />
        )}
      </button>
      
      {isPending ? (
        <button
          type="button"
          className="h-[1.8rem] w-[1.8rem] bg-[var(--send-button-bg-color)] rounded-[50%] flex items-center justify-center cursor-pointer transition-all duration-500 ease-in-out hover:bg-blue-200 hover:text-black"
          onClick={() => controllerRef.current?.abort()}
        >
          <FaStop />
        </button>
      ) : (
        <button
          type="submit"
          className="h-[1.8rem] w-[1.8rem] bg-[var(--send-button-bg-color)] rounded-[50%] flex items-center justify-center cursor-pointer transition-all duration-500 ease-in-out hover:bg-blue-200 hover:text-black"
        >
          <FaArrowUp />
        </button>
      )}
    </div>
  );
};

export default InputBox;