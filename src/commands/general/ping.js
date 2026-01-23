import { emoji as e } from "../../config.js";
import { send } from "../../utils.js";

export default {
  cmd: ["ping", "p"],
  desc: "Check bot latency",

  run: async (sock, msg) => {
    const start = Date.now();
    const sent = await send.text(sock, msg, `${e.ping} Pinging...`);
    const ms = Date.now() - start;

    const status =
      ms < 100
        ? `${e.sonic} Sonic Speed!`
        : ms < 200
          ? `${e.rocket} Fast!`
          : ms < 500
            ? `${e.bolt} Normal`
            : "🐢 Slow";

    await send.edit(
      sock,
      msg,
      sent.key,
      `${e.ping} *Pong!* ${ms}ms\n${status}`,
    );
  },
};
