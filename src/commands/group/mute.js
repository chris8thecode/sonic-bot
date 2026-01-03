import { settingAction } from "./_utils.js";

export default {
  cmd: ["mute", "close"],
  desc: "Mute group (admins only)",
  run: settingAction("announcement", "Group muted. Admins only."),
};
