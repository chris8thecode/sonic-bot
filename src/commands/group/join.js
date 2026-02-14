import { emoji as e } from "../../config/config.js";
import { send } from "../../utils/utils.js";

export default {
  cmd: ["join"],
  desc: "Join group via invite code",

  run: async (sock, msg, args) => {
    if (!args[0]) return send.text(sock, msg, `${e.warn} Provide invite link!`);

    const code = args[0].replace("https://chat.whatsapp.com/", "");

    try {
      const groupJid = await sock.groupAcceptInvite(code);
      await send.text(sock, msg, `${e.check} Joined: ${groupJid}`);
    } catch {
      await send.text(sock, msg, `${e.cross} Invalid or expired link.`);
    }
  },
};
