import until from 'util'
import child_process from 'child_process'
import fs from 'fs/promises'
import uuid4 from 'uuid4';
import { REACT_PROJECT_COMMAND } from '../config/serverConfig.js';

const execPromisified = until.promisify(child_process.exec);

export const createProjectController = async (req, res) => {
   
  // Create a unique id an then the projects folder create a new folder with that id 
    const projectId = uuid4();

    console.log(projectId)

    await fs.mkdir(`./projects/${projectId}`)

    // After this call the npm create vite command to create a new vite project
    const response =  await execPromisified(REACT_PROJECT_COMMAND, {
         cwd: `./projects/${projectId}`
    })

    return res.status(200).json({ message: 'Project created', data:projectId });
}