import { useState, useEffect, useRef } from 'react'
import Editor from '@monaco-editor/react'
import useActiveFileTabStore from '../../../store/activeFileTabStore';
import useEditorSocketStore from '../../../store/editorSocketStore';

 export const EditorComponent = () => {

    const [editorState, setEditorState] = useState({
      theme:null
    })

    const {activeFileTab} = useActiveFileTabStore();
    const {editorSocket} = useEditorSocketStore();

    const timerId = useRef(null);

    async function downloadTheme() {
        const response = await fetch('/Dracula.json')
        const data = await response.json()
        setEditorState({...editorState, theme:data})
    }

    function handleEditorMount(editor,monaco) {
        monaco.editor.defineTheme('dracula', editorState.theme)
        monaco.editor.setTheme('dracula')
    }

    function handleEditorChange(value) {
      
      if(timerId.current){
        clearTimeout(timerId.current);
      }

      timerId.current = setTimeout(() => {
        clearTimeout(timerId.current);  
      const editorContent = value;

      editorSocket?.emit('writeFile', {
        pathToFileOrFolder:activeFileTab?.path,
          data:editorContent,
        });
      }, 1000);
    }

    useEffect(() => {
        downloadTheme()
    }, [])

    return (
     <>
     {editorState.theme && (
       <Editor
       height={'100vh'}
       width={'100%'}
       language={undefined}
       defaultValue={`// Welcome to the playground`}
       options={{
        fontSize: 14,
        fontFamily: 'monospace',
       }}
       value={activeFileTab?.value ? activeFileTab?.value : '// Welcome to the playground'}
       onMount={handleEditorMount}
       onChange={handleEditorChange}
       />
       )}
     </>
    )
}