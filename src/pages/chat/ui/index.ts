import registerComponent from 'shared/lib/registerComponents';
import { Chat } from './Chat';
import { ChatInput } from './ChatInput';
import { ChatList } from './ChatList';
import { ChatMessages } from './ChatMessages';
import { ChatListUser } from './ChatWithUser';

registerComponent(ChatList);
registerComponent(ChatListUser);
registerComponent(Chat);
registerComponent(ChatMessages);
registerComponent(ChatInput);
