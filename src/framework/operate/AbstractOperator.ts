import {IProjectInfo, ProjectDataType} from "../../designer/DesignerType";

export abstract class AbstractOperator {

    public abstract createProject(project: IProjectInfo): Promise<string>;

    public abstract updateProject(projectData: IProjectInfo): Promise<boolean> ;

    public abstract deleteProject(id: string): Promise<boolean>;

    public abstract getProjectInfoList(): Promise<IProjectInfo[]>;

    public abstract getProjectData(id: string): Promise<ProjectDataType | null>;

    public abstract copyProject(id: string, name?: string): Promise<string>;
}