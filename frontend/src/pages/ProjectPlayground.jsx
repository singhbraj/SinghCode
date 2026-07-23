import { useEffect } from 'react'
import { io } from 'socket.io-client'
import { useParams } from 'react-router-dom'
import { EditorComponent } from '../components/molecules/EditorComponent/EditorComponent'
import { EditorButton } from '../components/atoms/EditorButton.jsx/EdittorButton'
import { TreeStructure } from '../components/organisms/TreeStructure'
import  useTreeStructureStore from '../store/treeStructureStore'
import useEditorSocketStore from '../store/editorSocketStore'

export const ProjectPlayground = () => {
  const { projectId } = useParams();

  const { setEditorSocket } = useEditorSocketStore();

  useEffect(() => {
    if (!projectId) return;

    const socket = io(`${import.meta.env.VITE_BACKEND_URL}/editor`, {
      query: {
        projectId,
      },
    });
    setEditorSocket(socket);

    return () => {
      socket.disconnect();
      setEditorSocket(null);
    };
  }, [projectId, setEditorSocket]);

    return (

        <div 
        style={{
            display: 'flex',
        }}
        >

            {projectId && (
                <div
                 style={{
                    backgroundColor: '#333254',
                    paddingRight:'10x',
                    paddingTop:'0.3vh',
                    minWidth:'250x',
                    maxWidth:'25%',
                    height:'99.7vh',
                    overflow:'auto',
                 }}
                >
                    <TreeStructure />
        </div>
      )}
      <EditorComponent />
      {/* <EditorButton /> */}
    </div>
  );
};