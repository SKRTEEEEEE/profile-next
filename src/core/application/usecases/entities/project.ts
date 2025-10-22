import { ReadProjectUseCase } from "../project.usecases";
import { projectApiRepository } from "@/core/infrastructure/api/project.repo";

/**
 * Read example projects use case
 * Fetches example projects from the backend API
 * @returns Array of projects or empty array if error
 */
export const readExampleProjectsUC = async () => {
  try {
    const result = await new ReadProjectUseCase(projectApiRepository).execute();
    
    if (!result.success || !result.data) {
      console.error("❌ Error reading example projects");
      return [];
    }
    
    return result.data;
  } catch (error) {
    console.error("❌ Exception reading example projects:", error);
    return [];
  }
};

/**
 * Read deployed projects use case
 * Fetches example/deployed projects from the backend API
 * Note: In the migration phase, this returns all example projects
 * since the backend filters by ejemplo:true which includes deployed projects
 * @returns Array of projects or empty array if error
 */
export const readProjectsDeployedUC = async () => {
  // In the migration phase, we use the same endpoint as readExampleProjectsUC
  // The backend API doesn't have a separate endpoint for deployed projects yet
  // So we return all example projects (ejemplo: true)
  return readExampleProjectsUC();
};
