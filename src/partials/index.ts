import handleBars from 'handlebars';
import input from './PInput';
import button from './Button';
import svgTemplate from './SvgTemplate/svgTemplate';

handleBars.registerPartial('input', input);
handleBars.registerPartial('button', button);
handleBars.registerPartial('svg-template', svgTemplate);
