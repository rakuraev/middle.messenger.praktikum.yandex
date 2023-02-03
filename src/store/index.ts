export const state: State = {
  appIsInited: false,
  isLoading: false,
  chats: [],
  user: null,
  chatId: null,
  chatToken: null,
};

export enum StateKeys {
  AppIsInited = 'appIsInited',
  IsLoading = 'isLoading',
  Chats = 'chats',
  User = 'user',
  ChatId = 'chatId',
  ChatToken = 'chatToken',
}
