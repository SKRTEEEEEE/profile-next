import { ResFlow } from "@/core/domain/flows/res.type";
import type { Lib, ReadAllFlattenTechsRes, ReadCategoryTechsRes, TechInterface } from "@/core/application/interface/tech";
import { FullTechData } from "@/core/domain/entities/tech";

/** Db */
export class ReadTechDbUseCase {
  private readonly repository: TechInterface;

  constructor(repository: TechInterface) {
    this.repository = repository;
  }

  execute(): Promise<ResFlow<Lib[]>> {
    return this.repository.readDb();
  }
}

/** Flatten */
export class ReadTechFlattenUseCase {
  private readonly repository: TechInterface;

  constructor(repository: TechInterface) {
    this.repository = repository;
  }

  execute(): Promise<ResFlow<FullTechData[]>> {
    return this.repository.readFlatten();
  }
}

/** Category */
export class ReadTechCategoryUseCase {
  private readonly repository: TechInterface;

  constructor(repository: TechInterface) {
    this.repository = repository;
  }

  execute(): Promise<ResFlow<ReadCategoryTechsRes>> {
    return this.repository.readCategory();
  }
}

/** Full */
export class ReadTechFullUseCase {
  private readonly repository: TechInterface;

  constructor(repository: TechInterface) {
    this.repository = repository;
  }

  execute(): Promise<ResFlow<ReadAllFlattenTechsRes>> {
    return this.repository.readFull();
  }
}


