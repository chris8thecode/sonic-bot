import { getOwner } from "./config.js";

export const jid = {
  toUser: (num) => `${num?.replace(/[^0-9]/g, "")}@s.whatsapp.net`,
  fromUser: (jid) => jid?.replace(/@.*/, "").replace(/:\d+/, "") || "",
  isGroup: (jid) => jid?.endsWith("@g.us") ?? false,
};

export const getText = (msg) => {
  const m = msg.message;
  return (
    m?.conversation ||
    m?.extendedTextMessage?.text ||
    m?.imageMessage?.caption ||
    m?.videoMessage?.caption ||
    ""
  );
};

export const getTarget = (msg) => {
  const ctx = msg.message?.extendedTextMessage?.contextInfo;
  return ctx?.mentionedJid?.[0] || ctx?.participant || null;
};

export const isOwner = (userJid) => {
  const owner = getOwner();
  return owner && jid.fromUser(userJid).includes(owner);
};

export const format = {
  uptime: (seconds) => {
    const units = [
      [86400, "d"],
      [3600, "h"],
      [60, "m"],
      [1, "s"],
    ];
    return (
      units
        .map(([div, unit]) => {
          const val = Math.floor(seconds / div);
          seconds %= div;
          return val ? `${val}${unit}` : "";
        })
        .filter(Boolean)
        .join(" ") || "0s"
    );
  },

  bytes: (bytes) => {
    if (!bytes) return "0 B";
    const i = Math.floor(Math.log(bytes) / Math.log(1024));
    return `${(bytes / 1024 ** i).toFixed(2)} ${["B", "KB", "MB", "GB"][i]}`;
  },
};

export const send = {
  text: (sock, msg, text) =>
    sock.sendMessage(msg.key.remoteJid, { text }, { quoted: msg }),

  mention: (sock, msg, text, mentions) =>
    sock.sendMessage(msg.key.remoteJid, { text, mentions }, { quoted: msg }),

  edit: (sock, msg, key, text) =>
    sock.sendMessage(msg.key.remoteJid, { text, edit: key }),
};
