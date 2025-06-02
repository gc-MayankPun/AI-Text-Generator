import { FaSpinner } from "react-icons/fa6";
import { useInput } from "../context/InputContext";
import { useMessage } from "../context/MessageContext";
import { useEffect } from "react";
import OutputLists from "./OutputLists";

const OutputBox = ({ isPending }) => {
  const { outputRef, scrollRef } = useInput();
  const { chats } = useMessage();

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [chats]);

  if (chats.length === 0) {
    return <p className="text-center mt-[2rem]">Ready to create? Choose text or image and start prompting! 🥰</p>
  }

  return (
    <div
      ref={outputRef}
      className="h-[calc(100dvh_-_11rem)] lg:w-[60%] w-[90%] m-auto p-4 overflow-x-hidden overflow-y-auto scroll-smooth pb-[6rem] flex flex-col gap-[2rem]"
    >
      <OutputLists chats={chats} />

      {isPending && <Loader />}

      <div ref={scrollRef}></div>
    </div>
  );
};

const Loader = () => {
  return (
    <div className="self-start w-fit bg-gray-200 rounded-2xl px-4 py-2 flex items-center gap-2 text-gray-600 animate-pulse">
      <FaSpinner className="animate-spin" />
      <span>Generating response...</span>
    </div>
  );
};

export default OutputBox;
