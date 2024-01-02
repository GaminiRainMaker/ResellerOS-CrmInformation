export interface OsStageWrapperProps {
  value: string;
}
export type StageProp = {
  color?: string;
  textColor?: string;
  border?: string;
};
export type OsStageType = {
  [key: string]: StageProp;
};
