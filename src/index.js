import { startSocket } from "./socket.js";
import { config } from "./config.js";

console.log(`
╔═════════════════════════════════════╗
║   🦔 SONIC WHATSAPP BOT 💨         ║
║   v${config.version} | Prefix: ${config.prefix}            ║
╚═════════════════════════════════════╝
`);

startSocket().catch((err) => {
  console.error("💥 Fatal:", err);
  process.exit(1);
});
