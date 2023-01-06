interface State {
  appIsInited: boolean;
  isLoading: boolean;
  chats: ChatsListData[];
  user: Nullable<UserData>;
  chatId: Nullable<number>;
  chatToken: Nullable<string>;
}
