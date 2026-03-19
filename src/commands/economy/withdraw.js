import { emoji as e } from "../../config/config.js";
import { getUser, withdraw } from "../../database/database.js";
import { formatCoins } from "./_utils.js";
import { getSender } from "../../utils/utils.js";

export default {
  cmd: ["withdraw"],
  desc: "Withdraw coins from bank",

  run: async ({ text, msg }, args) => {
    const sender = getSender(msg);
    const user = getUser(sender);

    const amount =
      args[0]?.toLowerCase() === "all" ? user.bank : parseInt(args[0]);

    if (!amount || amount <= 0) {
      return text(
        `${e.cross} Provide amount! Example: !withdraw 100 or !withdraw all`,
      );
    }

    const result = withdraw(sender, amount);

    if (!result.success) {
      return text(
        `${e.cross} Insufficient bank balance! You have ${formatCoins(user.bank)}`,
      );
    }

    await text(
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
