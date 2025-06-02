import { createContext, use, useMemo, useState } from "react";

const MessageContext = createContext(null);

export const MessageContextProvider = ({ children }) => {
  const [chats, setChats] = useState([]);

  const value = useMemo(() => ({ chats, setChats }), [chats]);

  return (
    <MessageContext.Provider value={value}>{children}</MessageContext.Provider>
  );
};

export const useMessage = () => use(MessageContext);
