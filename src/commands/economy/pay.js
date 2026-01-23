import { emoji as e } from "../../config.js";
import { send, getTarget, jid } from "../../utils.js";
import { getUser, transferCoins } from "../../database.js";
import { COOLDOWN } from "../../cooldown.js";
import { formatCoins, checkEconCooldown } from "./_utils.js";

export default {
  cmd: ["pay", "give", "transfer", "send"],
  desc: "Pay coins to another user",

  run: async (sock, msg, args) => {
    const sender = msg.key.participant || msg.key.remoteJid;

    // Check pay cooldown (10 seconds)
    if (!(await checkEconCooldown(sock, msg, "pay", COOLDOWN.PAY))) return;

    const target = getTarget(msg);
    if (!target) {
      return send.text(
        sock,
        msg,
        `${e.cross} Mention or reply to someone to pay them!`,
      );
    }

    if (target === sender) {
      return send.text(sock, msg, `${e.cross} You can't pay yourself!`);
    }

    const amount = parseInt(args[0]) || parseInt(args[1]);
    if (!amount || amount <= 0) {
      return send.text(
        sock,
        msg,
        `${e.cross} Provide a valid amount! Example: !pay @user 100`,
      );
    }

    const result = transferCoins(sender, target, amount);

    if (!result.success) {
      return send.text(
        sock,
        msg,
        `${e.cross} Insufficient coins! You have ${formatCoins(getUser(sender).balance)}`,
      );
    }

    const targetNum = jid.fromUser(target);

    await send.mention(
      sock,
      msg,
      `
╭━━━ ${e.ring} *PAYMENT* ━━━╮
┃
┃ ${e.check} Sent ${formatCoins(amount)}
┃ ${e.user} To: @${targetNum}
┃
┃ ${e.star} Your balance: ${formatCoins(result.fromBalance)}
╰━━━━━━━━━━━━━━━━━━━━━╯`.trim(),
      [target],
    );
  },
};
