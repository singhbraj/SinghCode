import { IoIosArrowForward } from 'react-icons/io';
import { useState } from 'react';

export const TreeNode = ({ fileFolderData }) => {
  console.log("braj",fileFolderData);
  const [visibility, setVisibility] = useState({});

  function toggleVisibility(name){
    setVisibility((prev) => ({
      ...prev,
      [name]: !prev[name],
    })); 
  }

  return (
    fileFolderData && (
      <div
        style={{
          paddingLeft: '15px',
          color: 'black',
        }}
      >
        {fileFolderData.children ? (
          <button
            onClick={() => toggleVisibility(fileFolderData.name)}
            style={{
              border: 'none',
              cursor: 'pointer',
              outline: 'none',
              color: 'black',
              backgroundColor: 'transparent',
              padding: '15px',
              fontSize: '16px',
            }}
          >
            <IoIosArrowForward style={{ height: '10px', width: '10px' }} />
            {fileFolderData.name}
          </button>
        ) : (
          <p
            style={{
              paddingTop: '15px',
              fontSize: '16px',
              cursor: 'pointer',
              marginLeft: '5px',
            }}
          >
            {fileFolderData.name}
          </p>
        )}
      </div>
    )
  );
};
