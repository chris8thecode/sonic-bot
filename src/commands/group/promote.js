import { participantAction } from "./_utils.js";

export default {
  cmd: ["promote", "admin"],
  desc: "Make member admin",
  run: participantAction("promote", "Promoted"),
};
