import { emoji as e } from "../../config.js";
import { jid, send, getTarget } from "../../utils.js";

export const checkPerms = async (
  sock,
  msg,
  { admin = false, botAdmin = false } = {}
) => {
  const groupJid = msg.key.remoteJid;
  const sender = msg.key.participant || msg.key.remoteJid;

  if (!jid.isGroup(groupJid)) {
    await send.text(sock, msg, `${e.cross} Group command only!`);
    return null;
  }

  const metadata = await sock.groupMetadata(groupJid);
  const admins = metadata.participants.filter((p) => p.admin).map((p) => p.id);
  const botJid = jid.fromUser(sock.user?.id) + "@s.whatsapp.net";

  if (admin && !admins.includes(sender)) {
    await send.text(sock, msg, `${e.cross} Admin only!`);
    return null;
  }

  if (botAdmin && !admins.includes(botJid)) {
    await send.text(sock, msg, `${e.cross} I need admin rights!`);
    return null;
  }

  return metadata;
};

export const requireTarget = async (sock, msg) => {
  const target = getTarget(msg);
  if (!target) {
    await send.text(sock, msg, `${e.cross} Mention or reply to a user!`);
    return null;
  }
  return target;
};

export const participantAction =
  (action, successMsg) => async (sock, msg, args) => {
    const meta = await checkPerms(sock, msg, { admin: true, botAdmin: true });
    if (!meta) return;

    let target;
    if (action === "add") {
      if (!args[0]) return send.text(sock, msg, `${e.warn} Provide a number!`);
      target = jid.toUser(args[0]);
      const [check] = await sock.onWhatsApp(target).catch(() => []);
      if (!check?.exists)
        return send.text(sock, msg, `${e.cross} Not on WhatsApp!`);
    } else {
      target = await requireTarget(sock, msg);
      if (!target) return;
    }

    try {
      const [result] = await sock.groupParticipantsUpdate(
        msg.key.remoteJid,
        [target],
        action
      );

      if (result.status === "200") {
        await send.mention(
          sock,
          msg,
          `${e.check} ${successMsg} @${jid.fromUser(target)}`,
          [target]
        );
      } else {
        await send.text(
          sock,
          msg,
          `${e.cross} Failed! Error: ${result.status}`
        );
      }
    } catch (err) {
      await send.text(
        sock,
        msg,
        `${e.cross} ${
          err.message?.includes("403")
            ? "Privacy settings prevent this."
            : "Failed."
        }`
      );
    }
  };

export const settingAction = (setting, successMsg) => async (sock, msg) => {
  if (!(await checkPerms(sock, msg, { admin: true, botAdmin: true }))) return;

  try {
    await sock.groupSettingUpdate(msg.key.remoteJid, setting);
    await send.text(sock, msg, `${e.check} ${successMsg}`);
  } catch {
    await send.text(sock, msg, `${e.cross} Failed to update settings.`);
  }
};
