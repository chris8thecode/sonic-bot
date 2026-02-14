import { emoji as e } from "../../config/config.js";
import { send } from "../../utils/utils.js";
import { getLeaderboard } from "../../database/database.js";
import { formatCoins } from "./_utils.js";

export default {
  cmd: ["leaderboard", "lb", "top", "rich"],
  desc: "View richest users",

  run: async (sock, msg) => {
    const top = getLeaderboard(10);

    if (!top.length) {
      return send.text(sock, msg, `${e.cross} No one has any coins yet!`);
    }

    const medals = ["🥇", "🥈", "🥉"];
    const list = top
      .map((user, i) => {
        const medal = medals[i] || `${i + 1}.`;
        const total = user.balance + user.bank;
        return `┃ ${medal} @${user.id}: ${formatCoins(total)}`;
      })
      .join("\n");

    const mentions = top.map((user) =>
      user.id.includes("@") ? user.id : user.id + "@s.whatsapp.net",
    );

    await send.mention(
      sock,
      msg,
      `
╭━━━ ${e.rocket} *LEADERBOARD* ━━━╮
┃
${list}
┃
╰━━━━━━━━━━━━━━━━━━━━━━━━╯`.trim(),
      mentions,
    );
  },
};
