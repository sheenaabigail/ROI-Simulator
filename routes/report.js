const express = require('express');
const router = express.Router();
const Scenario = require('../models/scenario');

// Generate a report on demand
router.get('/', async (req, res) => {
  try {
    const scenarios = await Scenario.find();
    const totalScenarios = scenarios.length;
    const avgInvoiceVolume = totalScenarios > 0
      ? scenarios.reduce((sum, s) => sum + (s.monthly_invoice_volume || 0), 0) / totalScenarios
      : 0;

    res.json({
      totalScenarios,
      avgInvoiceVolume,
      scenarios, // Optionally include all scenarios
    });
  } catch (error) {
    res.status(500).json({ message: 'Error generating report', error: error.message });
  }
});

module.exports = router;