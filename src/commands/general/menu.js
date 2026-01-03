import { config, emoji as e } from "../../config.js";
import { format, send } from "../../utils.js";

const startTime = Date.now();

export default {
  cmd: ["menu", "help", "start", "commands"],
  desc: "Show bot menu",

  run: async (sock, msg) => {
    const { prefix: p, botName, version } = config;
    const uptime = format.uptime((Date.now() - startTime) / 1000);

    await send.text(
      sock,
      msg,
      `
╭━━━━━━━━━━━━━━━━━━━━━╮
┃  ${e.sonic} *${botName.toUpperCase()} BOT* ${e.speed}
┃━━━━━━━━━━━━━━━━━━━━━
┃ ${e.star} Version: ${version}
┃ ${e.time} Uptime: ${uptime}
┃ ${e.bolt} Prefix: ${p}
╰━━━━━━━━━━━━━━━━━━━━━╯

╭━━━ ${e.info} *GENERAL* ━━━╮
┃ ${p}menu - This menu
┃ ${p}ping - Bot latency
┃ ${p}speed - Speed test
┃ ${p}info - Bot info
┃ ${p}runtime - Uptime
┃ ${p}server - Server stats
┃ ${p}profile - User info
┃ ${p}owner - Bot owner
╰━━━━━━━━━━━━━━━━━━━━━╯

╭━━━ ${e.group} *GROUP* ━━━╮
┃ ${p}kick / ${p}add
┃ ${p}promote / ${p}demote
┃ ${p}mute / ${p}unmute
┃ ${p}lock / ${p}unlock
┃ ${p}ginfo / ${p}admins
┃ ${p}link / ${p}revoke
┃ ${p}tagall / ${p}setname
┃ ${p}setdesc / ${p}ephemeral
┃ ${p}join / ${p}leave
╰━━━━━━━━━━━━━━━━━━━━━╯

${e.rocket} *Gotta go fast!* ${e.sonic}`.trim()
    );
  },
};
