import { memo } from "react";
import { generateRandomID } from "../utils/generateRandomID";
import { FaDownload } from "react-icons/fa";

const OutputLists = ({ chats }) => {
  return chats.map((data) => {
    return <OutputMessage key={generateRandomID()} data={data} />;
  });
};

const OutputMessage = memo(({ data }) => {
  return (
    <div className="h-auto flex flex-col">
      <div
        className={`h-fit self-end text-wrap ${
          data.type === "self"
            ? "max-w-[70%] self-end bg-[var(--user-bubble-color)] rounded-2xl px-4 py-2"
            : `max-w-[90%] self-start px-4 py-2 ${
                data.success === false && "text-red-500"
              }`
        }`}
      >
        {data?.image ? (
          <>
            <img
              src={data.image}
              alt="image"
              className=" h-auto w-auto rounded-md cursor-pointer transition-opacity duration-300 ease-in-out opacity-100 group-hover:opacity-60"
            />
            <a
              href={data.image}
              className="h-fit w-fit mt-2 flex items-baseline gap-2 text-green-500 transition-all duration-300 ease-in-out hover:text-green-300"
              download
            >
              <FaDownload /> Download
            </a>
          </>
        ) : (
          <p className="whitespace-pre-wrap break-words">{data.message}</p>
        )}
      </div>
    </div>
  );
});

export default OutputLists;
