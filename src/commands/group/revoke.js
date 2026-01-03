import { emoji as e } from "../../config.js";
import { send } from "../../utils.js";
import { checkPerms } from "./_utils.js";

export default {
  cmd: ["revoke", "resetlink"],
  desc: "Reset group invite link",

  run: async (sock, msg) => {
    if (!(await checkPerms(sock, msg, { admin: true, botAdmin: true }))) return;

    try {
      const code = await sock.groupRevokeInvite(msg.key.remoteJid);
      await send.text(
        sock,
        msg,
        `${e.check} Link revoked!\nNew: https://chat.whatsapp.com/${code}`
      );
    } catch {
      await send.text(sock, msg, `${e.cross} Failed to revoke.`);
    }
  },
};
