import { config, emoji as e, getOwner } from "../../config/config.js";
import { send } from "../../utils/utils.js";

export default {
  cmd: ["owner", "creator", "dev"],
  desc: "Show bot owner",

  run: async (sonic, msg) => {
    const owner = getOwner();
    await send.text(
      sonic,
      msg,
      `${e.admin} *${config.botName} Owner:* ${
        owner ? `+${owner}` : "Not configured"
      }`,
    );
  },
};
