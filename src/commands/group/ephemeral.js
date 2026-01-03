import { emoji as e } from "../../config.js";
import { send } from "../../utils.js";
import { checkPerms } from "./_utils.js";

export default {
  cmd: ["ephemeral", "disappear", "disappearing"],
  desc: "Set disappearing messages (off/24h/7d/90d)",

  run: async (sock, msg, args) => {
    if (!(await checkPerms(sock, msg, { admin: true, botAdmin: true }))) return;

    const durations = { off: 0, "24h": 86400, "7d": 604800, "90d": 7776000 };
    const input = args[0]?.toLowerCase();

    if (input && !durations.hasOwnProperty(input)) {
      return send.text(sock, msg, `${e.warn} Use: off, 24h, 7d, or 90d`);
    }

    const duration = durations[input] ?? durations["7d"];

    try {
      await sock.groupToggleEphemeral(msg.key.remoteJid, duration);
      await send.text(sock, msg, `${e.check} Disappearing: ${input || "7d"}`);
    } catch {
      await send.text(sock, msg, `${e.cross} Failed.`);
    }
  },
};
