import { ResFlow } from "@skrteeeeee/profile-domain";
import { ApiBaseRepository } from "./base.repo";

import { ReadAllParams } from "@skrteeeeee/profile-domain";
import type { Lib, ReadAllFlattenTechsRes, ReadCategoryTechsRes, TechInterface } from "@/core/application/interface/tech.interface";
import { FullTechData } from "@skrteeeeee/profile-domain";
// src/core/infrastructure/api/tech.repository(-or->service).ts
export class TechApiRepository
  extends ApiBaseRepository
  implements TechInterface
{
  constructor(baseUrl: string) {
    super(baseUrl);
  }

  protected defineEndpoints() {
    return {
      getTech: { method: "GET", url: "tech/:type" },
    } as const;
  }

  readDb(): Promise<ResFlow<Lib[]>> {
    return this.request<ResFlow<Lib[]>>("getTech", { headers: { "Content-type": "application/json" } }, { type: ReadAllParams.Db });
  }

  readFlatten(): Promise<ResFlow<FullTechData[]>> {
    return this.request<ResFlow<FullTechData[]>>("getTech", { headers: { "Content-type": "application/json" } }, { type: ReadAllParams.Flatten });
  }

  readCategory(): Promise<ResFlow<ReadCategoryTechsRes>> {
    return this.request<ResFlow<ReadCategoryTechsRes>>("getTech", { headers: { "Content-type": "application/json" } }, { type: ReadAllParams.Category });
  }

  readFull(): Promise<ResFlow<ReadAllFlattenTechsRes>> {
    return this.request<ResFlow<ReadAllFlattenTechsRes>>("getTech", { headers: { "Content-type": "application/json" } }, { type: ReadAllParams.Full });
  }
}

// src/core/infrastructure/api/tech.singleton.ts
export const techApiRepository = new TechApiRepository(process.env.TEST_ENV !== "development" ? "https://kind-creation-production.up.railway.app" : "http://localhost:3001");

console.log("test_env: ",process.env.TEST_ENV)