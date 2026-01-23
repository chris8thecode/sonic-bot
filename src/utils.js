import { getOwner } from "./config.js";

export const jid = {
  toUser: (num) => `${num?.replace(/[^0-9]/g, "")}@s.whatsapp.net`,

  fromUser: (jid) => jid?.replace(/@.*/, "").replace(/:\d+/, "") || "",

  isGroup: (jid) => jid?.endsWith("@g.us") ?? false,

  isPN: (jid) => jid?.endsWith("@s.whatsapp.net") ?? false,

  isLID: (jid) => jid?.endsWith("@lid") ?? false,

  getSender: (msg) => {
    const key = msg.key;

    if (jid.isGroup(key.remoteJid)) {
      if (key.participant && jid.isLID(key.participant) && key.participantAlt) {
        return key.participantAlt;
      }
      return key.participant || key.participantAlt;
    }

    if (key.remoteJid && jid.isLID(key.remoteJid) && key.remoteJidAlt) {
      return key.remoteJidAlt;
    }
    return key.remoteJid;
  },

  getParticipantNumber: (participant) => {
    if (participant.phoneNumber) {
      return jid.fromUser(participant.phoneNumber);
    }
    return jid.fromUser(participant.id);
  },

  normalize: (jidStr) => jidStr?.replace(/:\d+@/, "@") || "",
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

  if (ctx?.mentionedJid?.length) {
    return ctx.mentionedJid[0];
  }

  if (ctx?.participant) {
    if (jid.isLID(ctx.participant) && ctx.quotedParticipantAlt) {
      return ctx.quotedParticipantAlt;
    }
    return ctx.participant;
  }

  return null;
};

export const isOwner = (userJid) => {
  const owner = getOwner();
  if (!owner) return false;
  const userNum = jid.fromUser(userJid);
  return userNum.includes(owner.replace(/[^0-9]/g, ""));
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

  react: (sock, msg, emoji) =>
    sock.sendMessage(msg.key.remoteJid, {
      react: { text: emoji, key: msg.key },
    }),
};
