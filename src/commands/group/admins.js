import { emoji as e } from "../../config/config.js";
import { checkPerms, getParticipantDisplay } from "./_utils.js";

export default {
  cmd: ["admins", "listadmin", "adminlist"],
  desc: "List group admins",

  run: async (sonic, msg) => {
    const meta = await checkPerms(sonic, msg);
    if (!meta) return;

    const adminList = meta.participants.filter((p) => p.admin);

    const text = adminList
      .map((a) => {
        const icon = a.admin === "superadmin" ? "👑" : "⭐";
        const display = getParticipantDisplay(a);
        return `${icon} @${display}`;
      })
      .join("\n");

    await sonic.sendMessage(
      msg.key.remoteJid,
      {
        text: `╭━━━ ${e.admin} *ADMINS* ━━━╮\n${text}\n╰━━━━━━━━━━━━━━━━━━━╯`,
        mentions: adminList.map((a) => a.id),
      },
      { quoted: msg },
    );
  },
};
