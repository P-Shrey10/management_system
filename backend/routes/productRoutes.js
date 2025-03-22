const express = require('express');
const router = express.Router();

// Define a sample route
router.get('/product', (req, res) => {
  res.send('Product successful');
});

module.exports = router;
