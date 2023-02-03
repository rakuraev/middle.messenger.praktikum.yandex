import Block from '../../../../core/Block/Block';

class ChatMessages extends Block<any> {
  static _name = 'ChatMessages';
  constructor(props: any) {
    super(props);
  }
  getStateFromProps(props: any): void {
    this.state = { ...props };
  }
  render() {
    return `<div>
              {{#each allMessages}}
                <div>{{content}}</div>
              {{/each}}
            </div>`;
  }
}

export default ChatMessages;
