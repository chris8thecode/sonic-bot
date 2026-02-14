import { emoji as e } from "../../config/config.js";
import { send } from "../../utils/utils.js";
import { checkPerms } from "./_utils.js";

export default {
  cmd: ["link", "glink", "getlink"],
  desc: "Get group invite link",

  run: async (sock, msg) => {
    if (!(await checkPerms(sock, msg, { admin: true, botAdmin: true }))) return;

    try {
      const code = await sock.groupInviteCode(msg.key.remoteJid);
      await send.text(
        sock,
        msg,
        `${e.ring} *Invite Link:*\nhttps://chat.whatsapp.com/${code}`,
      );
    } catch {
      await send.text(sock, msg, `${e.cross} Failed to get link.`);
    }
  },
};
