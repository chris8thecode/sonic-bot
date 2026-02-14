import { emoji as e } from "../../config/config.js";
import { checkPerms, getParticipantDisplay } from "./_utils.js";

export default {
  cmd: ["tagall", "all", "everyone"],
  desc: "Tag all members",

  run: async (sock, msg, args) => {
    const meta = await checkPerms(sock, msg, { admin: true });
    if (!meta) return;

    const memberIds = meta.participants.map((p) => p.id);

    const mentions = meta.participants
      .map((p) => `@${getParticipantDisplay(p)}`)
      .join("\n");

    const text = args.length ? `${args.join(" ")}\n\n` : "";

    await sock.sendMessage(
      msg.key.remoteJid,
      {
        text: `${text}${e.sonic} *Tagging ${memberIds.length} members:*\n\n${mentions}`,
        mentions: memberIds,
      },
      { quoted: msg },
    );
  },
};
