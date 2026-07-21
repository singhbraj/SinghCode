import { useParams } from 'react-router-dom'
import { EditorComponent } from '../components/atoms/molecules/EditorComponent/EditorComponent'
export const ProjectPlayground = () => {

    const {projectId} = useParams()

    return (
        <div>
            <h1>Project Playground</h1>
            <p>Project ID: {projectId}</p>
            <EditorComponent />
        </div>
    )
}