const express = require('express');
const router = express.Router();

// Define a sample route
router.get('/staff', (req, res) => {
  res.send('Staff successful');
});

module.exports = router;
