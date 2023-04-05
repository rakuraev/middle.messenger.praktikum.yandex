import { Router } from 'shared/lib/core';
import { withRouter } from 'shared/lib/decorators';
import { Link } from './link';

interface ILink {
  href?: string;
  class?: string;
  label?: string;
  router: Router;
  onClick?: () => void;
}

@withRouter
export class RouterLink extends Link {
  static _name = 'RouterLink';

  constructor(props: ILink) {
    const onClick = () => {
      props.router.go(this.state.href as string);
    };

    super({ ...props, onClick });
  }
}
