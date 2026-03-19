import {
  makeWASocket,
  makeCacheableSignalKeyStore,
  fetchLatestBaileysVersion,
  DisconnectReason,
} from "baileys";
import { useSqliteAuthState } from "../database/use-sqlite-file-auth-state.js";
import NodeCache from "@cacheable/node-cache";
import pino from "pino";
import readline from "readline";
import { config, getOwner, setOwner } from "../config/config.js";
import { handleMessage } from "../core/handler.js";

const logger = pino({ level: "silent" });
const msgRetryCache = new NodeCache();

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});
const ask = (q) => new Promise((r) => rl.question(q, r));

let currentSocket = null;

export const startSocket = async () => {
  if (currentSocket) {
    currentSocket.ev.removeAllListeners();
    currentSocket.ws.close();
    currentSocket = null;
  }

  const { state, saveCreds } = await useSqliteAuthState(config.authDir);
  const { version } = await fetchLatestBaileysVersion();

  console.log(`🔌 WA v${version.join(".")}`);

  const sonic = makeWASocket({
    version,
    logger,
    auth: {
      creds: state.creds,
      keys: makeCacheableSignalKeyStore(state.keys, logger),
    },
    msgRetryCounterCache: msgRetryCache,
    generateHighQualityLinkPreview: true,
    markOnlineOnConnect: false,
    getMessage: async () => undefined,
  });

  currentSocket = sonic;

  if (!sonic.authState.creds.registered) {
    const phone = await ask("📱 Enter phone number (with country code): ");
    const cleanPhone = phone.replace(/[^0-9]/g, "");

    const code = await sonic.requestPairingCode(cleanPhone);
    console.log(`\n🔑 Pairing Code: ${code}\n`);

    if (!getOwner()) setOwner(cleanPhone);
  }

  sonic.ev.process(async (events) => {
    if (events["connection.update"]) {
      const { connection, lastDisconnect } = events["connection.update"];

      if (connection === "close") {
        const code = lastDisconnect?.error?.output?.statusCode;
        if (code === DisconnectReason.loggedOut) {
          console.log("🔴 Logged out. Delete auth_session and restart.");
          process.exit(1);
        }
        console.log("🔄 Reconnecting");
        startSocket();
      }

      if (connection === "open") {
        rl.close();
        console.log(`
╔══════════════════════════════════╗
║  🦔 ${config.botName.toUpperCase()} CONNECTED!
║  Prefix: ${config.prefix}
║  Owner: ${getOwner() || "Not set"}
╚══════════════════════════════════╝`);
      }
    }

    if (events["creds.update"]) await saveCreds();

    if (events["lid-mapping.update"]) {
      // Store LID<->PN mappings if needed
      // console.log('LID mapping update:', events['lid-mapping.update'])
    }

    if (events["messages.upsert"]) {
      const { messages, type } = events["messages.upsert"];
      if (type !== "notify") return;

      for (const msg of messages) {
        await handleMessage(sonic, msg).catch(console.error);
      }
    }

    if (events["group-participants.update"]) {
      // const { id, participants, action } = events['group-participants.update']
      // action: 'add' | 'remove' | 'promote' | 'demote'
    }
  });

  return sonic;
};
