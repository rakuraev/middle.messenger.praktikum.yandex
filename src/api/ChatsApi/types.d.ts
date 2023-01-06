interface ChatsListData {
  id: number;
  title: string;
  avatar: string;
  unread_count: number;
  last_message: {
    user: ChatsListUserData;
    time: string;
    content: string;
  };
}

interface ChatsListUserData extends UserData {
  phone: string;
}

interface CreateChatData {
  title: string;
}

interface DeleteChatData {
  chatId: number;
}

interface IChatTokenById {
  token: string;
}
