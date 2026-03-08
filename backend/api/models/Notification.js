const mongoose = require("mongoose");

const notificationSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true
    },
    message: {
      type: String,
      required: true
    },
    type: {
      type: String,
      enum: ["info", "warning", "urgent"],
      default: "info"
    },
    readStatus: {
      type: Boolean,
      default: false
    },
    entityType: {
      type: String,
      enum: ["assignment", "lecture", "attendance", "event", "system"],
      required: true
    },
    entityId: {
      type: mongoose.Schema.Types.ObjectId,
      refPath: "entityType"
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model("Notification", notificationSchema);
