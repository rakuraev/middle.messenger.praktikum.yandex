declare type HandlebarsTemplate = (context?: object) => string;
declare function HbsModuleExport(context?: object): string;

declare module './*.hbs' {
  export default HbsModuleExport;
}

declare type RouterPage = {
  path: string;
  component: Block;
};

declare type Nullable<T> = T | null;
declare type Unknowed<T> = T | unknown;