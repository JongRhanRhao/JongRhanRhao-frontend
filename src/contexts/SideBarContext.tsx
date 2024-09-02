import React, { createContext, useContext, useState, ReactNode } from "react";

interface SidebarContextProps {
  leftSidebarExpanded: boolean;
  toggleLeftSidebar: () => void;
  rightSidebarExpanded: boolean;
  toggleRightSidebar: () => void;
}

const SidebarContext = createContext<SidebarContextProps | undefined>(
  undefined
);

export const useSidebarContext = () => {
  const context = useContext(SidebarContext);
  if (!context) {
    throw new Error("useSidebarContext must be used within a SidebarProvider");
  }
  return context;
};

export const SidebarProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [leftSidebarExpanded, setLeftSidebarExpanded] = useState(false);
  const [rightSidebarExpanded, setRightSidebarExpanded] = useState(false);

  const toggleLeftSidebar = () => setLeftSidebarExpanded((prev) => !prev);
  const toggleRightSidebar = () => setRightSidebarExpanded((prev) => !prev);
  return (
    <SidebarContext.Provider
      value={{
        leftSidebarExpanded,
        toggleLeftSidebar,
        rightSidebarExpanded,
        toggleRightSidebar,
      }}
    >
      {children}
    </SidebarContext.Provider>
  );
};
