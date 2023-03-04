import Handlebars, { HelperOptions } from 'handlebars';

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
};
