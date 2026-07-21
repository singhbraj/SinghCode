import { useParams } from 'react-router-dom'
import { EditorComponent } from '../components/molecules/EditorComponent/EditorComponent'
import { EditorButton } from '../components/atoms/EditorButton.jsx/EdittorButton'

export const ProjectPlayground = () => {

    const {projectId} = useParams()

    return (
        <div>
            <h1>Project Playground</h1>
            <p>Project ID: {projectId}</p>
            <EditorComponent />
            <EditorButton />
        </div>
    )
}