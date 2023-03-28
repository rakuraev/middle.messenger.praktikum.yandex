// interface IRoute{
//   new
// }

interface IRouter {
  start(): void;

  use(path: string, callback: () => void): IRouter;

  go(path: string): void;

  back(): void;

  forward(): void;
}
