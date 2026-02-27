import { emoji as e } from "../../config/config.js";
import { format, send } from "../../utils/utils.js";
import { state } from "../../core/state.js";

export default {
  cmd: ["runtime", "uptime", "up"],
  desc: "Bot uptime",

  run: async (sonic, msg) => {
    const uptime = format.uptime((Date.now() - state.startTime) / 1000);
    await send.text(sonic, msg, `${e.time} *Uptime:* ${uptime}`);
  },
};
