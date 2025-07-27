export interface PipeConfig {
  index: number;
  description: string;
}

export interface SavedConfigsType {
  pipeConfigs: PipeConfig[];
  pipeFieldValues: { [key: number]: string };
  [key: string]: any;
}

export interface MappedItem {
  index: number;
  value: string;
  description: string;
}

export interface TemplateConfigsType {
  [key: string]: PipeConfig[];
}