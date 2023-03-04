declare type HandlebarsTemplate = (context?: object) => string;

declare function HbsModuleExport(context?: object): string;

declare module './*.hbs' {
  export default HbsModuleExport;
}

declare type Nullable<T> = T | null;
declare type Unknowed<T> = T | unknown;

declare type PickType<T, K extends keyof T> = Pick<T, K>[K];
