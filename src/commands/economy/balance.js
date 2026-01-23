import { emoji as e } from "../../config.js";
import { send, getTarget, jid } from "../../utils.js";
import { getUser } from "../../database.js";
import { formatCoins } from "./_utils.js";

export default {
  cmd: ["balance", "bal", "coins", "wallet", "money"],
  desc: "Check coin balance",

  run: async (sock, msg, args) => {
    const target = getTarget(msg) || msg.key.participant || msg.key.remoteJid;
    const user = getUser(target);
    const num = jid.fromUser(target);
    const isSelf = target === (msg.key.participant || msg.key.remoteJid);

    await send.text(
      sock,
      msg,
      `
╭━━━ ${e.ring} *WALLET* ━━━╮
┃ ${e.user} ${isSelf ? "Your" : `@${num}'s`} Balance
┃
┃ ${e.star} Cash: ${formatCoins(user.balance)}
┃ ${e.bolt} Bank: ${formatCoins(user.bank)}
┃ ${e.rocket} Total: ${formatCoins(user.balance + user.bank)}
╰━━━━━━━━━━━━━━━━━━━╯`.trim(),
      isSelf ? undefined : [target],
    );
  },
};
