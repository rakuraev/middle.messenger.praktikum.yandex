import { BaseApi } from 'shared/lib/core';

class ChatApi extends BaseApi {
  constructor() {
    super('/chats');
  }

  getChats() {
    return this.http.get<ChatsListData[]>('');
  }

  createChat(data: CreateChatData) {
    return this.http.post('', data);
  }

  deleteChatById(data: DeleteChatData) {
    return this.http.delete('', data);
  }

  getChatTokenById(id: number) {
    return this.http.post<IChatTokenById>(`/token/${id}`);
  }

  addUsersToChat(users: number[], chatId: number) {
    const data = { users, chatId };
    return this.http.put('/users', data);
  }

  deleteUsersToChat(users: number[], chatId: number) {
    const data = { users, chatId };
    return this.http.delete('/users', data);
  }
}

export default new ChatApi();
