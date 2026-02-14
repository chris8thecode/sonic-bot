import { config, emoji as e, getOwner } from "../../config/config.js";
import { send } from "../../utils/utils.js";

export default {
  cmd: ["owner", "creator", "dev"],
  desc: "Show bot owner",

  run: async (sock, msg) => {
    const owner = getOwner();
    await send.text(
      sock,
      msg,
      `${e.admin} *${config.botName} Owner:* ${
        owner ? `+${owner}` : "Not configured"
      }`,
    );
  },
};
