import registerComponent from 'shared/lib/registerComponents';
import { AddFile } from './AddFile';
import { AddUserModalWindow } from './AddUserModalWindow';
import { Chat } from './Chat';
import { ChatImage } from './ChatImage';
import { ChatInput } from './ChatInput';
import { ChatList } from './ChatList';
import { ChatMessage } from './ChatMessage';
import { ChatMessages } from './ChatMessages';
import { ChatListUser } from './ChatWithUser';
import { Contol } from './Control';
import { CreateChat } from './CreateChat';
import { DeleteChatModalWindow } from './DeleteChatModalWindow';

registerComponent(ChatList);
registerComponent(ChatListUser);
registerComponent(Chat);
registerComponent(ChatMessages);
registerComponent(ChatInput);
registerComponent(Contol);
registerComponent(AddUserModalWindow);
registerComponent(DeleteChatModalWindow);
registerComponent(AddFile);
registerComponent(ChatImage);
registerComponent(CreateChat);

export {
  AddUserModalWindow,
  DeleteChatModalWindow as DeleteUserModalWindow,
  ChatMessage,
  CreateChat,
};
