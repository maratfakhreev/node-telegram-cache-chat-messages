## Node-telegram-cache-chat-messages

[![Build Status](https://travis-ci.org/maratfakhreev/node-telegram-cache-chat-messages.svg?branch=master)](https://travis-ci.org/maratfakhreev/node-telegram-cache-chat-messages)

Node module which helps your bot to cache text messages in Telegram chat

### Install:

```bash
npm install node-telegram-cache-chat-messages
```

### Use:

Node-telegram-cache-chat-messages initially works with [node-telegram-bot-api](https://github.com/yagop/node-telegram-bot-api).

```javascript
const TelegramBot = require('node-telegram-bot-api');
const TelegramCacheChatMessages = require('node-telegram-cache-chat-messages');

const bot = new TelegramBot(BOT_TOKEN);
const casheMessages = new TelegramCacheChatMessages({ bot, all: true });

bot.onText(/command/, msg => {
  const chatId = msg.chat.id;
  const messages = casheMessages.messages(chatId);
  // do something with messages. For example resend last message:
  const lastMessage = messages[messages.length - 1];

  bot.sendMessage(chatId, lastMessage);
});
```

### Options:

```javascript
new TelegramCacheChatMessages({
  bot: <you bot instance> // previously created bot via node-telegram-bot-api
  all: <boolean> //[default: false] false means that you cache only last message, true is that you cache all messages
});
```

### Note:

* After using your commands cached `messages` will be cleared. This is done to avoid serious memory overflow
* Node-telegram-cache-chat-messages doesn't process messages with non text content
* Node-telegram-cache-chat-messages doesn't cache other bots messages
