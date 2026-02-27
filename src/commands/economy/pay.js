import { emoji as e } from "../../config/config.js";
import { send, getTarget, jid } from "../../utils/utils.js";
import { getUser, transferCoins } from "../../database/database.js";
import { COOLDOWN } from "../../utils/cooldown.js";
import { formatCoins, checkEconCooldown } from "./_utils.js";

export default {
  cmd: ["pay", "give", "transfer", "send"],
  desc: "Pay coins to another user",

  run: async (sonic, msg, args) => {
    const sender = msg.key.participant || msg.key.remoteJid;

    if (!(await checkEconCooldown(sonic, msg, "pay", COOLDOWN.PAY))) return;

    const target = getTarget(msg);
    if (!target) {
      return send.text(
        sonic,
        msg,
        `${e.cross} Mention or reply to someone to pay them!`,
      );
    }

    if (target === sender) {
      return send.text(sonic, msg, `${e.cross} You can't pay yourself!`);
    }

    const amount = parseInt(args[0]) || parseInt(args[1]);
    if (!amount || amount <= 0) {
      return send.text(
        sonic,
        msg,
        `${e.cross} Provide a valid amount! Example: !pay @user 100`,
      );
    }

    const result = transferCoins(sender, target, amount);

    if (!result.success) {
      return send.text(
        sonic,
        msg,
        `${e.cross} Insufficient coins! You have ${formatCoins(getUser(sender).balance)}`,
      );
    }

    const targetNum = jid.fromUser(target);

    await send.mention(
      sonic,
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
