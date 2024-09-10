import { create } from "zustand";

interface SidebarState {
  leftSidebarExpanded: boolean;
  rightSidebarExpanded: boolean;
  toggleLeftSidebar: () => void;
  toggleRightSidebar: () => void;
}

export const useSidebarStore = create<SidebarState>((set) => ({
  leftSidebarExpanded: false,
  rightSidebarExpanded: false,
  toggleLeftSidebar: () =>
    set((state) => ({ leftSidebarExpanded: !state.leftSidebarExpanded })),
  toggleRightSidebar: () =>
    set((state) => ({ rightSidebarExpanded: !state.rightSidebarExpanded })),
}));

export const useSidebar = () => {
  const {
    leftSidebarExpanded,
    rightSidebarExpanded,
    toggleLeftSidebar,
    toggleRightSidebar,
  } = useSidebarStore();

  return {
    leftSidebarExpanded,
    rightSidebarExpanded,
    toggleLeftSidebar,
    toggleRightSidebar,
  };
};
