
export default class Render {
  template: HandlebarsTemplate;
  path: string;
  state: object;

  constructor(component: Component) {
    this.template = component.template;
    this.path = component.path;
    this.state = component.state || {};
  }

  render() {
    return this.template(this.state);
  }
}
