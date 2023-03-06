import { Router } from 'shared/lib/core';
import { Link } from './link';
const router = new Router();

export class RouterLink extends Link {
  static _name = 'RouterLink';

  constructor(props: ILink) {
    const onClick = () => {
      router.go(this.state.href as string);
    };

    super({ ...props, onClick });
  }
}
