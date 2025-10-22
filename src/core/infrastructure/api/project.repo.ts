import { Project, ProjectInterface } from "@/core/application/interface/project.interface";
import { ApiBaseRepository } from "./base.repo";
import { ResFlow } from "@/core/domain/flows/res.type";

export class ProjectApiRepository
extends ApiBaseRepository
implements ProjectInterface{
    constructor(baseUrl: string){
        super(baseUrl)
    }

    protected defineEndpoints(): { [key: string]: { method: "GET" | "POST" | "PUT" | "DELETE"; url: string; }; } {
        return {
            getProjectEjemplo: 
                {
                    method: "GET",
                    url: "project"
                } as const
        }
    }

    readEjemplo(): Promise<ResFlow<Project[]>> {
        return this.request<ResFlow<Project[]>>("getProjectEjemplo", { headers: { "Content-type": "application/json" } })
    }
}

//singleton
// 🔥 FORZADO A LOCALHOST PARA DEBUGGING
// export const projectApiRepository = new ProjectApiRepository("http://localhost:3001")
export const projectApiRepository = new ProjectApiRepository(process.env.TEST_ENV !== "development" ? "https://kind-creation-production.up.railway.app" : "http://localhost:3001")
