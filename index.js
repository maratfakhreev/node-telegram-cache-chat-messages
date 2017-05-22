const isTextMessage = msg => !!msg.text;
const isBotCommand = msg => msg.entities && msg.entities[0].type === 'bot_command';

module.exports = class TelegramCacheChatMessage {
  constructor(options) {
    this.chats = [];
    this.bot = options.bot;
    this.all = options.all;

    this.bot.on('message', msg => this.cacheMessages(msg));
  }

  chatIndex(chatId) {
    const chat = this.chats.filter(chat => chat.chatId === chatId)[0];

    return this.chats.indexOf(chat);
  }

  clearChat(chatId) {
    const chatIndex = this.chatIndex(chatId);

    this.chats.splice(chatIndex, 1);
  }

  cacheMessages(msg) {
    if (isBotCommand(msg) || !isTextMessage(msg)) return;

    const chatId = msg.chat.id;
    const currentChatIndex = this.chatIndex(chatId);

    if (currentChatIndex > -1) {
      if (this.all) {
        this.chats[currentChatIndex].messages.push(msg);
      } else {
        this.chats[currentChatIndex].messages = [msg];
      }
    } else {
      this.chats.push({ chatId, messages: [msg] });
    }
  }

  messages(chatId) {
    const currentChatIndex = this.chatIndex(chatId);
    const currentChat = this.chats[currentChatIndex];

    if (currentChat) {
      const messages = currentChat.messages;

      this.clearChat(currentChat);

      return messages;
    }

    return [];
  }
};
