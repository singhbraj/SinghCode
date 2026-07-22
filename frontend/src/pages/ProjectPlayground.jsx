import { useParams } from 'react-router-dom'
import { EditorComponent } from '../components/molecules/EditorComponent/EditorComponent'
import { EditorButton } from '../components/atoms/EditorButton.jsx/EdittorButton'
import { TreeStructure } from '../components/organisms/TreeStructure'
import { useTreeStructureStore } from '../store/treeStructureStore'

export const ProjectPlayground = () => {
  const {projectId} = useParams();
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