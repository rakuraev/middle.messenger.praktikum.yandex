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
import { DeleteUserModalWindow } from './DeletUserModalWindow';

registerComponent(ChatList);
registerComponent(ChatListUser);
registerComponent(Chat);
registerComponent(ChatMessages);
registerComponent(ChatInput);
registerComponent(Contol);
registerComponent(AddUserModalWindow);
registerComponent(DeleteUserModalWindow);
registerComponent(AddFile);
registerComponent(ChatMessage);
registerComponent(ChatImage);

export { AddUserModalWindow, DeleteUserModalWindow };
