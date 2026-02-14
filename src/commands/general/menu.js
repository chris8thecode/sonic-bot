import { config, emoji as e } from "../../config/config.js";
import { format, send } from "../../utils/utils.js";
import { state } from "../../core/state.js";

export default {
  cmd: ["menu", "help", "start", "commands"],
  desc: "Show bot menu",

  run: async (sock, msg) => {
    const { prefix: p, botName, version } = config;
    const uptime = format.uptime((Date.now() - state.startTime) / 1000);

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

╭━━━ ${e.ring} *ECONOMY* ━━━╮
┃ ${p}balance - Check coins
┃ ${p}daily - Daily reward
┃ ${p}work - Work for coins
┃ ${p}beg - Beg for coins
┃ ${p}pay - Pay someone
┃ ${p}gamble - Slot machine
┃ ${p}deposit - To bank
┃ ${p}withdraw - From bank
┃ ${p}inventory - Your items
┃ ${p}leaderboard - Top rich
┃ ${p}economy - Stats
╰━━━━━━━━━━━━━━━━━━━━━╯

╭━━━ ${e.group} *GROUP* ━━━╮
┃ ${p}kick / ${p}add
┃ ${p}promote / ${p}demote
┃ ${p}mute / ${p}unmute
┃ ${p}ginfo / ${p}admins
┃ ${p}link / ${p}revoke
┃ ${p}tagall / ${p}leave
┃ ${p}lock / ${p}unlock
┃ ${p}setname / ${p}setdesc
┃ ${p}ephemeral / ${p}join
╰━━━━━━━━━━━━━━━━━━━━━╯

${e.rocket} *Gotta go fast!* ${e.sonic}`.trim(),
    );
  },
};
