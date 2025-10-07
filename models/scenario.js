// backend/models/scenario.js
const mongoose = require('../db');

const scenarioSchema = new mongoose.Schema({
  scenario_name: { type: String, required: true },
  monthly_invoice_volume: Number,
  num_ap_staff: Number,
  avg_hours_per_invoice: Number,
  hourly_wage: Number,
  error_rate_manual: Number,
  error_cost: Number,
  time_horizon_months: Number,
  one_time_implementation_cost: Number,
}, { timestamps: true });

module.exports = mongoose.model('Scenario', scenarioSchema);
