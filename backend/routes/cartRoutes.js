const express = require('express');
const router = express.Router();

// Define a sample route
router.get('/cart', (req, res) => {
  res.send('Cart successful');
});

module.exports = router;
