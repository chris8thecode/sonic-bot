import { emoji as e } from "../../config.js";
import { send } from "../../utils.js";
import { getUser, addCoins, removeCoins } from "../../database.js";
import { random, formatCoins, checkEconCooldown } from "./_utils.js";
import { COOLDOWN } from "../../cooldown.js";

export default {
  cmd: ["gamble", "bet", "slot"],
  desc: "Gamble your coins (50/50)",

  run: async (sock, msg, args) => {
    const sender = msg.key.participant || msg.key.remoteJid;

    // 10 second cooldown
    if (!(await checkEconCooldown(sock, msg, "gamble", 10000))) return;

    const user = getUser(sender);
    const bet =
      args[0]?.toLowerCase() === "all" ? user.balance : parseInt(args[0]);

    if (!bet || bet <= 0) {
      return send.text(
        sock,
        msg,
        `${e.cross} Provide a valid bet! Example: !gamble 100`,
      );
    }

    if (bet > user.balance) {
      return send.text(
        sock,
        msg,
        `${e.cross} You only have ${formatCoins(user.balance)}!`,
      );
    }

    const slots = ["🍎", "🍊", "🍋", "🍇", "🍒", "💎", "7️⃣"];
    const result = [
      slots[random(0, slots.length - 1)],
      slots[random(0, slots.length - 1)],
      slots[random(0, slots.length - 1)],
    ];

    const isJackpot = result[0] === result[1] && result[1] === result[2];
    const isDouble =
      result[0] === result[1] ||
      result[1] === result[2] ||
      result[0] === result[2];

    let winnings = 0;
    let status = "";

    if (isJackpot) {
      winnings = bet * 5;
      status = `${e.rocket} JACKPOT! x5`;
    } else if (isDouble) {
      winnings = bet * 2;
      status = `${e.star} Double! x2`;
    } else {
      winnings = -bet;
      status = `${e.cross} Lost!`;
    }

    const newBalance =
      winnings > 0
        ? addCoins(sender, winnings)
        : (removeCoins(sender, bet), getUser(sender).balance);

    await send.text(
      sock,
      msg,
      `
╭━━━ 🎰 *SLOTS* ━━━╮
┃
┃ [ ${result.join(" | ")} ]
┃
┃ ${status}
┃ ${winnings > 0 ? `Won: ${formatCoins(winnings)}` : `Lost: ${formatCoins(bet)}`}
┃ ${e.ring} Balance: ${formatCoins(newBalance)}
╰━━━━━━━━━━━━━━━━━━━╯`.trim(),
    );
  },
};
