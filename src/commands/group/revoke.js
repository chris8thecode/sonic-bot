import { emoji as e } from "../../config/config.js";
import { checkPerms } from "./_utils.js";

export default {
  cmd: ["revoke"],
  desc: "Reset group invite link",

  run: async ({ text, sonic, msg }) => {
    if (!(await checkPerms(sonic, msg, { admin: true, botAdmin: true })))
      return;

    try {
      const code = await sonic.groupRevokeInvite(msg.key.remoteJid);
      await text(
        `${e.check} Link revoked!\nNew: https://chat.whatsapp.com/${code}`,
      );
    } catch {
      await text(`${e.cross} Failed to revoke.`);
    }
  },
};
