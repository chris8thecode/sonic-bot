import { emoji as e } from "../../config/config.js";
import { send } from "../../utils/utils.js";

export default {
  cmd: ["join"],
  desc: "Join group via invite code",

  run: async (sonic, msg, args) => {
    if (!args[0])
      return send.text(sonic, msg, `${e.warn} Provide invite link!`);

    const code = args[0].replace("https://chat.whatsapp.com/", "");

    try {
      const groupJid = await sonic.groupAcceptInvite(code);
      await send.text(sonic, msg, `${e.check} Joined: ${groupJid}`);
    } catch {
      await send.text(sonic, msg, `${e.cross} Invalid or expired link.`);
    }
  },
};
