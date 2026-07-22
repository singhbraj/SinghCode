import fs from "fs/promises";

export const handlerEditorSocketEvents = (socket) =>{
 
     socket.on("writeFile", async({data, pathToFileOrFOlder})=>{
        try{
            await fs.writeFile(pathToFileOrFOlder, data);
            socket.emit("writeFileSuccess",{
                data:"File written successfully",
            })
        }catch(error){
            console.error("Error writing file",error);
            socket.emit("error", {data: "Failed to write file"});
        }
     })


     socket.on("createFile", async({pathToFileOrFolder})=>{
        const isFileAlreadyExits = await fs.stat(pathToFileOrFolder);
        if(isFileAlreadyExits){
            socket.emit("error", {data: "File already exists"});
            return;
        }
        try{
            const response = await fs.writeFile(pathToFileOrFolder, "");
            socket.emit("createFileSuccess",{
                data:"File created successfully",
            })
        }catch(error){
            console.error("Error creating file",error);
            socket.emit("error", {data: "Failed to create file"});
        }
    })

    socket.on("readFile", async({pathToFileOrFolder  })=>{
        try{
            const response = await fs.readFile(pathToFileOrFolder);
            console.log("Response from readFile",response.toString());
            socket.emit("readFileSuccess",{
                value:response.toString(),
                path:pathToFileOrFolder,
            })
        }catch(error){
            console.error("Error reading file",error);
            socket.emit("error", {data: "Failed to read file"});
        }
    })

    socket.on("deleteFile", async({pathToFileOrFolder})=>{
        try{
            const response = await fs.unlink(pathToFileOrFolder);
            socket.emit("deleteFileSuccess",{
                data:"File deleted successfully",
            })
        }catch(error){
            console.error("Error deleting file",error);
            socket.emit("error", {data: "Failed to delete file"});
        }
    })

    socket.on("createFolder", async({pathToFolder})=>{
        try{
            await fs.mkdir(pathToFolder);
            socket.emit("createFolderSuccess",{
                data:"Folder created successfully",
            })
        }catch(error){
            console.error("Error creating folder",error);
            socket.emit("error", {data: "Failed to create folder"});
        }
    })

    socket.on("deleteFolder", async({pathToFolder})=>{
        try{
            await fs.rmdir(pathToFolder,{recursive: true});
            socket.emit("deleteFolderSuccess",{
                data:"Folder deleted successfully",
            })
        }catch(error){
            console.error("Error deleting folder",error);
            socket.emit("error", {data: "Failed to delete folder"});
        }
    })
}