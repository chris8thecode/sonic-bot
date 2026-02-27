import { emoji as e } from "../../config/config.js";
import { checkPerms } from "./_utils.js";

export default {
  cmd: ["setdesc"],
  desc: "Change group description",

  run: async ({ text, sonic, msg }, args) => {
    if (!(await checkPerms(sonic, msg, { admin: true, botAdmin: true })))
      return;

    try {
      await sonic.groupUpdateDescription(
        msg.key.remoteJid,
        args.join(" ") || undefined,
      );
      await text(
        `${e.check} Description ${args.length ? "updated" : "removed"}!`,
      );
    } catch {
      await text(`${e.cross} Failed.`);
    }
  },
};
