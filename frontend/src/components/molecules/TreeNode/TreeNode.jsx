import { IoIosArrowDown, IoIosArrowForward } from 'react-icons/io';
import { useState } from 'react';
import { FileIcon } from '../../atoms/FileIcon/Fileicon';

export const TreeNode = ({ fileFolderData }) => {
  console.log("braj", fileFolderData);
  const [visibility, setVisibility] = useState({});

  function toggleVisibility(name) {
    setVisibility((prev) => ({
      ...prev,
      [name]: !prev[name],
    }));
  }

  function computeExtension(name) {
    return name.split('.').pop();
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
            }}
          >
            {visibility[fileFolderData.name] ? <IoIosArrowForward style={{ height: '10px', width: '10px' }} /> : <IoIosArrowDown style={{ height: '10px', width: '10px' }} />}
            {fileFolderData.name}
          </button>
        ) : (

          // If the current node is not a folder, display the file name 
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <FileIcon extension={computeExtension(fileFolderData.name)} />
          <p
            style={{
              paddingTop: '5px',
              fontSize: '16px',
              cursor: 'pointer',
              marginLeft: '5px',
            }}
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
