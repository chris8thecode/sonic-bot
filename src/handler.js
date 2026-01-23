import { config } from "./config.js";
import { commands } from "./commands/index.js";
import { getText, send, jid } from "./utils.js";
import { checkGlobalCooldown, formatCooldown } from "./cooldown.js";
import { emoji as e } from "./config.js";

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

  const sender = jid.getSender(msg) || msg.key.participant || msg.key.remoteJid;

  const cooldown = checkGlobalCooldown(sender);

  if (!cooldown.allowed) {
    switch (cooldown.action) {
      case "warn":
        await send.text(
          sock,
          msg,
          `${e.time} Slow down! Wait *${formatCooldown(cooldown.remaining)}* before using another command.`,
        );
        return;

      case "react":
        await send.react(sock, msg, "⏳");
        return;

      case "ignore":
        return;
    }
  }

  // Uncomment for debugging
  // console.log(`📩 ${cmdName} | ${jid.fromUser(sender)}`)

  try {
    await cmd.run(sock, msg, args);
  } catch (err) {
    console.error(`Error [${cmdName}]:`, err.message);
    await send.text(sock, msg, `❌ Error: ${err.message}`);
  }
};
