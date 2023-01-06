import ChatsController from '../../../../controllers/ChatsController';
import Block from '../../../../core/Block/Block';
import Store from '../../../../core/Store';
import { StateKeys } from '../../../../store';

interface ChatListState {}

class ChatsList extends Block<ChatListProps> {
  static _name = 'ChatList';
  constructor(props: ChatListProps) {
    const selectChat = (chatId: number) => {
      Store.set(StateKeys.ChatId, chatId);
      ChatsController.getChatTokenById(chatId);
    };
    const chats = props.chats.map((chat: ChatsListData) => ({
      ...chat,
      selectChat,
    }));
    super({ ...props, chats, selectChat });
  }

  render() {
    return `    <div class="users-list-container">
                  <ul class="users-list">
                  {{#each chats}}
                    {{{ChatListUser onClick=selectChat id=id title=title avatar=avatar unreaded_count=unreaded_count last_message=last_message}}}
                  {{/each}}
                  </ul>
                </div>`;
  }
}

export default ChatsList;
