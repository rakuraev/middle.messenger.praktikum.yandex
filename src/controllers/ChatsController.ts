import ChatsApi from '../api/ChatsApi/ChatsApi';
import Store from '../core/Store';
import { StateKeys } from '../store';

class ChatsController {
  api = ChatsApi;

  async getChatsList() {
    try {
      const data = await this.api.getChats();
      Store.set(StateKeys.Chats, data);
    } catch (e) {
      console.error('Error on fetch Chats');
      throw e;
    }
  }

  async getChatTokenById(chatId: number) {
    try {
      Store.set(StateKeys.ChatToken, null);
      const data = await this.api.getChatTokenById(chatId);
      Store.set(StateKeys.ChatToken, data.token);
    } catch (e) {
      console.error('Error on get chat token');
      throw e;
    }
  }
}

export default new ChatsController();
