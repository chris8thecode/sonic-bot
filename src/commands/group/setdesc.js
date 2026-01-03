import { emoji as e } from "../../config.js";
import { send } from "../../utils.js";
import { checkPerms } from "./_utils.js";

export default {
  cmd: ["setdesc", "gdesc", "setdescription"],
  desc: "Change group description",

  run: async (sock, msg, args) => {
    if (!(await checkPerms(sock, msg, { admin: true, botAdmin: true }))) return;

    try {
      await sock.groupUpdateDescription(
        msg.key.remoteJid,
        args.join(" ") || undefined
      );
      await send.text(
        sock,
        msg,
        `${e.check} Description ${args.length ? "updated" : "removed"}!`
      );
    } catch {
      await send.text(sock, msg, `${e.cross} Failed.`);
    }
  },
};
