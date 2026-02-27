import { emoji as e } from "../../config/config.js";
import { send } from "../../utils/utils.js";
import { checkPerms } from "./_utils.js";

export default {
  cmd: ["revoke", "resetlink"],
  desc: "Reset group invite link",

  run: async (sonic, msg) => {
    if (!(await checkPerms(sonic, msg, { admin: true, botAdmin: true })))
      return;

    try {
      const code = await sonic.groupRevokeInvite(msg.key.remoteJid);
      await send.text(
        sonic,
        msg,
        `${e.check} Link revoked!\nNew: https://chat.whatsapp.com/${code}`,
      );
    } catch {
      await send.text(sonic, msg, `${e.cross} Failed to revoke.`);
    }
  },
};
