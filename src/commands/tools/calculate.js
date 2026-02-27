import { emoji as e } from "../../config/config.js";
import { send } from "../../utils/utils.js";

export default {
  cmd: ["calculate"],
  desc: "Calculate a math expression",

  run: async (sonic, msg, args) => {
    if (!args.length) {
      await send.text(
        sonic,
        msg,
        `${e.error || "❌"} Please provide a math expression to calculate.\nExample: !calculate 2 + 2`,
      );
      return;
    }

    const expression = args.join(" ");

    try {
      const sanitized = expression.replace(/[^0-9+\-*/.().\s]/g, "").trim();

      if (!sanitized) {
        await send.text(
          sonic,
          msg,
          `${e.error || "❌"} Invalid expression provided.`,
        );
        return;
      }

      const result = Function('"use strict"; return (' + sanitized + ")")();

      if (typeof result !== "number" || isNaN(result)) {
        await send.text(
          sonic,
          msg,
          `${e.error || "❌"} Invalid calculation result.`,
        );
        return;
      }

      await send.text(
        sonic,
        msg,
        `${e.success || "✅"} *${sanitized}* = *${result}*`,
      );
    } catch (error) {
      await send.text(
        sonic,
        msg,
        `${e.error || "❌"} Error calculating expression: ${error.message}`,
      );
    }
  },
};
