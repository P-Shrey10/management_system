const express = require('express');
const router = express.Router();

// Define a sample route
router.get('/customer', (req, res) => {
  res.send('Customer successful');
});

module.exports = router;
