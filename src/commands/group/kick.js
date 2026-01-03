import { participantAction } from "./_utils.js";

export default {
  cmd: ["kick", "remove", "ban"],
  desc: "Remove member from group",
  run: participantAction("remove", "Removed"),
};
