export default class Render {
  constructor(component) {
    this.template = component.template;
    this.path = component.path;
    this.state = component.state || {};
  }
  render() {
    return this.template(this.state);
  }
}
