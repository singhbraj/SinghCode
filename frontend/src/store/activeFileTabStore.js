import { create } from 'zustand';

const useActiveFileTabStore = create((set) => ({
  activeFileTab: null,
  setActiveFile: (path, value, extension) => {
    set({
      activeFileTab: {
        path,
        value,
        extension,
      },
    });
  },
  clearActiveFile: () => {
    set({ activeFileTab: null });
  },
}));

export default useActiveFileTabStore;
