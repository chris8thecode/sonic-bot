import { emoji as e } from "../../config.js";
import { send } from "../../utils.js";
import { checkPerms } from "./_utils.js";

export default {
  cmd: ["ginfo", "groupinfo", "gc"],
  desc: "Group information",

  run: async (sock, msg) => {
    const meta = await checkPerms(sock, msg);
    if (!meta) return;

    const admins = meta.participants.filter((p) => p.admin).length;
    const created = new Date(meta.creation * 1000).toLocaleDateString();

    await send.text(
      sock,
      msg,
      `
╭━━━ ${e.group} *GROUP INFO* ━━━╮
┃ ${e.star} Name: ${meta.subject}
┃ ${e.user} Members: ${meta.participants.length}
┃ ${e.admin} Admins: ${admins}
┃ ${e.time} Created: ${created}
┃ ${e.info} Desc: ${meta.desc || "None"}
╰━━━━━━━━━━━━━━━━━━━━━━━━━╯`.trim()
    );
  },
};
