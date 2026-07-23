import { create } from 'zustand';
import { getProjectTree } from '../apis/projects';

const useTreeStructureStore = create((set, get) => ({
  treeStructure: null,
  projectId: null,
  setTreeStructure: async (projectId) => {
    const id = projectId || get().projectId;
    if (!id) return;

    const projectTree = await getProjectTree(id);
    set({ treeStructure: projectTree, projectId: id });
  },
}));

export default useTreeStructureStore;
