import { emoji as e } from "../../config/config.js";
import { send } from "../../utils/utils.js";
import { getUser, withdraw } from "../../database/database.js";
import { formatCoins } from "./_utils.js";

export default {
  cmd: ["withdraw", "wd"],
  desc: "Withdraw coins from bank",

  run: async (sonic, msg, args) => {
    const sender = msg.key.participant || msg.key.remoteJid;
    const user = getUser(sender);

    const amount =
      args[0]?.toLowerCase() === "all" ? user.bank : parseInt(args[0]);

    if (!amount || amount <= 0) {
      return send.text(
        sonic,
        msg,
        `${e.cross} Provide amount! Example: !withdraw 100 or !withdraw all`,
      );
    }

    const result = withdraw(sender, amount);

    if (!result.success) {
      return send.text(
        sonic,
        msg,
        `${e.cross} Insufficient bank balance! You have ${formatCoins(user.bank)}`,
      );
    }

    await send.text(
      sonic,
      msg,
      `
╭━━━ 🏦 *WITHDRAWAL* ━━━╮
┃
┃ ${e.check} Withdrew: ${formatCoins(amount)}
┃
┃ ${e.star} Cash: ${formatCoins(result.balance)}
┃ ${e.bolt} Bank: ${formatCoins(result.bank)}
╰━━━━━━━━━━━━━━━━━━━╯`.trim(),
    );
  },
};
