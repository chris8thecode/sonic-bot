import { emoji as e } from "../../config/config.js";
import { send } from "../../utils/utils.js";
import { checkPerms } from "./_utils.js";

export default {
  cmd: ["setname", "gname", "setsubject"],
  desc: "Change group name",

  run: async (sonic, msg, args) => {
    if (!(await checkPerms(sonic, msg, { admin: true, botAdmin: true })))
      return;
    if (!args.length) return send.text(sonic, msg, `${e.warn} Provide a name!`);

    try {
      await sonic.groupUpdateSubject(msg.key.remoteJid, args.join(" "));
      await send.text(sonic, msg, `${e.check} Name updated!`);
    } catch {
      await send.text(sonic, msg, `${e.cross} Failed.`);
    }
  },
};
