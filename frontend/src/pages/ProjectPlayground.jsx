import { useParams } from 'react-router-dom'
import { EditorComponent } from '../components/molecules/EditorComponent/EditorComponent'
import { EditorButton } from '../components/atoms/EditorButton.jsx/EdittorButton'
import { TreeStructure } from '../components/organisms/TreeStructure'
import { useTreeStructureStore } from '../store/treeStructureStore'

export const ProjectPlayground = () => {
  const {projectId} = useParams();
    return (
        <div>
            <h1>Project Playground</h1>
            <p>Project ID: {projectId}</p>
            <TreeStructure />
            <EditorComponent />
            <EditorButton />
        </div>
    )
}