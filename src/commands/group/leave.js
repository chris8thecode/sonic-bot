import { emoji as e } from "../../config/config.js";
import { jid, send } from "../../utils/utils.js";

export default {
  cmd: ["leave", "bye"],
  desc: "Leave group",

  run: async (sock, msg) => {
    if (!jid.isGroup(msg.key.remoteJid)) {
      return send.text(sock, msg, `${e.cross} Group only!`);
    }

    await send.text(sock, msg, `${e.sonic} Goodbye! ${e.speed}`);
    await sock.groupLeave(msg.key.remoteJid);
  },
};
