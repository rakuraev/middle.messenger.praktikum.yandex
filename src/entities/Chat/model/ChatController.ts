import { ChatApi } from 'entities/Chat';
import { StateKeys } from 'shared/config';
import { Store } from 'shared/lib/core';

class ChatsController {
  api = ChatApi;

  async getChatsList() {
    try {
      const data = await this.api.getChats();
      // const data: [] = [];
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

  async addUsersToChat(users: number[], chatId: number) {
    try {
      await this.api.addUsersToChat(users, chatId);
    } catch (error) {
      console.log('Error on add users to chat');
      if ((error as XMLHttpRequest)?.response?.reason) {
        throw (error as XMLHttpRequest).response.reason;
      }
    }
  }

  async deleteUsersFromChat(users: number[], chatId: number) {
    try {
      await this.api.deleteUsersToChat(users, chatId);
    } catch (error) {
      console.log('Error on delete users to chat');
      if ((error as XMLHttpRequest)?.response?.reason) {
        throw (error as XMLHttpRequest).response.reason;
      }
    }
  }
}

export default new ChatsController();
