interface ChatListProps {
  chats: PickType<State, StateKeys.Chats>;
  selectChat: (chatId: number) => void;
}
