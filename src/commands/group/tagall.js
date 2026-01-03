import { emoji as e } from "../../config.js";
import { jid } from "../../utils.js";
import { checkPerms } from "./_utils.js";

export default {
  cmd: ["tagall", "all", "everyone"],
  desc: "Tag all members",

  run: async (sock, msg, args) => {
    const meta = await checkPerms(sock, msg, { admin: true });
    if (!meta) return;

    const members = meta.participants.map((p) => p.id);
    const text = args.length ? `${args.join(" ")}\n\n` : "";
    const mentions = members.map((m) => `@${jid.fromUser(m)}`).join("\n");

    await sock.sendMessage(
      msg.key.remoteJid,
      {
        text: `${text}${e.sonic} *Tagging ${members.length} members:*\n\n${mentions}`,
        mentions: members,
      },
      { quoted: msg }
    );
  },
};
