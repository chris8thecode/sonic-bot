import { emoji as e } from "../../config/config.js";
import { send, jid, getTarget } from "../../utils/utils.js";
import { getInventory } from "../../database/database.js";

export default {
  cmd: ["inventory", "inv", "bag", "items"],
  desc: "View your inventory",

  run: async (sonic, msg) => {
    const target = getTarget(msg) || msg.key.participant || msg.key.remoteJid;
    const inventory = getInventory(target);
    const isSelf = target === (msg.key.participant || msg.key.remoteJid);
    const num = jid.fromUser(target);

    if (!inventory.length) {
      return send.text(
        sonic,
        msg,
        `${e.cross} ${isSelf ? "Your" : "Their"} inventory is empty!`,
      );
    }

    const items = inventory
      .map((i) => `┃ • ${i.item_name} x${i.quantity}`)
      .join("\n");

    if (isSelf) {
      await send.text(
        sonic,
        msg,
        `
╭━━━ 🎒 *INVENTORY* ━━━╮
┃ ${e.user} Your items:
┃
${items}
╰━━━━━━━━━━━━━━━━━━━━━╯`.trim(),
      );
    } else {
      await send.mention(
        sonic,
        msg,
        `
╭━━━ 🎒 *INVENTORY* ━━━╮
┃ ${e.user} @${num}'s items:
┃
${items}
╰━━━━━━━━━━━━━━━━━━━━━╯`.trim(),
        [target],
      );
    }
  },
};
