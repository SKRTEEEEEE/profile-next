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
      console.error("❌ Error reading example projects:", result.message);
      console.error("📍 Backend URL:", process.env.TEST_ENV !== "development" ? "https://kind-creation-production.up.railway.app" : "http://localhost:3001");
      console.error("📍 Full endpoint:", process.env.TEST_ENV !== "development" ? "https://kind-creation-production.up.railway.app/project" : "http://localhost:3001/project");
      return [];
    }
    
    console.log("✅ Successfully fetched", result.data.length, "projects from backend");
    return result.data;
  } catch (error) {
    console.error("❌ Exception reading example projects:", error);
    console.error("📍 Make sure profile-nest backend is running on http://localhost:3001");
    console.error("📍 Test endpoint: http://localhost:3001/project");
    return [];
  }
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
