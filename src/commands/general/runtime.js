import { emoji as e } from "../../config.js";
import { format, send } from "../../utils.js";

const startTime = Date.now();

export default {
  cmd: ["runtime", "uptime", "up"],
  desc: "Bot uptime",

  run: async (sock, msg) => {
    const uptime = format.uptime((Date.now() - startTime) / 1000);
    await send.text(sock, msg, `${e.time} *Uptime:* ${uptime}`);
  },
};
