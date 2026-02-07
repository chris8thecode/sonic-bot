<h1 align="center">Sonic</h1>

![Sonic-bot](https://files.catbox.moe/zbwngg.jpeg)

Sonic WhatsApp bot streamlines group management, enhances user engagement and delivers instant responses at lightning speed. This professional grade bot transforms WhatsApp into a powerful platform for community management and user interaction.

## Disclaimer

**IMPORTANT**: This bot is provided for educational and personal use purposes only. Please ensure you:

- **Use responsibly**: Do not spam, harass, or send unwanted messages to users
- **Respect privacy**: Handle user data with care and respect their privacy
- **No commercial use**: This bot is not intended for commercial purposes without proper authorization
- **Legal compliance**: Ensure your use complies with local laws and regulations

The developers are not responsible for any misuse of this bot or any consequences arising from its use. Users are solely responsible for their actions and must ensure they have proper consent before adding the bot to groups or sending messages.

> [!WARNING] 
> WhatsApp may suspend or ban accounts that violate their terms of service. Use this bot at your own risk.

## Features

### Technical Features

- **Lightning Fast** - Optimized for speed and performance
- **Modular Design** - Easy to extend with new commands
- **Permission System** - Admin-only commands with proper checks
- **Auto-Save Configuration** - Persistent settings
- **Emoji-Rich Interface** - Beautiful, colorful responses

## Quick Start

### Installation

1. **Clone or download the bot**

   ```bash
   cd sonic-bot
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Configure environment**

   ```bash
   # The bot will create a .env file automatically
   # Or create one manually with:
   touch .env
   ```

4. **Run the bot**

   ```bash
   npm start
   # or
   node src/index.js
   ```

5. **Connect WhatsApp**
   - The bot will prompt for your phone number
   - Enter your number with country code (e.g., 279678891)
   - Check your phone for the pairing code
   - Enter the pairing code when prompted

## Configuration

The bot uses a `.env` file for configuration. It will be created automatically, or you can create it manually:

```env
# Bot Configuration
PREFIX=!                    # Command prefix
OWNER_NUMBER=279678891   # Bot owner number not necessary to be filled will be auto filled once paired
BOT_NAME=Sonic             # Bot display name
```

### Configuration Options

| Variable       | Description                     | Default |
| -------------- | ------------------------------- | ------- |
| `PREFIX`       | Command prefix for bot commands | `!`     |
| `OWNER_NUMBER` | Bot owner WhatsApp number       | Empty   |
| `BOT_NAME`     | Bot display name                | `Sonic` |

## Development

### Adding New Commands

1. **Create a new command file** in the appropriate folder:

2. **Command structure**:

   ```javascript
   export default {
     cmd: ["command", "alias"], // Command names
     desc: "Command description", // Help text
     run: async (sock, msg, args) => {
       // Your command logic here
     },
   };
   ```

3. **Use utilities**:
   - `send.text()` - Send text messages
   - `send.mention()` - Send messages with mentions
   - `checkPerms()` - Check user permissions
   - `jid` helpers - Handle WhatsApp IDs

### Example Command

```javascript
import { emoji as e } from "../../config.js";
import { send } from "../../utils.js";

export default {
  cmd: ["hello", "hi"],
  desc: "Greet the bot",

  run: async (sock, msg) => {
    await send.text(sock, msg, `${e.sonic} Hello! I'm Sonic!`);
  },
};
```

## Security & Privacy

- **No Data Storage**: Messages are not stored permanently
- **Owner-Only Commands**: Sensitive commands restricted to bot owner
- **Permission Checks**: Proper permission validation for group commands

> [!IMPORTANT]
>
> 1. **Phone Number**: Use your personal for fun WhatsApp number (not business)
> 2. **Internet Connection**: Stable internet required
> 3. **Session Persistence**: Auth session saved in `auth_session/` folder
> 4. **Rate Limiting**: WhatsApp may rate-limit if commands are spammed
> 5. **Privacy**: Bot respects WhatsApp's privacy settings

## Troubleshooting

### Common Issues

**Bot doesn't respond**

- Check if bot is connected (`!ping` command)
- Verify prefix is correct
- Ensure bot is in the group (for group commands)

**Authentication fails**

- Delete `auth_session/` folder
- Restart bot and re-authenticate
- Check phone number format (include country code)

**Commands not working**

- Verify bot has necessary permissions
- Check group admin status for admin commands
- Ensure proper command syntax

**Performance issues**

- Check system resources
- Restart bot if running for extended periods
- Monitor internet connection stability

## Contributing

1. Fork the repository
2. Create a feature branch
3. Add your command or improvement
4. Test thoroughly
5. Submit a pull request

### Development Guidelines

- Follow existing code style
- Add proper error handling
- Include command descriptions
- Test with various scenarios

## Support

For issues, questions, or contributions:

- Create an issue in the repository
- Check existing documentation
- Review code examples

---

**Made with ❤️ and lots of ⚡ by Xodobyte**

_Gotta go fast!_ 🦔💨
