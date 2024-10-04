import { createContext, useState } from "react";

export const TaskContext = createContext<any>(null);

export const TaskProvider = ({ children }: any) => {
  const [isRefresh, setIsRefresh] = useState(false);

  return (
    <TaskContext.Provider
      value={{
        isRefresh,
        setIsRefresh,
      }}
    >
      {children}
    </TaskContext.Provider>
  );
};
