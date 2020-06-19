const mongoose = require("mongoose");

// eventually there can be multiple settings docs for multiple modders using the site
const SettingsSchema = new mongoose.Schema({
  open: Boolean,
  maxPending: Number,
  cooldown: Number,
});

module.exports = mongoose.model("Settings", SettingsSchema);