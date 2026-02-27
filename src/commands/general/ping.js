import { emoji as e } from "../../config/config.js";
import { send } from "../../utils/utils.js";

export default {
  cmd: ["ping"],
  desc: "Check if bot is alive",

  run: async (sonic, msg) => {
    await send.text(sonic, msg, `${e.ping} Pong!`);
  },
};
