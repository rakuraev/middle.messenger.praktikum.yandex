import { BaseApi } from 'shared/lib/core';

class ChatApi extends BaseApi {
  constructor() {
    super('/chats');
  }

  getChats(): Promise<ChatsListData[]> {
    return this.http.get('');
  }

  createChat(data: CreateChatData) {
    return this.http.post('', data);
  }

  deleteChatById(data: DeleteChatData) {
    return this.http.delete('', data);
  }

  getChatTokenById(id: number): Promise<IChatTokenById> {
    return this.http.post(`/token/${id}`);
  }

  addUsersToChat(users: number[], chatId: number): Promise<void> {
    const data = { users, chatId };
    return this.http.put('/users', data);
  }

  deleteUsersToChat(users: number[], chatId: number): Promise<void> {
    const data = { users, chatId };
    return this.http.delete('/users', data);
  }
}

export default new ChatApi();
