import { emoji as e } from "../../config/config.js";
import { format } from "../../utils/utils.js";
import { state } from "../../core/state.js";

export default {
  cmd: ["runtime"],
  desc: "Bot uptime",

  run: async ({ text }) => {
    const uptime = format.uptime((Date.now() - state.startTime) / 1000);
    await text(`${e.time} *Uptime:* ${uptime}`);
  },
};
