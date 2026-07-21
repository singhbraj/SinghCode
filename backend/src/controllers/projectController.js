import { createReactProject,getProjectTreeService } from '../services/projectService.js';


export const createProjectController = async (req, res) => {
   
    const projectId = await createReactProject(projectName);

      return res.status(200).json({ message: 'Project created', data:projectId });
}


export const getProjectTreeController = async (req, res) => {
  const tree = await getProjectTreeService(req.params.projectId); 
  return res.status(200).json({ message: 'Successfully fetched the tree', success: true, data:tree });
}