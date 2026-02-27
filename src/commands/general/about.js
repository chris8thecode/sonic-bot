import { config, emoji as e } from "../../config/config.js";
import { send } from "../../utils/utils.js";

export default {
  cmd: ["about"],
  desc: "About this bot",

  run: async (sonic, msg) => {
    await send.text(
      sonic,
      msg,
      `
╭━━━ ${e.sonic} *ABOUT ${config.botName.toUpperCase()}* ━━━╮
┃ ${e.star} Name: ${config.botName}
┃ ${e.rocket} Version: ${config.version}
┃ ${e.info} A WhatsApp bot with economic features
┃ ${e.bolt} Fast, reliable & feature-rich
┃ ${e.crown} Owner: @${config.ownerNumber}
╰━━━━━━━━━━━━━━━━━━━━━━━━━━━╯`.trim(),
    );
  },
};
