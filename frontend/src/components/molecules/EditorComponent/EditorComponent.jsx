import { useState, useEffect } from 'react'
import Editor from '@monaco-editor/react'

 export const EditorComponent = () => {

    const [editorState, setEditorState] = useState({
      theme:null
    })

    async function downloadTheme() {
        const response = await fetch('/Dracula.json')
        const data = await response.json()
        setEditorState({...editorState, theme:data})
    }

    function handleEditorMount(editor,monaco) {
        monaco.editor.defineTheme('dracula', editorState.theme)
        monaco.editor.setTheme('dracula')
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
       language={'javascript'}
       defaultValue={`// Welcome to the playground`}
       options={{
        fontSize: 14,
        fontFamily: 'monospace',
       }}
       onMount={handleEditorMount}
       />
       )}
     </>
    )
}