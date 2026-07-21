import fs from 'fs/promises'
import uuid4 from 'uuid4';
import { REACT_PROJECT_COMMAND } from '../config/serverConfig.js';
import { execPromisified } from '../util/execUtil.js';
import directoryTree from 'directory-tree';
import path from 'path';

export const createReactProject = async (projectName) => {
    // Create a unique id an then the projects folder create a new folder with that id 
    const projectId = uuid4();

    console.log(projectId)

    await fs.mkdir(`./projects/${projectId}`)

    // After this call the npm create vite command to create a new vite project
    const response =  await execPromisified(REACT_PROJECT_COMMAND, {
         cwd: `./projects/${projectId}`
    })
}


export const getProjectTreeService = async (projectId) => {

const projectPath = path.resolve(`./projects/${projectId}`)
const tree = directoryTree(projectPath)
return tree
}