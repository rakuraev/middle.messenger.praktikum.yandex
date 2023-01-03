export const state: State = {
  appIsInited: false,
  isLoading: false,
  chats: [],
  user: null,
};

export enum StateKeys {
  AppIsInited = 'appIsInited',
  IsLoading = 'isLoading',
  Chats = 'chats',
  User = 'user',
}
