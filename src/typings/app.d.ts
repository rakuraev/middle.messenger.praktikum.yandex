declare type HandlebarsTemplate = (context?: object) => string;
declare function HbsModuleExport(context?: object): string;

declare module './*.hbs' {
  export default HbsModuleExport;
}

declare type Component = {
  path: string;
  template: HandlebarsTemplate;
  state?: unknown;
};
