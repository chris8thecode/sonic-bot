import { emoji as e } from "../../config/config.js";
import { send } from "../../utils/utils.js";
import { checkPerms } from "./_utils.js";

export default {
  cmd: ["setdesc", "gdesc", "setdescription"],
  desc: "Change group description",

  run: async (sonic, msg, args) => {
    if (!(await checkPerms(sonic, msg, { admin: true, botAdmin: true })))
      return;

    try {
      await sonic.groupUpdateDescription(
        msg.key.remoteJid,
        args.join(" ") || undefined,
      );
      await send.text(
        sonic,
        msg,
        `${e.check} Description ${args.length ? "updated" : "removed"}!`,
      );
    } catch {
      await send.text(sonic, msg, `${e.cross} Failed.`);
    }
  },
};
