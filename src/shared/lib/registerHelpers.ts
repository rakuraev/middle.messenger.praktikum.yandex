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

  Handlebars.registerHelper(
    'scroll-y-hidden',
    function (this: unknown, { data, fn }: HelperOptions) {
      let template = fn(this);
      const fragment = document.createElement('template');
      fragment.innerHTML = template;
      const el = document.createElement('div');
      el.style.cssText =
        'overflow:scroll; visibility:hidden; position:absolute;';
      document.body.appendChild(el);
      const width = el.offsetWidth - el.clientWidth;
      el.remove();
      const firstChild = fragment.content.firstElementChild;
      if (firstChild) {
        firstChild.setAttribute('style', `width:calc(100% + ${width}px)`);
        template = firstChild.outerHTML;
      }
      return template;
    }
  );
};
