import Block from '../../core/Block/Block';
import './svgTemplate.css';

interface ISvgTemplateProps {
  svgId: string;
}
class SvgTemplate extends Block {
  static _name = 'SvgTemplate';

  constructor(svgTemplateProps: ISvgTemplateProps) {
    super({ ...svgTemplateProps });
  }

  render() {
    return `<svg class="svg-icon">
              <use xlink:href="#{{svgId}}" width="100%" height="100%"></use>
            </svg>`;
  }
}

export default SvgTemplate;
