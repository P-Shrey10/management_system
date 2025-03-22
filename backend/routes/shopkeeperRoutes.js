const express = require('express');
const router = express.Router();

// Define a sample route
router.get('/shopkeeper', (req, res) => {
  res.send('Shopkeeper successful');
});

module.exports = router;
