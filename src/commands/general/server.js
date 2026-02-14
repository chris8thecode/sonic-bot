import { emoji as e } from "../../config/config.js";
import { format, send } from "../../utils/utils.js";
import os from "os";

export default {
  cmd: ["server", "stats", "status"],
  desc: "Server statistics",

  run: async (sock, msg) => {
    const [total, free] = [os.totalmem(), os.freemem()];

    await send.text(
      sock,
      msg,
      `
╭━━━ ${e.rocket} *SERVER* ━━━╮
┃ ${e.bolt} OS: ${os.platform()} ${os.arch()}
┃ ${e.info} Node: ${process.version}
┃ ${e.user} CPU: ${os.cpus().length} cores
┃ ${e.speed} RAM: ${format.bytes(total - free)} / ${format.bytes(total)}
┃ ${e.time} OS Up: ${format.uptime(os.uptime())}
╰━━━━━━━━━━━━━━━━━━━━━━╯`.trim(),
    );
  },
};
