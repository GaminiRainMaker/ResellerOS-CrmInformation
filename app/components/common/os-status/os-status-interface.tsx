export interface OsStatusWrapperProps {
  value: string;
}
export type StatusProp = {
  color: string;
  textColor: string;
  border?: string;
};
export type OsStatusType = {
  [key: string]: StatusProp;
};
