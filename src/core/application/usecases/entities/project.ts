import { ReadProjectUseCase } from "../project.usecases";
import { projectApiRepository } from "@/core/infrastructure/api/project.repo";

/**
 * Read example projects use case
 * Fetches example projects from the backend API
 * @returns Array of projects or empty array if error
 */
export const readExampleProjectsUC = async () => {
  const result = await new ReadProjectUseCase(projectApiRepository).execute();
  
  if (!result.success || !result.data) {
    console.error("Error reading example projects:", result.message);
    return [];
  }
  
  return result.data;
};

/**
 * Read deployed projects use case (alias for example projects)
 * Fetches deployed/production projects from the backend API
 * @returns Array of projects or empty array if error
 */
export const readProjectsDeployedUC = async () => {
  // For now, this is the same as readExampleProjectsUC
  // In the future, this might query a different endpoint
  return readExampleProjectsUC();
};
