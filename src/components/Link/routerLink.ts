import Router from '../../core/Router/Router';
import Link from './link';
const router = new Router();

export default class RouterLink extends Link {
  static _name = 'RouterLink';
  constructor(props: ILink) {
    const onClick = () => {
      router.go(this.state.href as string);
    };
    super({ ...props, onClick });
  }
}
