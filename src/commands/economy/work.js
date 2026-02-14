import { emoji as e } from "../../config/config.js";
import { send } from "../../utils/utils.js";
import { addCoins } from "../../database/database.js";
import { COOLDOWN } from "../../utils/cooldown.js";
import {
  JOBS,
  random,
  randomFrom,
  formatCoins,
  checkEconCooldown,
} from "./_utils.js";

export default {
  cmd: ["work", "job"],
  desc: "Work a random job for coins",

  run: async (sock, msg) => {
    const sender = msg.key.participant || msg.key.remoteJid;

    if (!(await checkEconCooldown(sock, msg, "work", COOLDOWN.WORK))) return;

    const job = randomFrom(JOBS);
    const earned = random(job.min, job.max);
    const action = randomFrom(job.messages);

    const newBalance = addCoins(sender, earned);

    await send.text(
      sock,
      msg,
      `
╭━━━ ${job.emoji} *WORK* ━━━╮
┃ 
┃ You worked as a *${job.name}*
┃ and ${action}!
┃
┃ ${e.check} Earned: ${formatCoins(earned)}
┃ ${e.ring} Balance: ${formatCoins(newBalance)}
╰━━━━━━━━━━━━━━━━━━━╯`.trim(),
    );
  },
};
