const commandCenterService = require("../services/commandCenterService");
const catchAsync = require("../utils/catchAsync");

exports.getSummary = catchAsync(async (req, res) => {
  const summary = await commandCenterService.getDashboardSummary();
  res.json(summary);
});
