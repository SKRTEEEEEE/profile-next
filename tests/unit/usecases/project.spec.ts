import { test, expect } from "@playwright/test";
import path from "path";
import fs from "fs";

/**
 * Unit Tests for Project Use Cases
 * These tests verify the existence and structure of project use case modules
 */
test.describe("Project Use Cases", () => {
  test.describe("readExampleProjectsUC", () => {
    test("should have use case file in correct location", async () => {
      // Verify the file exists
      const useCasePath = path.join(process.cwd(), "src", "core", "application", "usecases", "entities", "project.ts");
      const fileExists = fs.existsSync(useCasePath);
      
      expect(fileExists).toBeTruthy();
    });

    test("should have correct TypeScript module structure", async () => {
      // Read the file content
      const useCasePath = path.join(process.cwd(), "src", "core", "application", "usecases", "entities", "project.ts");
      const content = fs.readFileSync(useCasePath, "utf-8");
      
      // Verify it exports readExampleProjectsUC
      expect(content).toContain("readExampleProjectsUC");
      expect(content).toContain("export");
      
      // Verify it uses async/await or returns Promise
      expect(content.includes("async") || content.includes("Promise")).toBeTruthy();
    });
  });
});
