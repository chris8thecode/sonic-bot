import { emoji as e } from "../../config/config.js";
import { getLeaderboard } from "../../database/database.js";
import { formatCoins } from "./_utils.js";

export default {
  cmd: ["leaderboard", "lb"],
  desc: "View richest users",

  run: async ({ text, mention }) => {
    const top = getLeaderboard(10);

    if (!top.length) {
      return text(`${e.cross} No one has any coins yet!`);
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

    await mention(
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
