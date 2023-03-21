import { ChatApi } from 'entities/Chat';
import { StateKeys } from 'shared/config';
import { Store } from 'shared/lib/core';

class ChatsController {
  api = ChatApi;

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

  async addUsersToChat(users: number[], chatId: number) {
    try {
      await this.api.addUsersToChat(users, chatId);
    } catch (error) {
      console.error('Error on add users to chat');
      if ((error as XMLHttpRequest)?.response?.reason) {
        throw (error as XMLHttpRequest).response.reason;
      }
    }
  }

  async deleteUsersFromChat(users: number[], chatId: number) {
    try {
      await this.api.deleteUsersToChat(users, chatId);
    } catch (error) {
      console.error('Error on delete users to chat');
      if ((error as XMLHttpRequest)?.response?.reason) {
        throw (error as XMLHttpRequest).response.reason;
      }
    }
  }

  async createChat(title: string) {
    try {
      await this.api.createChat({ title });
      await this.getChatsList();
    } catch (error) {
      console.error('Error on delete users to chat');
      if ((error as XMLHttpRequest)?.response?.reason) {
        throw (error as XMLHttpRequest).response.reason;
      }
    }
  }

  async deleteChat(chatId: number) {
    try {
      await this.api.deleteChatById({ chatId });
      await this.getChatsList();
    } catch (error) {
      console.error('Error on delete users to chat');
      if ((error as XMLHttpRequest)?.response?.reason) {
        throw (error as XMLHttpRequest).response.reason;
      }
    }
  }
}

export default new ChatsController();
