import { useEffect } from 'react';
import { useTreeStructureStore } from '../../store/treeStructureStore';
import { useParams } from 'react-router-dom';
import { TreeNode } from '../molecules/TreeNode/TreeNode';
import { useFileContextMenuStore } from '../../store/fileContextMenuStore';
import { FileContextMenu } from '../molecules/ContextMenu/FileContextMenu';

export const TreeStructure = () => {

    const { treeStructure, setTreeStructure } = useTreeStructureStore();
    const {isOpen:isFileContextOpen, x:fileContextX,y:fileContextY, file} = useFileContextMenuStore();
   

    const {projectId} = useParams();


    useEffect(() => {
     if(treeStructure){
       console.log(treeStructure);
     } else {
        setTreeStructure(projectId);
     }
    }, [projectId,setTreeStructure, treeStructure]);

    return (
        <>
           {isFileContextOpen && fileContextX && fileContextY &&
            <FileContextMenu x={fileContextX} y={fileContextY}  path={file} />}
            <TreeNode fileFolderData={treeStructure} />
        </>
    )
}