import Handlebars, { HelperOptions } from 'handlebars';
import { getFormatHourAndMinutes } from 'shared/lib/date';

export default () => {
  Handlebars.registerHelper(
    'unreaded-messages',
    function (this: unknown, { data, fn }: HelperOptions) {
      const unreadedMessagesCount = (data.root as ChatsListData).unread_count;

      if (unreadedMessagesCount > 0) {
        return fn(this);
      }
    }
  );
  Handlebars.registerHelper(
    'last-messages-time',
    function (this: unknown, { data, fn }: HelperOptions) {
      const lastMessageTime = (data.root as ChatsListData).last_message?.time;
      if (lastMessageTime) {
        const formatedLastMessagesTime = getFormatHourAndMinutes(
          new Date(lastMessageTime)
        );
        return fn(formatedLastMessagesTime);
      } else {
        return fn('');
      }
    }
  );
  Handlebars.registerHelper(
    'last-messages-content',
    function (this: unknown, { data, fn }: HelperOptions) {
      const lastMessageContent = (data.root as ChatsListData).last_message
        ?.content;

      return fn(lastMessageContent || 'Пока нет сообщений');
    }
  );
};
