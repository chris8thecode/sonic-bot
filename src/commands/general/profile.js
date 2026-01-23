import { emoji as e } from "../../config.js";
import { jid, send, getTarget, isOwner } from "../../utils.js";

export default {
  cmd: ["profile", "whois", "check"],
  desc: "User profile",

  run: async (sock, msg) => {
    const target = getTarget(msg) || msg.key.participant || msg.key.remoteJid;
    const num = jid.fromUser(target);

    let pp;
    try {
      pp = await sock.profilePictureUrl(target, "image");
    } catch {}

    const text = `
╭━━━ ${e.user} *PROFILE* ━━━╮
┃ ${e.star} Number: +${num}
┃ ${e.admin} Owner: ${isOwner(target) ? "Yes ✓" : "No"}
╰━━━━━━━━━━━━━━━━━━━╯`.trim();

    await sock.sendMessage(
      msg.key.remoteJid,
      pp
        ? { image: { url: pp }, caption: text, mentions: [target] }
        : { text, mentions: [target] },
      { quoted: msg },
    );
  },
};
