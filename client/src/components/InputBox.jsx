import { FaArrowUp } from "react-icons/fa6";
import { useInput } from "../context/InputContext";
import { FaStop } from "react-icons/fa";

const InputBox = ({ sendPrompt, isPending }) => {
  return (
    <form
      onSubmit={sendPrompt}
      className="w-[55%] p-2 rounded-md absolute bottom-[1.5rem] right-[50%] translate-x-[50%] z-10 bg-[var(--textarea-bg-color)]"
    >
      <Input sendPrompt={sendPrompt} isPending={isPending} />
      <Toolbar sendPrompt={sendPrompt} isPending={isPending} />
    </form>
  );
};

const Input = ({ sendPrompt, isPending }) => {
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
      sendPrompt(event);
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
      placeholder="Enter your prompt here..."
      onKeyDown={handleKeyDown}
      onInput={handleResize}
    ></textarea>
  );
};

const Toolbar = ({ sendPrompt, isPending }) => {
  return (
    <div className="flex justify-end">
      <button
        type="submit"
        disabled={isPending}
        className="h-[1.8rem] w-[1.8rem] bg-[var(--send-button-bg-color)] rounded-[50%] flex items-center justify-center cursor-pointer transition-all duration-500 ease-in-out hover:bg-blue-200 hover:text-black"
        onClick={sendPrompt}
      >
        {isPending ? <FaStop /> : <FaArrowUp />}
      </button>
    </div>
  );
};

export default InputBox;
