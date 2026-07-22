import { useEffect } from 'react';
import { useTreeStructureStore } from '../../store/treeStructureStore';
import { useParams } from 'react-router-dom';
import { TreeNode } from '../molecules/TreeNode/TreeNode';

export const TreeStructure = () => {

    const { treeStructure, setTreeStructure } = useTreeStructureStore();

    const {projectId} = useParams();


    useEffect(() => {
     if(treeStructure){
       console.log(treeStructure);
     } else {
        setTreeStructure(projectId);
     }
    }, [projectId,setTreeStructure, treeStructure]);

    return (
        <div>
            <h1>Tree Structure</h1>
            <TreeNode fileFolderData={treeStructure} />
        </div>
    )
}