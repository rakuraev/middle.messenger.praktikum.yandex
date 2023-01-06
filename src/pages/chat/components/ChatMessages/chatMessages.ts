import Block from '../../../../core/Block/Block';
import withStore from '../../../../decorators/withStore';
import { StateKeys } from '../../../../store';

@withStore(StateKeys.ChatToken)
class ChatMessages extends Block<any> {
  static _name = 'ChatMessages';
  constructor({ chatId, ...props }: any) {
    super({ chatId, ...props });
  }
  render() {
    return `<div>{{chatToken}}</div>`;
  }
}

export default ChatMessages;
