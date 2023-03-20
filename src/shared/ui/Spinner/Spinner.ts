import { Block } from 'shared/lib/core';
import './spinner.css';

export class Spinner extends Block {
  static _name = 'Spinner';

  render() {
    return '<div class="spinner"></div>';
  }
}
