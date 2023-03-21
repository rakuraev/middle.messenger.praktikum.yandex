import { ChatController } from 'entities/Chat';
import { StateKeys } from 'shared/config';
import { Block } from 'shared/lib/core';
import { Store } from 'shared/lib/core';

interface ChatListProps {
  chats: PickType<State, StateKeys.Chats>;
  chatId: PickType<State, StateKeys.ChatId>;
  selectChat: (chatId: number) => void;
}
class ChatList extends Block<ChatListProps> {
  static _name = 'ChatList';

  constructor(props: ChatListProps) {
    const selectChat = (chatId: number) => {
      Store.set(StateKeys.ChatId, chatId);
      ChatController.getChatTokenById(chatId);
    };
    super({ ...props, selectChat });
  }

  render() {
    return `    <div class="users-list-container">
                  {{#scroll-y-hidden}}
                    <ul class="users-list">
                      {{#each chats}}
                        {{{ChatListUser onClick=../selectChat id=id title=title avatar=avatar unread_count=unread_count last_message=last_message chatId=../ chatId}}}
                      {{/each}}
                    </ul>
                   {{/scroll-y-hidden}}
                </div>`;
  }
}

export default ChatList;
