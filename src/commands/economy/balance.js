import { emoji as e } from "../../config/config.js";
import { getTarget, jid } from "../../utils/utils.js";
import { getUser } from "../../database/database.js";
import { formatCoins } from "./_utils.js";

export default {
  cmd: ["balance"],
  desc: "Check coin balance",

  run: async ({ text, mention, msg }) => {
    const target = getTarget(msg) || msg.key.participant || msg.key.remoteJid;
    const user = getUser(target);
    const num = jid.fromUser(target);
    const isSelf = target === (msg.key.participant || msg.key.remoteJid);

    if (isSelf) {
      await text(
        `
╭━━━ ${e.ring} *WALLET* ━━━╮
┃ ${e.user} Your Balance
┃
┃ ${e.star} Cash: ${formatCoins(user.balance)}
┃ ${e.bolt} Bank: ${formatCoins(user.bank)}
┃ ${e.rocket} Total: ${formatCoins(user.balance + user.bank)}
╰━━━━━━━━━━━━━━━━━━━╯`.trim(),
      );
    } else {
      await mention(
        `
╭━━━ ${e.ring} *WALLET* ━━━╮
┃ ${e.user} @${num}'s Balance
┃
┃ ${e.star} Cash: ${formatCoins(user.balance)}
┃ ${e.bolt} Bank: ${formatCoins(user.bank)}
┃ ${e.rocket} Total: ${formatCoins(user.balance + user.bank)}
╰━━━━━━━━━━━━━━━━━━━╯`.trim(),
        [target],
      );
    }
  },
};
