import registerComponent from '../../../core/registerComponents';
import Chat from './Chat/chat';
import ChatInput from './ChatInput/chatInput';
import ChatsList from './ChatList/chatList';
import ChatMessages from './ChatMessages/chatMessages';
import ChatListUser from './ChatWithUser/chatListUser';

registerComponent(ChatsList);
registerComponent(ChatListUser);
registerComponent(Chat);
registerComponent(ChatMessages);
registerComponent(ChatInput);
