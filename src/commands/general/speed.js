import { emoji as e } from "../../config/config.js";
import { send } from "../../utils/utils.js";

export default {
  cmd: ["speed", "speedtest", "st"],
  desc: "Internet speed test",

  run: async (sock, msg) => {
    await send.text(sock, msg, `${e.sonic} Running speed test...`);

    try {
      const start = Date.now();
      const res = await fetch(
        "https://speed.cloudflare.com/__down?bytes=5000000",
      );
      const buffer = await res.arrayBuffer();
      const seconds = (Date.now() - start) / 1000;
      const mbps = ((buffer.byteLength * 8) / seconds / 1_000_000).toFixed(2);

      await send.text(
        sock,
        msg,
        `
╭━━━ ${e.rocket} *SPEED TEST* ━━━╮
┃ ${e.bolt} Download: ${mbps} Mbps
┃ ${e.time} Latency: ${(seconds * 1000).toFixed(0)}ms
╰━━━━━━━━━━━━━━━━━━━━╯`.trim(),
      );
    } catch {
      await send.text(sock, msg, `${e.cross} Speed test failed!`);
    }
  },
};
