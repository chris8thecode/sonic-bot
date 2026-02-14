import { emoji as e } from "../../config/config.js";
import { send } from "../../utils/utils.js";
import { checkPerms } from "./_utils.js";

export default {
  cmd: ["setname", "gname", "setsubject"],
  desc: "Change group name",

  run: async (sock, msg, args) => {
    if (!(await checkPerms(sock, msg, { admin: true, botAdmin: true }))) return;
    if (!args.length) return send.text(sock, msg, `${e.warn} Provide a name!`);

    try {
      await sock.groupUpdateSubject(msg.key.remoteJid, args.join(" "));
      await send.text(sock, msg, `${e.check} Name updated!`);
    } catch {
      await send.text(sock, msg, `${e.cross} Failed.`);
    }
  },
};
