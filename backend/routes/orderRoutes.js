const express = require('express');
const router = express.Router();

// Define a sample route
router.get('/order', (req, res) => {
  res.send('Order successful');
});

module.exports = router;
