import { ProjectInterface } from "../interface/project.interface";

export class ReadProjectUseCase {
    private readonly repo: ProjectInterface
    constructor(repo: ProjectInterface){
        this.repo = repo
    }
    execute() {
        return this.repo.readEjemplo()
    }
}