import { IoIosArrowDown, IoIosArrowForward } from 'react-icons/io';
import { useState } from 'react';
import { FileIcon } from '../../atoms/FileIcon/Fileicon';
import useEditorSocketStore from '../../../store/editorSocketStore';
import { useFileContextMenuStore } from '../../../store/fileContextMenuStore';

export const TreeNode = ({ fileFolderData }) => {
  const [visibility, setVisibility] = useState({});

  const { editorSocket } = useEditorSocketStore();

  const { setIsOpen, setX:setFileContextX, setY:setFileContextY, setFile } = useFileContextMenuStore();

  function toggleVisibility(name) {
    setVisibility((prev) => ({
      ...prev,
      [name]: !prev[name],
    }));
  }

  function computeExtension(name) {
    return name.split('.').pop();
  }

  function handleDoubleClick(fileFolderData) {
    console.log("braj", fileFolderData);
    editorSocket?.emit('readFile', {
      pathToFileOrFolder:fileFolderData.path,
    });
  }

  function handleContextMenuForFiles(e, path) {
    e.preventDefault();
    e.stopPropagation();
    setFile(path);
    setFileContextX(e.clientX);
    setFileContextY(e.clientY);
    setIsOpen(true);
  }

  return (
    fileFolderData && (
      <div
        style={{
          paddingLeft: '15px',
          color: 'white',
        }}
      >
        {fileFolderData.children ? (
          <button
            onClick={() => toggleVisibility(fileFolderData.name)}
            style={{
              border: 'none',
              cursor: 'pointer',
              outline: 'none',
              color: 'white',
              backgroundColor: 'transparent',
              padding: '15px',
              fontSize: '16px',
              marginTop: '7px',
            }}
          >
            {visibility[fileFolderData.name] ? <IoIosArrowForward style={{ height: '10px', width: '10px' }} /> : <IoIosArrowDown style={{ height: '10px', width: '10px' }} />}
            {fileFolderData.name}
          </button>
        ) : (

          // If the current node is not a folder, display the file name 
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'start' }}>
            <FileIcon extension={computeExtension(fileFolderData.name)} />
          <p
            style={{
              paddingTop: '15px',
              paddingBottom: '15px',
              fontSize: '16px',
              cursor: 'pointer',
              marginLeft: '7px',
              marginTop: '10px',
            }}
            onDoubleClick={() => handleDoubleClick(fileFolderData)}
            onContextMenu={(e) => handleContextMenuForFiles(e, fileFolderData.path)}
          >
            {fileFolderData.name}
          </p>
          </div>
        )}
        {visibility[fileFolderData.name] && fileFolderData.children && fileFolderData.children.map((child) => (
          <TreeNode key={child.name} fileFolderData={child} />
        ))}
      </div>
    )
  );
};
