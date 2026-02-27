import { emoji as e } from "../../config/config.js";
import { send } from "../../utils/utils.js";
import { checkPerms } from "./_utils.js";

export default {
  cmd: ["ephemeral", "disappear", "disappearing"],
  desc: "Set disappearing messages (off/24h/7d/90d)",

  run: async (sonic, msg, args) => {
    if (!(await checkPerms(sonic, msg, { admin: true, botAdmin: true })))
      return;

    const durations = { off: 0, "24h": 86400, "7d": 604800, "90d": 7776000 };
    const input = args[0]?.toLowerCase();

    if (input && !durations.hasOwnProperty(input)) {
      return send.text(sonic, msg, `${e.warn} Use: off, 24h, 7d, or 90d`);
    }

    const duration = durations[input] ?? durations["7d"];

    try {
      await sonic.groupToggleEphemeral(msg.key.remoteJid, duration);
      await send.text(sonic, msg, `${e.check} Disappearing: ${input || "7d"}`);
    } catch {
      await send.text(sonic, msg, `${e.cross} Failed.`);
    }
  },
};
