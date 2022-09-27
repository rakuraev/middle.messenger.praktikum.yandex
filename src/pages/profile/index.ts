import HandleBars from 'handlebars';
import photo from './components/photo.hbs';
import profile from './profile.hbs';
import state from './state';
import './profile.css';

HandleBars.registerPartial('photo', photo);

const component = {
  path: '/profile',
  template: profile,
  state,
};

export default component;
