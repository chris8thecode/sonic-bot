import { config, emoji as e } from "../../config/config.js";
import { format } from "../../utils/utils.js";
import { state } from "../../core/state.js";

export default {
  cmd: ["info"],
  desc: "Bot information",

  run: async ({ text }) => {
    const uptime = format.uptime((Date.now() - state.startTime) / 1000);

    await text(
      `
╭━━━ ${e.sonic} *${config.botName.toUpperCase()}* ━━━╮
┃ ${e.star} Version: ${config.version}
┃ ${e.time} Uptime: ${uptime}
┃ ${e.bolt} Prefix: ${config.prefix}
┃ ${e.info} The fastest bot!
╰━━━━━━━━━━━━━━━━━━━━━━╯`.trim(),
    );
  },
};
