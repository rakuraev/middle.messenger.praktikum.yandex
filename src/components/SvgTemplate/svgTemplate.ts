import Block from '../../core/Block/Block';
import './svgTemplate.css';

class SvgTemplate extends Block<SvgTemplateProps> {
  static _name = 'SvgTemplate';

  constructor(svgTemplateProps: ISvgTemplate) {
    super({ ...svgTemplateProps });
  }

  render() {
    return `<svg class="svg-icon">
              <use xlink:href="#{{svgId}}" width="100%" height="100%"></use>
            </svg>`;
  }
}

export default SvgTemplate;
