import InputBox from "./components/InputBox";
import OutputBox from "./components/OutputBox";
import usePromptHandler from "./hooks/usePromptHandler";

const App = () => {
  const { sendPrompt, isPending } = usePromptHandler();

  return (
    <>
      <div className="h-[100dvh] relative py-3">
        <h1 className="text-2xl font-bold mb-4 text-center shadow-md w-[90%] m-auto pb-[1rem]">
          Promptly 🤖
        </h1>
        <InputBox sendPrompt={sendPrompt} isPending={isPending} />
        <OutputBox isPending={isPending} />
      </div>
    </>
  );
};

export default App;
