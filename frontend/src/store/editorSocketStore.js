import { create } from 'zustand';
import useActiveFileTabStore from './activeFileTabStore';

const useEditorSocketStore = create((set) => ({
    editorSocket: null,
    setEditorSocket: (incomingSocket) => {

        incomingSocket?.on('readFileSuccess', (data) => {
            const { setActiveFile } = useActiveFileTabStore.getState();
            console.log("readFileSuccess", data);
            setActiveFile(data.path, data.value);
        });

        incomingSocket?.on('writeFileSuccess', (data) => {
            console.log("writeFileSuccess", data);
            incomingSocket?.emit('readFile', {
                pathToFileOrFolder: data?.path,
            });
        });

        set({ editorSocket: incomingSocket });
    },
}));

export default useEditorSocketStore;