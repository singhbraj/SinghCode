import { create } from 'zustand'


export const useActiveFileTab = create((set) => ({
    activeFileTab: null,
    setActiveFileTab: (path,value,extension)=>{
        set({
            activeFileTab: {
                path:path,
                value:value,
                extension:extension
            }
        })
    }
}))