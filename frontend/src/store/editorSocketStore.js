import { create } from 'zustand';
import useActiveFileTabStore from './activeFileTabStore';
import useTreeStructureStore from './treeStructureStore';

const useEditorSocketStore = create((set) => ({
  editorSocket: null,
  setEditorSocket: (incomingSocket) => {
    const { setActiveFile, clearActiveFile } = useActiveFileTabStore.getState();
    const { setTreeStructure } = useTreeStructureStore.getState();

    incomingSocket?.on('readFileSuccess', (data) => {
      console.log('readFileSuccess', data);
      setActiveFile(data.path, data.value);
    });

    incomingSocket?.on('writeFileSuccess', (data) => {
      console.log('writeFileSuccess', data);
      incomingSocket?.emit('readFile', {
        pathToFileOrFolder: data?.path,
      });
    });

    incomingSocket?.on('deleteFileSuccess', (data) => {
      const deletedPath = data?.path;
      const { activeFileTab } = useActiveFileTabStore.getState();

      if (deletedPath && activeFileTab?.path === deletedPath) {
        clearActiveFile();
      }

      setTreeStructure();
    });

    set({ editorSocket: incomingSocket });
  },
}));

export default useEditorSocketStore;
