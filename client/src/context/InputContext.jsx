import { createContext, useRef, useMemo, use } from "react";

const InputContext = createContext(null);

export const InputContextProvider = ({ children }) => {
  const inputRef = useRef(null);
  const outputRef = useRef(null);
  const scrollRef = useRef(null);

  const value = useMemo(() => ({ inputRef, outputRef, scrollRef }), []);
  return (
    <InputContext.Provider value={value}>{children}</InputContext.Provider>
  );
};

export const useInput = () => use(InputContext);
