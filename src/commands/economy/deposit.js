import { emoji as e } from "../../config/config.js";
import { send } from "../../utils/utils.js";
import { getUser, deposit } from "../../database/database.js";
import { formatCoins } from "./_utils.js";

export default {
  cmd: ["deposit", "dep"],
  desc: "Deposit coins to bank",

  run: async (sock, msg, args) => {
    const sender = msg.key.participant || msg.key.remoteJid;
    const user = getUser(sender);

    const amount =
      args[0]?.toLowerCase() === "all" ? user.balance : parseInt(args[0]);

    if (!amount || amount <= 0) {
      return send.text(
        sock,
        msg,
        `${e.cross} Provide amount! Example: !deposit 100 or !deposit all`,
      );
    }

    const result = deposit(sender, amount);

    if (!result.success) {
      return send.text(
        sock,
        msg,
        `${e.cross} Insufficient cash! You have ${formatCoins(user.balance)}`,
      );
    }

    await send.text(
      sock,
      msg,
      `
╭━━━ 🏦 *DEPOSIT* ━━━╮
┃
┃ ${e.check} Deposited: ${formatCoins(amount)}
┃
┃ ${e.star} Cash: ${formatCoins(result.balance)}
┃ ${e.bolt} Bank: ${formatCoins(result.bank)}
╰━━━━━━━━━━━━━━━━━━━╯`.trim(),
    );
  },
};
