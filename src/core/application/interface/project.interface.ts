import { IntlBase } from "@/core/domain/entities/intl.type";
import { KeyProject, TechProject, TimeProject } from "@/core/domain/entities/project";
import { ResFlow } from "@/core/domain/flows/res.type";
import { DBBase, LucideIconNames } from "@/dynamic.types";
export type Project = {
  nameId: string;
  openSource: null | string;
  operative: null | string;
  ejemplo: boolean;
  image: null | string;
  icon: LucideIconNames;
  title: IntlBase;
  desc: IntlBase;
  lilDesc: IntlBase;
  time: (TimeProject & { id: string })[];
  keys: (KeyProject<LucideIconNames> & { id: string })[];
  techs: (TechProject & { id: string })[];
} & DBBase
export interface ProjectInterface {
    readEjemplo(): Promise<ResFlow<Project[]>>
    readById(id: string): Promise<ResFlow<Project>>
}