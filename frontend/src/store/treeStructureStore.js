import { create } from 'zustand';
import { getProjectTree } from '../apis/projects';

export const useTreeStructureStore = create((set) => ({
  treeStructure: null,
  setTreeStructure: async (projectId) => {
    const projectTree = await getProjectTree(projectId);
    console.log({projectTree});
    set({ treeStructure: projectTree });
  },
}));
