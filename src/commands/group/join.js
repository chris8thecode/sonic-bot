import { emoji as e } from "../../config/config.js";

export default {
  cmd: ["join"],
  desc: "Join group via invite code",

  run: async ({ text, sonic }, args) => {
    if (!args[0]) return text(`${e.warn} Provide invite link!`);

    const code = args[0].replace("https://chat.whatsapp.com/", "");

    try {
      const groupJid = await sonic.groupAcceptInvite(code);
      await text(`${e.check} Joined: ${groupJid}`);
    } catch {
      await text(`${e.cross} Invalid or expired link.`);
    }
  },
};
