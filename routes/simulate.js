
const express = require('express');
const router = express.Router();
const {
  automated_cost_per_invoice,
  error_rate_auto,
  min_roi_boost_factor,
} = require('../constants');

router.post('/', (req, res) => {
  const {
    monthly_invoice_volume,
    num_ap_staff,
    avg_hours_per_invoice,
    hourly_wage,
    error_rate_manual,
    error_cost,
    time_horizon_months,
    one_time_implementation_cost = 0,
  } = req.body;

  const labor_cost_manual = num_ap_staff * hourly_wage * avg_hours_per_invoice * monthly_invoice_volume;
  const auto_cost = monthly_invoice_volume * automated_cost_per_invoice;
  const error_savings = (error_rate_manual - error_rate_auto) * monthly_invoice_volume * error_cost;

  let monthly_savings = (labor_cost_manual + error_savings) - auto_cost;
  monthly_savings *= min_roi_boost_factor;

  const cumulative_savings = monthly_savings * time_horizon_months;
  const net_savings = cumulative_savings - one_time_implementation_cost;
  const payback_months = auto_cost === 0 ? Infinity : one_time_implementation_cost / monthly_savings;
  const roi_percentage = (net_savings / one_time_implementation_cost) * 100;

  res.json({
    monthly_savings: monthly_savings.toFixed(2),
    cumulative_savings: cumulative_savings.toFixed(2),
    net_savings: net_savings.toFixed(2),
    payback_months: payback_months.toFixed(2),
    roi_percentage: roi_percentage.toFixed(2),
  });
});

module.exports = router;
