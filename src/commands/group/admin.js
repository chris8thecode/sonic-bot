import { emoji as e } from "../../config.js";
import { jid } from "../../utils.js";
import { checkPerms } from "./_utils.js";

export default {
  cmd: ["admins", "listadmin", "adminlist"],
  desc: "List group admins",

  run: async (sock, msg) => {
    const meta = await checkPerms(sock, msg);
    if (!meta) return;

    const adminList = meta.participants.filter((p) => p.admin);
    const text = adminList
      .map((a) => {
        const icon = a.admin === "superadmin" ? "👑" : "⭐";
        return `${icon} @${jid.fromUser(a.id)}`;
      })
      .join("\n");

    await sock.sendMessage(
      msg.key.remoteJid,
      {
        text: `╭━━━ ${e.admin} *ADMINS* ━━━╮\n${text}\n╰━━━━━━━━━━━━━━━━━━━╯`,
        mentions: adminList.map((a) => a.id),
      },
      { quoted: msg }
    );
  },
};
