import { config, emoji as e } from "../../config.js";
import { format, send } from "../../utils.js";
import { state } from "../../state.js";

export default {
  cmd: ["info", "about", "botinfo"],
  desc: "Bot information",

  run: async (sock, msg) => {
    const uptime = format.uptime((Date.now() - state.startTime) / 1000);

    await send.text(
      sock,
      msg,
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
