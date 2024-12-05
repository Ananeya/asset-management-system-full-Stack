const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const Issue = require('../models/Issue');

// Report new issue
router.post('/', auth, async (req, res) => {
  const issue = new Issue({
    item: req.body.itemId,
    reportedBy: req.user._id,
    issueType: req.body.issueType,
    description: req.body.description,
    priority: req.body.priority
  });

  try {
    const newIssue = await issue.save();
    await newIssue.populate('item reportedBy', 'name username');
    res.status(201).json(newIssue);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Get all issues
router.get('/', auth, async (req, res) => {
  try {
    const issues = await Issue.find()
      .populate('item', 'name')
      .populate('reportedBy', 'username');
    res.json(issues);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Other issue-related endpoints...

module.exports = router;
