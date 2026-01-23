import { emoji as e } from "../../config.js";
import { send } from "../../utils.js";
import { getUser, addCoins, updateUser } from "../../database.js";
import { COOLDOWN } from "../../cooldown.js";
import { random, formatCoins, checkEconCooldown } from "./_utils.js";

export default {
  cmd: ["daily", "claim"],
  desc: "Claim daily reward",

  run: async (sock, msg) => {
    const sender = msg.key.participant || msg.key.remoteJid;

    // Check daily cooldown (24 hours)
    if (!(await checkEconCooldown(sock, msg, "daily", COOLDOWN.DAILY))) return;

    const base = 100;
    const bonus = random(0, 100);
    const total = base + bonus;

    const newBalance = addCoins(sender, total);

    await send.text(
      sock,
      msg,
      `
╭━━━ ${e.star} *DAILY REWARD* ━━━╮
┃
┃ ${e.check} Base: ${formatCoins(base)}
┃ ${e.bolt} Bonus: ${formatCoins(bonus)}
┃ ${e.rocket} Total: ${formatCoins(total)}
┃
┃ ${e.ring} Balance: ${formatCoins(newBalance)}
┃
┃ Come back tomorrow! ${e.sonic}
╰━━━━━━━━━━━━━━━━━━━━━━━━╯`.trim(),
    );
  },
};
