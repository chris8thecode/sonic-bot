import { emoji as e } from "../../config/config.js";
import { jid, send, getTarget } from "../../utils/utils.js";

const getAdminIds = (metadata) => {
  return metadata.participants.filter((p) => p.admin).map((p) => p.id);
};

export const checkPerms = async (
  sock,
  msg,
  { admin = false, botAdmin = false } = {},
) => {
  const groupJid = msg.key.remoteJid;

  const sender = jid.getSender(msg) || msg.key.participant || msg.key.remoteJid;

  if (!jid.isGroup(groupJid)) {
    await send.text(sock, msg, `${e.cross} Group command only!`);
    return null;
  }

  const metadata = await sock.groupMetadata(groupJid);
  const adminIds = getAdminIds(metadata);

  const botJid = sock.user?.id;
  const botNormalized = jid.normalize(botJid);

  if (admin) {
    const senderNormalized = jid.normalize(sender);
    const isAdmin = adminIds.some(
      (id) =>
        jid.normalize(id) === senderNormalized ||
        jid.fromUser(id) === jid.fromUser(sender),
    );

    if (!isAdmin) {
      await send.text(sock, msg, `${e.cross} Admin only!`);
      return null;
    }
  }

  if (botAdmin) {
    const isBotAdmin = adminIds.some(
      (id) =>
        jid.normalize(id) === botNormalized ||
        jid.fromUser(id) === jid.fromUser(botJid),
    );

    if (!isBotAdmin) {
      await send.text(sock, msg, `${e.cross} I need admin rights!`);
      return null;
    }
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

export const getParticipantDisplay = (participant) => {
  if (participant.phoneNumber) {
    return jid.fromUser(participant.phoneNumber);
  }
  return jid.fromUser(participant.id);
};

/*
 * Factory function creates similar command handlers with different actions,
 * reducing code duplication across kick, promote, demote, and add commands.
 */
export const participantAction =
  (action, successMsg) => async (sock, msg, args) => {
    const meta = await checkPerms(sock, msg, { admin: true, botAdmin: true });
    if (!meta) return;

    let target;
    if (action === "add") {
      if (!args[0]) return send.text(sock, msg, `${e.warn} Provide a number!`);
      target = jid.toUser(args[0]);

      /*
       * onWhatsApp check prevents attempting to add non-existent numbers which
       * would fail anyway but waste API calls and confuse users with generic errors.
       */
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
        action,
      );

      if (result.status === "200") {
        await send.mention(
          sock,
          msg,
          `${e.check} ${successMsg} @${jid.fromUser(target)}`,
          [target],
        );
      } else {
        await send.text(
          sock,
          msg,
          `${e.cross} Failed! Error: ${result.status}`,
        );
      }
    } catch (err) {
      /*
       * Generic "Failed" messages leave users confused about whether it's a bug
       * or their contact's privacy settings, so we check for 403 to clarify.
       */
      await send.text(
        sock,
        msg,
        `${e.cross} ${err.message?.includes("403") ? "Privacy settings prevent this." : "Failed."}`,
      );
    }
  };

/*
 * Factory function creates similar setting toggle handlers with different settings,
 * reducing code duplication across lock, unlock, and other group setting commands.
 */
export const settingAction = (setting, successMsg) => async (sock, msg) => {
  if (!(await checkPerms(sock, msg, { admin: true, botAdmin: true }))) return;

  try {
    await sock.groupSettingUpdate(msg.key.remoteJid, setting);
    await send.text(sock, msg, `${e.check} ${successMsg}`);
  } catch {
    await send.text(sock, msg, `${e.cross} Failed to update settings.`);
  }
};
