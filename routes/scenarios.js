const express = require('express');
const router = express.Router();
const Scenario = require('../models/scenario');

// Save a scenario
router.post('/', async (req, res) => {
  try {
    const scenario = new Scenario(req.body);
    await scenario.save();
    res.json({ message: 'Scenario saved', id: scenario._id });
  } catch (error) {
    res.status(400).json({ message: 'Error saving scenario', error: error.message });
  }
});

// List all scenarios
router.get('/', async (req, res) => {
  try {
    const scenarios = await Scenario.find().sort({ createdAt: -1 });
    res.json(scenarios);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching scenarios', error: error.message });
  }
});

// Get scenario by id
router.get('/:id', async (req, res) => {
  try {
    const scenario = await Scenario.findById(req.params.id);
    if (!scenario) {
      return res.status(404).json({ message: 'Scenario not found' });
    }
    res.json(scenario);
  } catch (error) {
    res.status(400).json({ message: 'Invalid ID', error: error.message });
  }
});

module.exports = router;
