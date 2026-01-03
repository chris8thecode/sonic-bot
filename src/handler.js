import { config } from "./config.js";
import { commands } from "./commands/index.js";
import { getText, send, jid } from "./utils.js";

export const handleMessage = async (sock, msg) => {
  if (!msg.message || msg.key.remoteJid === "status@broadcast") return;

  const botNumber = jid.fromUser(sock.user?.id);
  const chatNumber = jid.fromUser(msg.key.remoteJid);
  const isSelfChat = botNumber === chatNumber;

  if (msg.key.fromMe && !isSelfChat) return;

  const text = getText(msg);
  if (!text.startsWith(config.prefix)) return;

  const [cmdName, ...args] = text
    .slice(config.prefix.length)
    .trim()
    .split(/\s+/);
  const cmd = commands.get(cmdName?.toLowerCase());

  if (!cmd) return;

  // Uncomment for debugging only
  // console.log(
  //   `📩 ${cmdName} | ${
  //     (msg.key.participant || msg.key.remoteJid).split("@")[0]
  //   }`
  // );

  try {
    await cmd.run(sock, msg, args);
  } catch (err) {
    console.error(`Error [${cmdName}]:`, err.message);
    await send.text(sock, msg, `❌ Error: ${err.message}`);
  }
};
